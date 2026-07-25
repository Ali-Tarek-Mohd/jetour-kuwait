"use client";

import gsap from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import type { ModelDiscoverData } from "@/data/model-discover";

import styles from "./model-discover.module.css";

export function ModelDiscoverOverview({
  model,
}: {
  model: ModelDiscoverData;
}) {
  const overviewRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const overview = overviewRef.current;
    if (
      !overview ||
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
            .from("[data-overview-copy]", {
              autoAlpha: 0,
              x: -70,
              duration: 0.82,
              stagger: 0.09,
            })
            .from(
              "[data-overview-vehicle]",
              {
                autoAlpha: 0,
                x: 60,
                scale: 0.985,
                duration: 0.9,
              },
              "-=0.64",
            )
            .from(
              "[data-overview-stat]",
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.58,
                stagger: 0.1,
              },
              "-=0.36",
            );
        },
        { threshold: 0.36 },
      );

      observer.observe(overview);
      return () => observer.disconnect();
    }, overview);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={overviewRef}
      id="overview"
      className={styles.overview}
      data-header-theme="dark"
      aria-labelledby="g700-overview-title"
    >
      <div className={styles.overviewWordmark} aria-hidden="true">
        {model.name}
      </div>

      <div className={styles.overviewInner}>
        <div className={styles.overviewCopy}>
          <p className={styles.overviewIndex} data-overview-copy>
            {model.overview.index}
          </p>
          <h2
            id="g700-overview-title"
            className={styles.overviewTitle}
            data-overview-copy
          >
            {model.overview.heading}
          </h2>
          <p className={styles.overviewDescription} data-overview-copy>
            {model.overview.description}
          </p>
        </div>

        <div className={styles.overviewVehicle} data-overview-vehicle>
          <div className={styles.overviewGlow} aria-hidden="true" />
          <Image
            className={styles.overviewVehicleImage}
            src={model.overview.image}
            alt={model.overview.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
          />
        </div>

        <dl className={styles.overviewDetails}>
          {model.overview.facts.map((fact) => (
            <div
              className={styles.overviewDetail}
              data-overview-stat
              key={`${fact.value}-${fact.label}`}
            >
              <dt>{fact.value}</dt>
              <dd>{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
