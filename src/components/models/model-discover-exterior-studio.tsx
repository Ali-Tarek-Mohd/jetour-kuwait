"use client";

import gsap from "gsap";
import Image from "next/image";
import {
  type KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import type { ModelDiscoverExteriorStudio as ModelDiscoverExteriorStudioData } from "@/data/model-discover";

import styles from "./model-discover-exterior.module.css";
import { observeDiscoverMediaProximity } from "./model-discover-media-preload";

export function ModelDiscoverExteriorStudio({
  modelName,
  exterior,
}: {
  modelName: string;
  exterior: ModelDiscoverExteriorStudioData;
}) {
  const studioRef = useRef<HTMLElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const preloadersRef = useRef<HTMLImageElement[]>([]);
  const preloadPromisesRef = useRef(new Map<string, Promise<boolean>>());
  const transitionRef = useRef<gsap.core.Timeline | null>(null);
  const generationRef = useRef(0);
  const loadedRef = useRef(
    new Set([
      exterior.colors[exterior.defaultColorIndex].image,
    ]),
  );
  const [displayedIndex, setDisplayedIndex] = useState(
    exterior.defaultColorIndex,
  );
  const [selectedIndex, setSelectedIndex] = useState(
    exterior.defaultColorIndex,
  );
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const preloadPromises = new Map<string, Promise<boolean>>();
    preloadPromisesRef.current = preloadPromises;
    const stopObserving = observeDiscoverMediaProximity(
      studioRef.current,
      () => {
        preloadersRef.current = exterior.colors.map((color) => {
          const loader = new window.Image();
          loader.decoding = "async";
          const decoded = new Promise<boolean>((resolve) => {
            loader.onload = () => {
              void loader
                .decode()
                .catch(() => undefined)
                .finally(() => {
                  if (!cancelled) {
                    loadedRef.current.add(color.image);
                  }
                  resolve(true);
                });
            };
            loader.onerror = () => resolve(false);
          });
          preloadPromises.set(color.image, decoded);
          loader.src = color.image;
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
  }, [exterior.colors]);

  useEffect(() => {
    if (incomingIndex === null) {
      return;
    }

    const currentLayer = currentLayerRef.current;
    const incomingLayer = incomingLayerRef.current;
    if (!currentLayer || !incomingLayer) {
      return;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    transitionRef.current?.kill();
    gsap.set(currentLayer, { opacity: 1 });
    gsap.set(incomingLayer, { opacity: 0 });

    transitionRef.current = gsap
      .timeline({
        onComplete: () => {
          flushSync(() => {
            setDisplayedIndex(incomingIndex);
            setIncomingIndex(null);
          });
          gsap.set(currentLayer, { opacity: 1 });
          transitionRef.current = null;
        },
      })
      .to(
        currentLayer,
        {
          opacity: 0,
          duration: reduceMotion ? 0.02 : 0.1,
          ease: "power2.in",
        },
        0,
      )
      .to(
        incomingLayer,
        {
          opacity: 1,
          duration: reduceMotion ? 0.02 : 0.12,
          ease: "power2.out",
        },
        reduceMotion ? 0.02 : 0.1,
      );

    return () => {
      transitionRef.current?.kill();
    };
  }, [incomingIndex]);

  const selectColor = (index: number) => {
    if (index === selectedIndex && incomingIndex === null) {
      return;
    }

    const generation = ++generationRef.current;
    const imagePath = exterior.colors[index].image;

    const reveal = () => {
      if (generation !== generationRef.current) {
        return;
      }

      loadedRef.current.add(imagePath);
      setSelectedIndex(index);

      if (index === displayedIndex) {
        transitionRef.current?.kill();
        if (currentLayerRef.current) {
          gsap.set(currentLayerRef.current, { opacity: 1 });
        }
        setIncomingIndex(null);
        return;
      }

      setIncomingIndex(index);
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
      return;
    }

    const loader = new window.Image();
    loader.decoding = "async";
    loader.onload = () => {
      void loader.decode().catch(() => undefined).finally(reveal);
    };
    loader.onerror = () => {
      if (generation === generationRef.current) {
        setSelectedIndex(displayedIndex);
      }
    };
    loader.src = imagePath;
  };
  useLayoutEffect(() => {
    const studio = studioRef.current;
    if (
      !studio ||
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
            .from("[data-exterior-copy]", {
              autoAlpha: 0,
              x: -64,
              duration: 0.78,
              stagger: 0.08,
            })
            .from(
              "[data-exterior-vehicle]",
              {
                autoAlpha: 0,
                x: 48,
                scale: 0.985,
                duration: 0.86,
              },
              "-=0.58",
            )
            .from(
              "[data-exterior-swatch]",
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.055,
              },
              "-=0.32",
            );
        },
        { threshold: 0.32 },
      );

      observer.observe(studio);
      return () => observer.disconnect();
    }, studio);

    return () => {
      transitionRef.current?.kill();
      context.revert();
    };
  }, []);

  const onSwatchKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % exterior.colors.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex =
        (index - 1 + exterior.colors.length) %
        exterior.colors.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = exterior.colors.length - 1;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    swatchRefs.current[nextIndex]?.focus();
    selectColor(nextIndex);
  };

  const selectedColor = exterior.colors[selectedIndex];
  const displayedColor = exterior.colors[displayedIndex];
  const incomingColor =
    incomingIndex === null ? null : exterior.colors[incomingIndex];

  return (
    <section
      ref={studioRef}
      id={exterior.id}
      className={styles.studio}
      data-header-theme="dark"
      aria-labelledby={exterior.headingId}
    >
      <div className={styles.studioWordmark} aria-hidden="true">
        {modelName}
      </div>
      <div className={styles.studioLight} aria-hidden="true" />

      <div className={styles.studioCopy}>
        <p className={styles.studioIndex} data-exterior-copy>
          {exterior.index}
        </p>
        <h2
          id={exterior.headingId}
          className={styles.studioTitle}
          data-exterior-copy
        >
          {exterior.heading}
        </h2>
        <p className={styles.studioDescription} data-exterior-copy>
          {exterior.description}
        </p>
      </div>

      <div className={styles.vehicleStage} data-exterior-vehicle>
        <div className={styles.floorShadow} aria-hidden="true" />
        <div ref={currentLayerRef} className={styles.vehicleLayer}>
          <Image
            className={styles.vehicleImage}
            src={displayedColor.image}
            alt={`${modelName} exterior in ${displayedColor.name}`}
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 82vw"
          />
        </div>
        {incomingColor ? (
          <div
            ref={incomingLayerRef}
            className={styles.vehicleLayer}
            aria-hidden="true"
          >
            <Image
              className={styles.vehicleImage}
              src={incomingColor.image}
              alt=""
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 82vw"
            />
          </div>
        ) : null}
      </div>

      <div className={styles.selector}>
        <div className={styles.selectedColor} aria-live="polite">
          <span>Exterior colour</span>
          <strong>{selectedColor.name}</strong>
        </div>
        <div
          className={styles.swatches}
          role="group"
          aria-label={`Choose ${modelName} exterior colour`}
        >
          {exterior.colors.map((color, index) => (
            <button
              ref={(button) => {
                swatchRefs.current[index] = button;
              }}
              className={styles.swatchButton}
              type="button"
              aria-label={`View ${modelName} in ${color.name}`}
              aria-pressed={selectedIndex === index}
              data-exterior-swatch
              key={color.name}
              onClick={() => selectColor(index)}
              onKeyDown={(event) => onSwatchKeyDown(event, index)}
            >
              <span
                className={styles.swatch}
                style={{ backgroundColor: color.swatch }}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
        <p className={styles.disclaimer}>{exterior.disclaimer}</p>
      </div>
    </section>
  );
}
