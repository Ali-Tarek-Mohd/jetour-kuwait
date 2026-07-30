"use client";

import { ArrowDown01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { ModelDiscoverData } from "@/data/model-discover";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";

import styles from "./model-discover.module.css";

type HandoffState = "idle" | "aligning" | "cooldown";

export function ModelDiscoverHero({
  model,
  sectionIds,
}: {
  model: ModelDiscoverData;
  sectionIds: string[];
}) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaActiveRef = useRef(false);
  const navigationOpenRef = useRef(false);
  const reducedMotionRef = useRef(true);
  const [isMediaActive, setIsMediaActive] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video || !model.hero.video) {
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
        mediaActiveRef.current &&
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

        if (entry.intersectionRatio >= 0.58 && !mediaActiveRef.current) {
          mediaActiveRef.current = true;
          setIsMediaActive(true);
          video.currentTime = 0;
          playWhenAllowed();
          return;
        }

        if (entry.intersectionRatio <= 0.15 && mediaActiveRef.current) {
          mediaActiveRef.current = false;
          setIsMediaActive(false);
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
    observer.observe(hero);
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
      video.currentTime = 0;
    };
  }, [model.hero.video]);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (
      !hero ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      const leftOffset = -Math.max(window.innerWidth * 0.46, 440);

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-eyebrow]", {
          autoAlpha: 0,
          x: leftOffset,
          duration: 0.88,
        })
        .from(
          "[data-hero-title]",
          {
            autoAlpha: 0,
            x: leftOffset * 0.82,
            duration: 0.9,
          },
          "-=0.58",
        )
        .from(
          "[data-hero-subtitle]",
          {
            autoAlpha: 0,
            x: leftOffset * 0.62,
            duration: 0.78,
          },
          "-=0.58",
        )
        .from(
          "[data-hero-actions]",
          {
            autoAlpha: 0,
            x: -34,
            duration: 0.62,
          },
          "-=0.34",
        )
        .from(
          "[data-hero-stat]",
          {
            autoAlpha: 0,
            x: -24,
            y: 10,
            duration: 0.58,
            stagger: 0.075,
          },
          "-=0.25",
        );
    }, hero);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!hero || sections.length !== sectionIds.length) {
      return;
    }

    let disposed = false;
    let removeListeners = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollToPlugin")]).then(
      ([gsapModule, scrollToModule]) => {
        if (disposed) {
          return;
        }

        const runtimeGsap = gsapModule.default;
        runtimeGsap.registerPlugin(scrollToModule.default);

        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        const desktopPointer = window.matchMedia(
          "(min-width: 1025px) and (hover: hover) and (pointer: fine)",
        );
        let state: HandoffState = "idle";
        let accumulatedIntent = 0;
        let intentDirection = 0;
        let resetTimer: ReturnType<typeof setTimeout> | null = null;
        let cooldownTimer: ReturnType<typeof setTimeout> | null = null;
        let scrollTween: gsap.core.Tween | null = null;
        let navigationOpen = false;

        const clearIntent = () => {
          accumulatedIntent = 0;
          intentDirection = 0;
          if (resetTimer) {
            clearTimeout(resetTimer);
            resetTimer = null;
          }
        };

        const clearCooldown = () => {
          if (cooldownTimer) {
            clearTimeout(cooldownTimer);
            cooldownTimer = null;
          }
          if (state === "cooldown") {
            state = "idle";
          }
        };

        const armCooldown = () => {
          if (cooldownTimer) {
            clearTimeout(cooldownTimer);
          }
          cooldownTimer = setTimeout(() => {
            cooldownTimer = null;
            if (state === "cooldown") {
              state = "idle";
            }
          }, 170);
        };

        const cancelAlignment = () => {
          scrollTween?.kill();
          scrollTween = null;
          clearIntent();
          clearCooldown();
          state = "idle";
        };

        const canAlign = () =>
          desktopPointer.matches &&
          !reducedMotion.matches &&
          !navigationOpen &&
          document.visibilityState === "visible";

        const onWheel = (event: WheelEvent) => {
          if (event.ctrlKey || !canAlign()) {
            return;
          }

          if (state === "aligning") {
            event.preventDefault();
            return;
          }

          const alignedIndex = sections.findIndex(
            (section) => Math.abs(section.getBoundingClientRect().top) <= 4,
          );

          if (state === "cooldown") {
            if (alignedIndex >= 0) {
              event.preventDefault();
              armCooldown();
            }
            return;
          }

          if (
            alignedIndex < 0 ||
            event.deltaY === 0 ||
            Math.abs(event.deltaX) >= Math.abs(event.deltaY)
          ) {
            return;
          }

          const direction = event.deltaY > 0 ? 1 : -1;
          const targetIndex = alignedIndex + direction;
          if (targetIndex < 0 || targetIndex >= sections.length) {
            clearIntent();
            return;
          }

          event.preventDefault();
          if (intentDirection !== 0 && intentDirection !== direction) {
            clearIntent();
          }
          intentDirection = direction;
          accumulatedIntent += Math.abs(event.deltaY);
          if (resetTimer) {
            clearTimeout(resetTimer);
          }
          resetTimer = setTimeout(clearIntent, 140);

          if (accumulatedIntent < 18) {
            return;
          }

          state = "aligning";
          clearIntent();
          scrollTween = runtimeGsap.to(window, {
            scrollTo: {
              y: sections[targetIndex],
              offsetY: 0,
              autoKill: false,
            },
            duration: 0.7,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              scrollTween = null;
              state = "cooldown";
              armCooldown();
            },
          });
        };

        const onNavigationActivity = (event: Event) => {
          navigationOpen = Boolean(
            (event as CustomEvent<{ active?: boolean }>).detail?.active,
          );
          if (navigationOpen) {
            cancelAlignment();
          }
        };

        const onVisibilityChange = () => {
          if (document.visibilityState !== "visible") {
            cancelAlignment();
          }
        };

        const onEnvironmentChange = () => {
          if (!canAlign()) {
            cancelAlignment();
          }
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener(
          NAVIGATION_ACTIVITY_EVENT,
          onNavigationActivity,
        );
        document.addEventListener("visibilitychange", onVisibilityChange);
        reducedMotion.addEventListener("change", onEnvironmentChange);
        desktopPointer.addEventListener("change", onEnvironmentChange);

        removeListeners = () => {
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener(
            NAVIGATION_ACTIVITY_EVENT,
            onNavigationActivity,
          );
          document.removeEventListener(
            "visibilitychange",
            onVisibilityChange,
          );
          reducedMotion.removeEventListener("change", onEnvironmentChange);
          desktopPointer.removeEventListener("change", onEnvironmentChange);
          cancelAlignment();
        };
      },
    );

    return () => {
      disposed = true;
      removeListeners();
    };
  }, [sectionIds]);

  return (
    <section
      ref={heroRef}
      id={model.hero.id}
      className={styles.hero}
      data-copy-position={model.hero.copyPosition ?? "left"}
      data-has-video={model.hero.video ? "true" : "false"}
      data-header-theme="dark"
      aria-labelledby={model.hero.headingId}
    >
      <Image
        className={styles.heroImage}
        src={model.hero.image}
        alt={model.hero.imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        style={{ objectPosition: model.hero.objectPosition }}
      />
      {model.hero.video ? (
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay={isMediaActive && !reducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster={model.hero.video.poster}
          aria-hidden="true"
          style={{ objectPosition: model.hero.objectPosition }}
        >
          <source src={model.hero.video.src} type="video/mp4" />
        </video>
      ) : null}
      <div className={styles.heroShade} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow} data-hero-eyebrow>
            {model.hero.eyebrow}
          </p>
          <h1
            id={model.hero.headingId}
            className={styles.heroTitle}
            data-hero-title
          >
            {model.name}
          </h1>
          <p className={styles.heroSubtitle} data-hero-subtitle>
            {model.hero.supportingLine}
          </p>

          <div className={styles.heroActions} data-hero-actions>
            {model.hero.primaryAction === "discover" ? (
              <>
                <Link className={styles.heroPrimaryAction} href="#overview">
                  <span>Discover {model.name}</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
                </Link>
                <Link
                  className={styles.heroDiscoverAction}
                  href={`/book-test-drive?model=${model.slug}`}
                >
                  <span>Book a Test Drive</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={styles.heroPrimaryAction}
                  href={`/book-test-drive?model=${model.slug}`}
                >
                  <span>Book a Test Drive</span>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} size={18} />
                </Link>
                <Link className={styles.heroDiscoverAction} href="#overview">
                  <span>Discover {model.name}</span>
                  <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
                </Link>
              </>
            )}
          </div>

        </div>

        <dl
          className={styles.heroHighlights}
          aria-label={`${model.name} highlights`}
        >
          {model.hero.highlights.map((highlight) => (
            <div
              className={styles.heroHighlight}
              data-hero-stat
              key={`${highlight.value}-${highlight.label}`}
            >
              <dt>{highlight.value}</dt>
              <dd>{highlight.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
