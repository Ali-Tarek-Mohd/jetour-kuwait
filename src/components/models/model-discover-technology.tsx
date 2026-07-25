"use client";

import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import Image from "next/image";
import {
  type KeyboardEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import type { ModelDiscoverData } from "@/data/model-discover";

import styles from "./model-discover-technology.module.css";

const SWIPE_THRESHOLD = 42;

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function formatCounter(index: number, length: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(length).padStart(2, "0")}`;
}

export function ModelDiscoverTechnology({
  model,
}: {
  model: ModelDiscoverData;
}) {
  const slides = model.technology.slides;
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const preloadPromisesRef = useRef<Array<Promise<boolean>>>([]);
  const activeIndexRef = useRef(0);
  const queuedIndexRef = useRef<number | null>(null);
  const transitionRunningRef = useRef(false);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(true);
  const touchStartXRef = useRef<number | null>(null);
  const requestIndexRef = useRef<(index: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    preloadPromisesRef.current = slides.map(
      (slide) =>
        new Promise<boolean>((resolve) => {
          const image = new window.Image();
          let settled = false;
          const finish = (loaded: boolean) => {
            if (!settled) {
              settled = true;
              resolve(loaded);
            }
          };

          image.src = slide.image;
          image.onload = () => {
            void image
              .decode()
              .then(() => finish(true))
              .catch(() => finish(true));
          };
          image.onerror = () => finish(false);
          if (image.complete && image.naturalWidth > 0) {
            void image
              .decode()
              .then(() => finish(true))
              .catch(() => finish(true));
          }
        }),
    );

    return () => {
      mountedRef.current = false;
      transitionTimelineRef.current?.kill();
    };
  }, [slides]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const image = imageRevealRef.current;
    const metadata = metadataRef.current;
    const controls = controlsRef.current;
    if (!section || !label || !image || !metadata || !controls) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    if (reducedMotion.matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.set(label, { autoAlpha: 0, y: 12 });
      gsap.set(image, { autoAlpha: 0, x: -24 });
      gsap.set(metadata, { autoAlpha: 0, x: 18 });
      gsap.set(controls, { autoAlpha: 0, y: 10 });

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }

          observer.disconnect();
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .to(label, { autoAlpha: 1, y: 0, duration: 0.42 })
            .to(
              image,
              { autoAlpha: 1, x: 0, duration: 0.68 },
              "-=0.18",
            )
            .to(
              metadata,
              { autoAlpha: 1, x: 0, duration: 0.52 },
              "-=0.38",
            )
            .from(
              "[data-technology-point]",
              {
                autoAlpha: 0,
                y: 9,
                stagger: 0.055,
                duration: 0.34,
              },
              "-=0.28",
            )
            .to(
              controls,
              { autoAlpha: 1, y: 0, duration: 0.38 },
              "-=0.18",
            );
        },
        { threshold: 0.42 },
      );
      observer.observe(section);

      return () => observer.disconnect();
    }, section);

    return () => context.revert();
  }, []);

  const animateToIndex = useCallback(
    (targetIndex: number) =>
      new Promise<void>((resolve) => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const image = imageRef.current;
        const metadata = metadataRef.current;

        if (reducedMotion || !image || !metadata) {
          flushSync(() => setActiveIndex(targetIndex));
          activeIndexRef.current = targetIndex;
          resolve();
          return;
        }

        const timeline = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            transitionTimelineRef.current = null;
            resolve();
          },
        });
        transitionTimelineRef.current = timeline;

        timeline
          .to([image, metadata], {
            autoAlpha: 0,
            y: 7,
            duration: 0.14,
            ease: "power2.in",
          })
          .call(() => {
            flushSync(() => setActiveIndex(targetIndex));
            activeIndexRef.current = targetIndex;
          })
          .set([image, metadata], { y: -7 })
          .to([image, metadata], {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            ease: "power2.out",
          });
      }),
    [],
  );

  const drainQueue = useCallback(async () => {
    if (transitionRunningRef.current) {
      return;
    }

    transitionRunningRef.current = true;
    while (mountedRef.current && queuedIndexRef.current !== null) {
      let targetIndex = queuedIndexRef.current;
      queuedIndexRef.current = null;
      let loaded =
        (await preloadPromisesRef.current[targetIndex]) ?? false;

      if (!mountedRef.current) {
        break;
      }

      if (queuedIndexRef.current !== null) {
        targetIndex = queuedIndexRef.current;
        queuedIndexRef.current = null;
        loaded = (await preloadPromisesRef.current[targetIndex]) ?? false;
      }

      if (loaded && targetIndex !== activeIndexRef.current) {
        await animateToIndex(targetIndex);
      }
    }
    transitionRunningRef.current = false;
  }, [animateToIndex]);

  const requestIndex = useCallback(
    (index: number) => {
      const targetIndex = wrapIndex(index, slides.length);
      if (
        targetIndex === activeIndexRef.current &&
        !transitionRunningRef.current
      ) {
        return;
      }
      queuedIndexRef.current = targetIndex;
      void drainQueue();
    },
    [drainQueue, slides.length],
  );

  useEffect(() => {
    requestIndexRef.current = requestIndex;
  }, [requestIndex]);

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }
    event.preventDefault();
    requestIndexRef.current(
      activeIndexRef.current + (event.key === "ArrowRight" ? 1 : -1),
    );
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartXRef.current = null;
    if (startX === null || endX === undefined) {
      return;
    }

    const distance = endX - startX;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) {
      requestIndexRef.current(activeIndexRef.current + (distance < 0 ? 1 : -1));
    }
  };

  const slide = slides[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="intelligent-technology"
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="g700-technology-title"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p ref={labelRef} className={styles.label}>
        {model.technology.index}
      </p>

      <div className={styles.layout}>
        <div ref={imageRevealRef} className={styles.imageStage}>
          <div ref={imageRef} className={styles.image}>
            <Image
              src={slide.image}
              alt={slide.imageAlt}
              width={1808}
              height={678}
              unoptimized
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, min(94vw, 1808px)"
              style={{ objectPosition: slide.objectPosition }}
            />
          </div>
          <div className={styles.imageShade} aria-hidden="true" />
        </div>

        <div className={styles.information}>
          <div ref={metadataRef} className={styles.metadata}>
            <div className={styles.identity}>
              <p className={styles.counter}>
                {formatCounter(activeIndex, slides.length)}
              </p>
              <h2 id="g700-technology-title">{slide.heading}</h2>
            </div>

            <div className={styles.details}>
              <p className={styles.description}>{slide.description}</p>
              <ul>
                {slide.points.map((point) => (
                  <li data-technology-point key={point}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div ref={controlsRef} className={styles.navigation}>
            <div className={styles.progress} aria-label="Technology features">
              {slides.map((item, index) => (
                <button
                  type="button"
                  key={item.heading}
                  aria-label={`Show ${item.heading.replace(".", "")}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  onClick={() => requestIndex(index)}
                >
                  <span />
                </button>
              ))}
            </div>

            <div className={styles.arrows}>
              <button
                type="button"
                aria-label="Previous technology feature"
                onClick={() => requestIndex(activeIndexRef.current - 1)}
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={22} />
              </button>
              <button
                type="button"
                aria-label="Next technology feature"
                onClick={() => requestIndex(activeIndexRef.current + 1)}
              >
                <HugeiconsIcon icon={ArrowRight01Icon} size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className={styles.announcement} aria-live="polite">
        {slide.heading}
      </p>
    </section>
  );
}
