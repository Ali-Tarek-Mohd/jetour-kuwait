"use client";

import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { ModelDiscoverData } from "@/data/model-discover";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";

import styles from "./model-discover.module.css";

const OVERVIEW_VIDEO =
  "/images/vehicles/g700/discover/video/g700-overview.mp4";
const OVERVIEW_POSTER =
  "/images/vehicles/g700/discover/video/g700-overview-poster.webp";

export function ModelDiscoverOverview({
  model,
}: {
  model: ModelDiscoverData;
}) {
  const headingMatch = model.overview.heading.match(/^(.*\bthe)\s+(.+)$/i);
  const headingLines = headingMatch
    ? [headingMatch[1], headingMatch[2]]
    : [model.overview.heading];
  const overviewRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef(false);
  const navigationOpenRef = useRef(false);
  const reducedMotionRef = useRef(true);
  const [isActive, setIsActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const overview = overviewRef.current;
    const video = videoRef.current;
    if (!overview || !video) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      setReducedMotion(motionQuery.matches);
      if (motionQuery.matches) {
        video.pause();
        video.currentTime = 0;
      }
    };

    const playWhenAllowed = () => {
      video.muted = true;
      video.defaultMuted = true;
      if (
        activeRef.current &&
        !reducedMotionRef.current &&
        !navigationOpenRef.current &&
        !document.hidden
      ) {
        void video.play().catch(() => undefined);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }

        if (entry.intersectionRatio >= 0.58 && !activeRef.current) {
          activeRef.current = true;
          setIsActive(true);
          video.currentTime = 0;
          playWhenAllowed();
          return;
        }

        if (entry.intersectionRatio <= 0.15 && activeRef.current) {
          activeRef.current = false;
          setIsActive(false);
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: [0, 0.15, 0.58] },
    );

    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playWhenAllowed();
      }
    };

    const onNavigationActivity = (event: Event) => {
      navigationOpenRef.current = Boolean(
        (event as CustomEvent<{ active?: boolean }>).detail?.active,
      );
      if (navigationOpenRef.current) {
        video.pause();
      } else {
        playWhenAllowed();
      }
    };

    video.muted = true;
    video.defaultMuted = true;
    applyMotionPreference();
    observer.observe(overview);
    motionQuery.addEventListener("change", applyMotionPreference);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener(
      NAVIGATION_ACTIVITY_EVENT,
      onNavigationActivity,
    );

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", applyMotionPreference);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener(
        NAVIGATION_ACTIVITY_EVENT,
        onNavigationActivity,
      );
      video.pause();
    };
  }, []);

  useLayoutEffect(() => {
    const overview = overviewRef.current;
    if (!overview) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) {
      return;
    }

    let entered = false;
    let timeline: gsap.core.Timeline | null = null;
    const context = gsap.context(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          if (entry.intersectionRatio <= 0.15) {
            entered = false;
            timeline?.kill();
            timeline = null;
            gsap.set(
              [
                "[data-overview-media]",
                "[data-overview-copy]",
                "[data-overview-stat]",
              ],
              { clearProps: "opacity,visibility,transform" },
            );
            return;
          }

          if (entry.intersectionRatio < 0.58 || entered) {
            return;
          }

          entered = true;
          timeline = gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-overview-media]", {
              autoAlpha: 0,
              duration: 0.58,
            })
            .from(
              "[data-overview-copy]",
              {
                autoAlpha: 0,
                x: -48,
                duration: 0.7,
                stagger: 0.09,
              },
              "-=0.36",
            )
            .from(
              "[data-overview-stat]",
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.09,
              },
              "-=0.28",
            );
        },
        { threshold: [0, 0.15, 0.58] },
      );

      observer.observe(overview);
      return () => observer.disconnect();
    }, overview);

    return () => {
      timeline?.kill();
      context.revert();
    };
  }, []);

  return (
    <section
      ref={overviewRef}
      id="overview"
      className={styles.overview}
      data-header-theme="dark"
      aria-labelledby="g700-overview-title"
    >
      <div className={styles.overviewMedia} data-overview-media>
        <video
          ref={videoRef}
          className={styles.overviewVideo}
          autoPlay={isActive && !reducedMotion}
          muted
          playsInline
          preload="metadata"
          poster={OVERVIEW_POSTER}
          aria-hidden="true"
        >
          <source src={OVERVIEW_VIDEO} type="video/mp4" />
        </video>
      </div>
      <div className={styles.overviewShade} aria-hidden="true" />

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
            {headingLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className={styles.overviewDescription} data-overview-copy>
            {model.overview.description}
          </p>
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
