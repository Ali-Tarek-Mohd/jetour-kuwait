"use client";

import ArrowUpRight01Icon from "@hugeicons/core-free-icons/ArrowUpRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useLayoutEffect, useRef } from "react";

import type { ModelDiscoverData } from "@/data/model-discover";

import styles from "./model-discover-final-cta.module.css";

export function ModelDiscoverFinalCta({
  model,
}: {
  model: ModelDiscoverData;
}) {
  const sectionRef = useRef<HTMLElement>(null);

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
            .from("[data-final-cta-image]", {
              autoAlpha: 0,
              duration: 0.7,
            })
            .from(
              "[data-final-cta-eyebrow]",
              {
                autoAlpha: 0,
                y: 12,
                duration: 0.42,
              },
              "-=0.42",
            )
            .from(
              "[data-final-cta-heading]",
              {
                autoAlpha: 0,
                x: -28,
                duration: 0.64,
              },
              "-=0.2",
            )
            .from(
              "[data-final-cta-description]",
              {
                autoAlpha: 0,
                x: -18,
                duration: 0.48,
              },
              "-=0.34",
            )
            .from(
              "[data-final-cta-actions]",
              {
                autoAlpha: 0,
                y: 12,
                duration: 0.44,
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

  return (
    <section
      ref={sectionRef}
      id="g700-final-cta"
      className={styles.section}
      data-header-theme="dark"
      aria-labelledby="g700-final-cta-title"
      style={
        {
          "--final-cta-position-desktop":
            model.finalCta.objectPositionDesktop,
          "--final-cta-position-mobile": model.finalCta.objectPositionMobile,
        } as CSSProperties
      }
    >
      <Image
        className={styles.image}
        src={model.finalCta.image}
        alt={model.finalCta.imageAlt}
        fill
        loading="lazy"
        sizes="100vw"
        data-final-cta-image
      />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow} data-final-cta-eyebrow>
          {model.finalCta.eyebrow}
        </p>
        <h2 id="g700-final-cta-title" data-final-cta-heading>
          {model.finalCta.heading}
        </h2>
        <p className={styles.description} data-final-cta-description>
          {model.finalCta.description}
        </p>

        <div className={styles.actions} data-final-cta-actions>
          <Link
            className={styles.primaryAction}
            href={`/book-test-drive?model=${model.slug}`}
          >
            <span>Book a Test Drive</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
          </Link>
          <Link className={styles.secondaryAction} href="/models">
            <span>View All Models</span>
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
