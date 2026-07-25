"use client";

import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import Image from "next/image";
import {
  type CSSProperties,
  type KeyboardEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import type { ModelDiscoverInteriorDetails as ModelDiscoverInteriorDetailsData } from "@/data/model-discover";

import styles from "./model-discover-interior.module.css";

const DESKTOP_GALLERY_QUERY =
  "(min-width: 1025px) and (hover: hover) and (pointer: fine)";
const SWIPE_THRESHOLD = 42;

type GalleryRole =
  | "detailsActive"
  | "detailsPreviewOne"
  | "detailsPreviewTwo"
  | "detailsPreviewThree"
  | "detailsPrevious";

const galleryRoles: GalleryRole[] = [
  "detailsActive",
  "detailsPreviewOne",
  "detailsPreviewTwo",
  "detailsPreviewThree",
  "detailsPrevious",
];

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function formatCounter(index: number, length: number) {
  return `${String(index + 1).padStart(2, "0")} / ${String(length).padStart(2, "0")}`;
}

export function ModelDiscoverInteriorDetails({
  modelName,
  interior,
}: {
  modelName: string;
  interior: ModelDiscoverInteriorDetailsData;
}) {
  const features = interior.items;
  const sectionRef = useRef<HTMLElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const preloadPromisesRef = useRef<Array<Promise<void>>>([]);
  const activeIndexRef = useRef(0);
  const queuedIndexRef = useRef<number | null>(null);
  const transitionRunningRef = useRef(false);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(true);
  const touchStartXRef = useRef<number | null>(null);
  const requestIndexRef = useRef<(index: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [metadataIndex, setMetadataIndex] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    preloadPromisesRef.current = features.map(
      (feature) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.src = feature.image;
          image.onload = () => {
            void image.decode().catch(() => undefined).finally(resolve);
          };
          image.onerror = () => resolve();
          if (image.complete) {
            void image.decode().catch(() => undefined).finally(resolve);
          }
        }),
    );

    return () => {
      mountedRef.current = false;
      transitionTimelineRef.current?.kill();
    };
  }, [features]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const items = itemRefs.current;
    const metadata = metadataRef.current;
    if (!section) {
      return;
    }

    const initialActiveItem = items[0];
    if (initialActiveItem) {
      gsap.set(initialActiveItem, {
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        visibility: "visible",
        transformOrigin: "top left",
      });
    }

    return () => {
      gsap.killTweensOf(items);
      if (metadata) {
        gsap.killTweensOf(metadata);
      }
    };
  }, []);

  const animateToIndex = useCallback(
    (targetIndex: number) =>
      new Promise<void>((resolve) => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        const desktopGallery =
          window.matchMedia(DESKTOP_GALLERY_QUERY).matches;

        if (reducedMotion || !desktopGallery) {
          flushSync(() => {
            setActiveIndex(targetIndex);
            setMetadataIndex(targetIndex);
          });
          activeIndexRef.current = targetIndex;
          resolve();
          return;
        }

        const nodes = itemRefs.current.filter(
          (node): node is HTMLButtonElement => Boolean(node),
        );
        const previousGeometry = new Map(
          nodes.map((node) => [
            node,
            {
              rect: node.getBoundingClientRect(),
              opacity: Number.parseFloat(getComputedStyle(node).opacity),
            },
          ]),
        );

        flushSync(() => setActiveIndex(targetIndex));
        activeIndexRef.current = targetIndex;

        const nextGeometry = new Map(
          nodes.map((node) => [
            node,
            {
              rect: node.getBoundingClientRect(),
              opacity: Number.parseFloat(getComputedStyle(node).opacity),
            },
          ]),
        );

        nodes.forEach((node) => {
          const previous = previousGeometry.get(node);
          const next = nextGeometry.get(node);
          if (!previous || !next || next.rect.width === 0 || next.rect.height === 0) {
            return;
          }

          gsap.set(node, {
            x: previous.rect.left - next.rect.left,
            y: previous.rect.top - next.rect.top,
            scaleX: previous.rect.width / next.rect.width,
            scaleY: previous.rect.height / next.rect.height,
            opacity: previous.opacity,
            transformOrigin: "top left",
          });
        });

        const metadata = metadataRef.current;
        const timeline = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            transitionTimelineRef.current = null;
            resolve();
          },
        });
        transitionTimelineRef.current = timeline;

        timeline.to(
          nodes,
          {
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: (index) =>
              nextGeometry.get(nodes[index])?.opacity ?? 1,
            duration: 0.74,
            ease: "power3.inOut",
          },
          0,
        );

        if (metadata) {
          timeline
            .to(
              metadata,
              {
                autoAlpha: 0,
                x: -10,
                duration: 0.16,
                ease: "power2.in",
              },
              0,
            )
            .call(() => setMetadataIndex(targetIndex), [], 0.22)
            .fromTo(
              metadata,
              { autoAlpha: 0, x: 10 },
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.24,
                ease: "power2.out",
              },
              0.29,
            );
        } else {
          setMetadataIndex(targetIndex);
        }
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

      await (preloadPromisesRef.current[targetIndex] ?? Promise.resolve());
      if (!mountedRef.current) {
        break;
      }

      if (queuedIndexRef.current !== null) {
        targetIndex = queuedIndexRef.current;
        queuedIndexRef.current = null;
        await (preloadPromisesRef.current[targetIndex] ?? Promise.resolve());
      }

      if (targetIndex !== activeIndexRef.current) {
        await animateToIndex(targetIndex);
      }
    }
    transitionRunningRef.current = false;
  }, [animateToIndex]);

  const requestIndex = useCallback(
    (index: number) => {
      const targetIndex = wrapIndex(index, features.length);
      if (
        targetIndex === activeIndexRef.current &&
        !transitionRunningRef.current
      ) {
        return;
      }
      queuedIndexRef.current = targetIndex;
      void drainQueue();
    },
    [drainQueue, features.length],
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

  const metadata = features[metadataIndex];

  return (
    <section
      ref={sectionRef}
      id={interior.id}
      className={styles.details}
      data-header-theme="dark"
      aria-labelledby={interior.headingId}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <header className={styles.detailsHeader}>
        <p>{interior.index}</p>
        <h2 id={interior.headingId}>
          {interior.heading}
        </h2>
      </header>

      <div className={styles.detailsStage}>
        <div
          className={styles.detailsGallery}
          aria-label={`${modelName} interior detail gallery`}
        >
          {features.map((feature, index) => {
            const offset = wrapIndex(index - activeIndex, features.length);
            const role = galleryRoles[offset];

            return (
              <button
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                className={`${styles.detailsItem} ${styles[role]}`}
                key={feature.title}
                aria-label={`Show ${feature.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => requestIndex(index)}
                style={
                  {
                    "--details-image-position": feature.objectPosition,
                  } as CSSProperties
                }
              >
                <Image
                  src={feature.image}
                  alt={index === activeIndex ? feature.imageAlt : ""}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </button>
            );
          })}
        </div>

        <div className={styles.detailsInformation}>
          <div ref={metadataRef} className={styles.detailsMetadata}>
            <p className={styles.detailsCounter}>
              {formatCounter(metadataIndex, features.length)}
            </p>
            <h3>{metadata.title}</h3>
            <p className={styles.detailsDescription}>{metadata.description}</p>
          </div>

          <div className={styles.detailsControls}>
            <button
              type="button"
              aria-label="Previous interior detail"
              onClick={() => requestIndex(activeIndexRef.current - 1)}
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={22} />
            </button>
            <button
              type="button"
              aria-label="Next interior detail"
              onClick={() => requestIndex(activeIndexRef.current + 1)}
            >
              <HugeiconsIcon icon={ArrowRight01Icon} size={22} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.detailsMobilePreviews} aria-label="Interior details">
        {features.map((feature, index) => (
          <button
            type="button"
            key={feature.title}
            aria-label={`Show ${feature.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => requestIndex(index)}
          >
            <Image src={feature.image} alt="" fill sizes="30vw" />
          </button>
        ))}
      </div>

      <p className={styles.detailsAnnouncement} aria-live="polite">
        {metadata.title}
      </p>
    </section>
  );
}
