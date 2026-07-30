"use client";

import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import Image from "next/image";
import {
  type KeyboardEvent,
  type PointerEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import type { ModelDiscoverInteriorViewer as ModelDiscoverInteriorViewerData } from "@/data/model-discover";

import styles from "./model-discover-interior.module.css";
import { observeDiscoverMediaProximity } from "./model-discover-media-preload";

export function ModelDiscoverInteriorViewer({
  interior,
}: {
  interior: ModelDiscoverInteriorViewerData;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const generationRef = useRef(0);
  const transitioningRef = useRef(false);
  const pointerStartRef = useRef<number | null>(null);
  const preloadersRef = useRef<HTMLImageElement[]>([]);
  const preloadPromisesRef = useRef(new Map<string, Promise<boolean>>());
  const loadedRef = useRef(new Set([interior.images[0].src]));
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [metadataIndex, setMetadataIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const preloadPromises = new Map<string, Promise<boolean>>();
    preloadPromisesRef.current = preloadPromises;
    const stopObserving = observeDiscoverMediaProximity(
      sectionRef.current,
      () => {
        preloadersRef.current = interior.images.map((slide) => {
          const loader = new window.Image();
          loader.decoding = "async";
          const decoded = new Promise<boolean>((resolve) => {
            loader.onload = () => {
              void loader
                .decode()
                .catch(() => undefined)
                .finally(() => {
                  if (!cancelled) {
                    loadedRef.current.add(slide.src);
                  }
                  resolve(true);
                });
            };
            loader.onerror = () => resolve(false);
          });
          preloadPromises.set(slide.src, decoded);
          loader.src = slide.src;
          return loader;
        });
      });

    return () => {
      cancelled = true;
      stopObserving();
      for (const loader of preloadersRef.current) {
        loader.onload = null;
        loader.onerror = null;
      }
      preloadersRef.current = [];
      preloadPromises.clear();
    };
  }, [interior.images]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let played = false;
    const context = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting || played) {
            return;
          }

          played = true;
          observer.disconnect();
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-interior-copy]", {
              autoAlpha: 0,
              x: -44,
              duration: 0.72,
              stagger: 0.08,
            })
            .from(
              "[data-interior-image]",
              { autoAlpha: 0, duration: 0.72 },
              "-=0.48",
            )
            .from(
              "[data-interior-meta]",
              {
                autoAlpha: 0,
                y: 14,
                duration: 0.55,
                stagger: 0.08,
              },
              "-=0.25",
            )
            .from(
              "[data-interior-control]",
              {
                autoAlpha: 0,
                duration: 0.45,
                stagger: 0.05,
              },
              "-=0.25",
            );
        },
        { threshold: 0.34 },
      );

      observer.observe(section);
      return () => observer.disconnect();
    }, section);

    return () => {
      transitionRef.current?.kill();
      context.revert();
    };
  }, []);

  useEffect(() => {
    if (incomingIndex === null) {
      return;
    }

    const currentLayer = currentLayerRef.current;
    const incomingLayer = incomingLayerRef.current;
    const subtitle = subtitleRef.current;
    if (!currentLayer || !incomingLayer || !subtitle) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    transitionRef.current?.kill();
    transitioningRef.current = true;
    gsap.set(currentLayer, { opacity: 1 });
    gsap.set(incomingLayer, { opacity: 0 });
    gsap.set(subtitle, { opacity: 1, y: 0 });

    transitionRef.current = gsap
      .timeline({
        onComplete: () => {
          flushSync(() => {
            setDisplayedIndex(incomingIndex);
            setIncomingIndex(null);
          });
          gsap.set(currentLayer, { opacity: 1 });
          gsap.set(subtitle, { opacity: 1, y: 0 });
          transitioningRef.current = false;
          transitionRef.current = null;
        },
      })
      .to(
        currentLayer,
        {
          opacity: 0,
          duration: reduceMotion ? 0.02 : 0.13,
          ease: "power2.in",
        },
        0,
      )
      .to(
        subtitle,
        {
          opacity: 0,
          y: reduceMotion ? 0 : 5,
          duration: reduceMotion ? 0.02 : 0.1,
          ease: "power2.in",
        },
        0,
      )
      .call(
        () => setMetadataIndex(incomingIndex),
        undefined,
        reduceMotion ? 0.02 : 0.13,
      )
      .to(
        incomingLayer,
        {
          opacity: 1,
          duration: reduceMotion ? 0.03 : 0.17,
          ease: "power2.out",
        },
        reduceMotion ? 0.02 : 0.13,
      )
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: reduceMotion ? 0.03 : 0.14,
          ease: "power2.out",
        },
        reduceMotion ? 0.025 : 0.15,
      );

    return () => {
      transitionRef.current?.kill();
    };
  }, [incomingIndex]);

  useEffect(() => {
    if (
      !transitioningRef.current &&
      incomingIndex === null &&
      selectedIndex !== displayedIndex
    ) {
      setIncomingIndex(selectedIndex);
    }
  }, [displayedIndex, incomingIndex, selectedIndex]);

  const requestSlide = (index: number) => {
    if (index === selectedIndex && incomingIndex === null) {
      return;
    }

    const generation = ++generationRef.current;
    const imagePath = interior.images[index].src;
    const reveal = () => {
      if (generation !== generationRef.current) {
        return;
      }

      loadedRef.current.add(imagePath);
      setSelectedIndex(index);
      if (
        !transitioningRef.current &&
        incomingIndex === null &&
        index !== displayedIndex
      ) {
        setIncomingIndex(index);
      }
    };

    if (loadedRef.current.has(imagePath)) {
      reveal();
      return;
    }

    const preloadPromise = preloadPromisesRef.current.get(imagePath);
    if (preloadPromise) {
      void preloadPromise.then((loaded) => {
        if (loaded) {
          reveal();
        } else if (generation === generationRef.current) {
          setSelectedIndex(displayedIndex);
        }
      });
    }
  };

  const moveSlide = (direction: 1 | -1) => {
    requestSlide(
      (selectedIndex + direction + interior.images.length) %
        interior.images.length,
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSlide(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSlide(-1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || event.pointerType === "pen") {
      pointerStartRef.current = event.clientX;
    }
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (pointerStartRef.current === null) {
      return;
    }

    const distance = event.clientX - pointerStartRef.current;
    pointerStartRef.current = null;
    if (Math.abs(distance) >= 48) {
      moveSlide(distance < 0 ? 1 : -1);
    }
  };

  const displayedSlide = interior.images[displayedIndex];
  const metadataSlide = interior.images[metadataIndex];
  const incomingSlide =
    incomingIndex === null
      ? null
      : interior.images[incomingIndex];

  return (
    <section
      ref={sectionRef}
      id={interior.id}
      className={styles.viewer}
      data-header-theme="dark"
      aria-labelledby={interior.headingId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className={styles.viewerStage} data-interior-image>
        <div ref={currentLayerRef} className={styles.viewerLayer}>
          <Image
            src={displayedSlide.src}
            alt={displayedSlide.alt}
            fill
            unoptimized
            sizes="100vw"
            style={{ objectPosition: displayedSlide.objectPosition }}
          />
        </div>
        {incomingSlide ? (
          <div
            ref={incomingLayerRef}
            className={styles.viewerLayer}
            aria-hidden="true"
          >
            <Image
              src={incomingSlide.src}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              style={{ objectPosition: incomingSlide.objectPosition }}
            />
          </div>
        ) : null}
      </div>
      <div className={styles.viewerShade} aria-hidden="true" />

      <div className={styles.viewerCopy}>
        <p data-interior-copy>{interior.index}</p>
        <h2 id={interior.headingId} data-interior-copy>
          {interior.heading}
        </h2>
      </div>

      <div className={styles.viewerMetadata}>
        <p ref={subtitleRef} data-interior-meta aria-live="polite">
          {metadataSlide.subtitle}
        </p>
        <span data-interior-meta>
          {String(metadataIndex + 1).padStart(2, "0")} /{" "}
          {String(interior.images.length).padStart(2, "0")}
        </span>
      </div>

      <button
        className={`${styles.viewerArrow} ${styles.viewerArrowPrevious}`}
        type="button"
        aria-label="Previous interior image"
        data-interior-control
        onClick={() => moveSlide(-1)}
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={24} />
      </button>
      <button
        className={`${styles.viewerArrow} ${styles.viewerArrowNext}`}
        type="button"
        aria-label="Next interior image"
        data-interior-control
        onClick={() => moveSlide(1)}
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={24} />
      </button>

      <div
        className={styles.viewerProgress}
        aria-label="Interior image selection"
        data-interior-control
      >
        {interior.images.map((slide, index) => (
          <button
            type="button"
            aria-label={`Show interior image ${index + 1}`}
            aria-current={selectedIndex === index ? "true" : undefined}
            key={slide.src}
            onClick={() => requestSlide(index)}
          >
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}
