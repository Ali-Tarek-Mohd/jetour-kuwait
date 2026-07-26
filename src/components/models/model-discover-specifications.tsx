"use client";

import FileDownloadIcon from "@hugeicons/core-free-icons/FileDownloadIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

import type {
  ModelDiscoverSpecificationCategory,
  ModelDiscoverSpecifications as ModelDiscoverSpecificationsData,
} from "@/data/model-discover";

import styles from "./model-discover-specifications.module.css";

function SpecificationContent({
  category,
}: {
  category: ModelDiscoverSpecificationCategory;
}) {
  const rowCount = Math.ceil(category.details.length / 2);

  return (
    <>
      <div className={styles.leadValues}>
        {category.leadValues.map((lead) => {
          return (
            <div key={`${lead.value}-${lead.label}`}>
              <p data-lead-value={lead.typography}>
                {lead.displayLines
                  ? lead.displayLines.map((line) => (
                      <span className={styles.leadValueLine} key={line}>
                        {line}
                      </span>
                    ))
                  : lead.value}
              </p>
              <span>{lead.label}</span>
            </div>
          );
        })}
      </div>

      <dl
        className={styles.definitionList}
        style={{ "--specification-rows": rowCount } as CSSProperties}
      >
        {category.details.map((detail) => (
          <div key={`${detail.label}-${detail.value ?? "included"}`}>
            <dt>{detail.label}</dt>
            {detail.value ? <dd>{detail.value}</dd> : null}
          </div>
        ))}
      </dl>
    </>
  );
}

function SpecificationFooter({
  specifications,
}: {
  specifications: ModelDiscoverSpecificationsData;
}) {
  return (
    <div className={styles.specificationFooter}>
      <p className={styles.note}>{specifications.note}</p>
      {specifications.document ? (
        <a
          className={styles.documentAction}
          href={specifications.document.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={specifications.document.ariaLabel}
        >
          <HugeiconsIcon
            className={styles.documentIcon}
            icon={FileDownloadIcon}
            size={21}
            aria-hidden="true"
          />
          <span className={styles.documentCopy}>
            <small>{specifications.document.eyebrow}</small>
            <strong>{specifications.document.label}</strong>
          </span>
          <span className={styles.documentMetadata}>
            {specifications.document.metadata}
          </span>
        </a>
      ) : null}
    </div>
  );
}

export function ModelDiscoverSpecifications({
  modelName,
  specifications,
}: {
  modelName: string;
  specifications: ModelDiscoverSpecificationsData;
}) {
  const categories = specifications.categories;
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);
  const queuedIndexRef = useRef<number | null>(null);
  const transitionRunningRef = useRef(false);
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const mountedRef = useRef(true);
  const requestCategoryRef = useRef<(index: number) => void>(() => {});
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      transitionTimelineRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (
      !section ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) {
            return;
          }

          observer.disconnect();
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-specification-label]", {
              autoAlpha: 0,
              y: 12,
              duration: 0.42,
            })
            .from(
              "[data-specification-heading]",
              {
                autoAlpha: 0,
                x: -20,
                duration: 0.58,
              },
              "-=0.2",
            )
            .from(
              "[data-specification-category]",
              {
                autoAlpha: 0,
                x: -12,
                duration: 0.38,
                stagger: 0.055,
              },
              "-=0.3",
            )
            .from(
              "[data-specification-content]",
              {
                autoAlpha: 0,
                y: 13,
                duration: 0.5,
              },
              "-=0.2",
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
        const contents = [
          desktopContentRef.current,
          mobileContentRef.current,
        ].filter((node): node is HTMLDivElement => Boolean(node));

        if (reducedMotion || contents.length === 0) {
          flushSync(() => setActiveIndex(targetIndex));
          activeIndexRef.current = targetIndex;
          resolve();
          return;
        }

        const direction = targetIndex > activeIndexRef.current ? 1 : -1;
        const timeline = gsap.timeline({
          defaults: { overwrite: true },
          onComplete: () => {
            transitionTimelineRef.current = null;
            resolve();
          },
        });
        transitionTimelineRef.current = timeline;

        timeline
          .to(contents, {
            autoAlpha: 0,
            y: direction * -8,
            duration: 0.14,
            ease: "power2.in",
          })
          .call(() => {
            flushSync(() => setActiveIndex(targetIndex));
            activeIndexRef.current = targetIndex;
            const incomingContents = [
              desktopContentRef.current,
              mobileContentRef.current,
            ].filter((node): node is HTMLDivElement => Boolean(node));
            gsap.fromTo(
              incomingContents,
              { autoAlpha: 0, y: direction * 8 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.18,
                ease: "power2.out",
                overwrite: true,
              },
            );
          })
          .call(() => undefined, [], "+=0.18");
      }),
    [],
  );

  const drainQueue = useCallback(async () => {
    if (transitionRunningRef.current) {
      return;
    }

    transitionRunningRef.current = true;
    while (mountedRef.current && queuedIndexRef.current !== null) {
      const targetIndex = queuedIndexRef.current;
      queuedIndexRef.current = null;
      if (targetIndex !== activeIndexRef.current) {
        await animateToIndex(targetIndex);
      }
    }
    transitionRunningRef.current = false;
  }, [animateToIndex]);

  const requestCategory = useCallback(
    (index: number) => {
      if (
        index < 0 ||
        index >= categories.length ||
        (index === activeIndexRef.current &&
          !transitionRunningRef.current)
      ) {
        return;
      }
      queuedIndexRef.current = index;
      void drainQueue();
    },
    [categories.length, drainQueue],
  );

  useEffect(() => {
    requestCategoryRef.current = requestCategory;
  }, [requestCategory]);

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const previousKeys = ["ArrowUp", "ArrowLeft"];
    const nextKeys = ["ArrowDown", "ArrowRight"];
    if (!previousKeys.includes(event.key) && !nextKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = nextKeys.includes(event.key) ? 1 : -1;
    const targetIndex =
      (index + direction + categories.length) % categories.length;
    tabRefs.current[targetIndex]?.focus();
    requestCategoryRef.current(targetIndex);
  };

  const activeCategory = categories[activeIndex];

  return (
    <section
      ref={sectionRef}
      id={specifications.id}
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby={specifications.headingId}
    >
      <div className={styles.inner}>
        <p className={styles.label} data-specification-label>
          {specifications.index}
        </p>

        <div className={styles.desktopLayout}>
          <div className={styles.sidebar}>
            <h2
              id={specifications.headingId}
              data-specification-heading
            >
              {specifications.heading}
            </h2>

            <div
              className={styles.categoryNavigation}
              role="tablist"
              aria-label={`${modelName} specification categories`}
              aria-orientation="vertical"
            >
              {categories.map((category, index) => (
                <button
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  id={`${specifications.controlIdPrefix}-tab-${index}`}
                  type="button"
                  role="tab"
                  data-specification-category
                  aria-selected={index === activeIndex}
                  aria-controls={`${specifications.controlIdPrefix}-panel`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  key={category.name}
                  onClick={() => requestCategory(index)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div
            ref={desktopContentRef}
            id={`${specifications.controlIdPrefix}-panel`}
            className={styles.content}
            role="tabpanel"
            aria-labelledby={`${specifications.controlIdPrefix}-tab-${activeIndex}`}
            data-specification-content
          >
            <SpecificationContent category={activeCategory} />
            <SpecificationFooter specifications={specifications} />
          </div>
        </div>

        <div className={styles.mobileLayout}>
          <h2 data-specification-heading>
            {specifications.heading}
          </h2>

          <div className={styles.accordions}>
            {categories.map((category, index) => {
              const expanded = index === activeIndex;
              return (
                <div className={styles.accordion} key={category.name}>
                  <h3>
                    <button
                      type="button"
                      data-specification-category
                      aria-expanded={expanded}
                      aria-controls={`${specifications.controlIdPrefix}-accordion-${index}`}
                      onClick={() => requestCategory(index)}
                    >
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {category.name}
                      <b aria-hidden="true">{expanded ? "−" : "+"}</b>
                    </button>
                  </h3>
                  {expanded ? (
                    <div
                      ref={mobileContentRef}
                      id={`${specifications.controlIdPrefix}-accordion-${index}`}
                      className={styles.mobileContent}
                      data-specification-content
                    >
                      <SpecificationContent category={category} />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <SpecificationFooter specifications={specifications} />
        </div>

        <p className={styles.announcement} aria-live="polite">
          {activeCategory.name}
        </p>
      </div>
    </section>
  );
}
