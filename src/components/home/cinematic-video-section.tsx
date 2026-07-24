"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import PauseIcon from "@hugeicons/core-free-icons/PauseIcon";
import PlayIcon from "@hugeicons/core-free-icons/PlayIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";
import styles from "./cinematic-video-section.module.css";

type CinematicFilm = {
  id: string;
  title: string;
  label: string;
  description: string;
  src: string;
  poster: string;
  modelHref?: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
};

type PendingFilm = {
  index: number;
  slot: 0 | 1;
  requestId: number;
};

type HandoffState = "ready" | "aligning" | "showcase" | "released";
type GsapApi = typeof import("gsap").gsap;
type GsapTimeline = ReturnType<GsapApi["timeline"]>;

const films: CinematicFilm[] = [
  {
    id: "g700",
    title: "G700",
    label: "G700",
    description: "Experience the G700 in motion.",
    src: "/videos/home/g700-product-web.mp4",
    poster: "/images/home/video-posters/g700-product.webp",
    modelHref: "/models/g700",
    objectPositionDesktop: "52% 50%",
    objectPositionMobile: "50% 50%",
  },
  {
    id: "t1-t2",
    title: "T1 & T2",
    label: "T1 & T2",
    description: "Discover T1 and T2 in motion.",
    src: "/videos/home/t1-t2-mix-web.mp4",
    poster: "/images/home/video-posters/t1-t2-mix.webp",
    modelHref: "/models",
    objectPositionDesktop: "50% 50%",
    objectPositionMobile: "50% 50%",
  },
];

export function CinematicVideoSection() {
  const [slotFilms, setSlotFilms] = useState<[number | null, number | null]>([
    0,
    null,
  ]);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [pending, setPending] = useState<PendingFilm | null>(null);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [manuallyStarted, setManuallyStarted] = useState(false);
  const [inView, setInView] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [announcement, setAnnouncement] = useState("G700 film selected");

  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([null, null]);
  const chapterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const gsapRef = useRef<GsapApi | null>(null);
  const transitionRef = useRef<GsapTimeline | null>(null);
  const requestIdRef = useRef(0);
  const startedRequestRef = useRef(0);
  const latestTargetRef = useRef(0);
  const activeSlotRef = useRef<0 | 1>(0);
  const displayedIndexRef = useRef(0);
  const pendingRef = useRef<PendingFilm | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    activeSlotRef.current = activeSlot;
  }, [activeSlot]);

  useEffect(() => {
    displayedIndexRef.current = displayedIndex;
  }, [displayedIndex]);

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);

  useEffect(() => {
    if (!pending) return;
    videoRefs.current[pending.slot]?.load();
  }, [pending, slotFilms]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = motionQuery.matches;
      setReducedMotion(motionQuery.matches);
    };
    update();
    motionQuery.addEventListener("change", update);
    return () => motionQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.intersectionRatio >= 0.58),
      { threshold: [0, 0.58, 0.7] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setDocumentVisible(!document.hidden);
    const onNavigation = (event: Event) =>
      setNavigationOpen(
        (event as CustomEvent<{ active: boolean }>).detail.active,
      );

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);
    };
  }, []);

  const shouldPlay =
    inView &&
    documentVisible &&
    !navigationOpen &&
    !pausedByUser &&
    (!reducedMotion || manuallyStarted);

  useEffect(() => {
    const activeVideo = videoRefs.current[activeSlot];
    const inactiveVideo = videoRefs.current[activeSlot === 0 ? 1 : 0];
    inactiveVideo?.pause();
    if (!activeVideo) return;

    activeVideo.muted = true;
    activeVideo.defaultMuted = true;
    if (shouldPlay) {
      void activeVideo.play().catch(() => {
        setPausedByUser(true);
      });
    } else {
      activeVideo.pause();
    }
  }, [activeSlot, shouldPlay]);

  const resetSlotPresentation = useCallback((slot: 0 | 1, opacity: number) => {
    const video = videoRefs.current[slot];
    const gsap = gsapRef.current;
    if (!video) return;
    if (gsap) {
      gsap.set(video, { opacity });
    } else {
      video.style.opacity = String(opacity);
    }
  }, []);

  const finishTransition = useCallback(
    (target: PendingFilm) => {
      if (
        target.requestId !== requestIdRef.current ||
        latestTargetRef.current !== target.index
      ) {
        return;
      }

      const outgoingSlot = activeSlotRef.current;
      const outgoingVideo = videoRefs.current[outgoingSlot];
      outgoingVideo?.pause();
      if (outgoingVideo) outgoingVideo.currentTime = 0;

      resetSlotPresentation(outgoingSlot, 0);
      resetSlotPresentation(target.slot, 1);
      activeSlotRef.current = target.slot;
      displayedIndexRef.current = target.index;
      pendingRef.current = null;
      startedRequestRef.current = 0;
      setActiveSlot(target.slot);
      setDisplayedIndex(target.index);
      setPending(null);
      setAnnouncement(`${films[target.index].title} film selected`);
      transitionRef.current = null;
    },
    [resetSlotPresentation],
  );

  const beginTransition = useCallback(
    (target: PendingFilm) => {
      if (
        target.requestId !== requestIdRef.current ||
        latestTargetRef.current !== target.index ||
        pendingRef.current?.requestId !== target.requestId ||
        startedRequestRef.current === target.requestId
      ) {
        return;
      }
      startedRequestRef.current = target.requestId;

      const gsap = gsapRef.current;
      const outgoingVideo = videoRefs.current[activeSlotRef.current];
      const incomingVideo = videoRefs.current[target.slot];
      if (!outgoingVideo || !incomingVideo) return;

      transitionRef.current?.kill();
      resetSlotPresentation(activeSlotRef.current, 1);
      resetSlotPresentation(target.slot, 0);
      incomingVideo.currentTime = 0;
      incomingVideo.muted = true;
      incomingVideo.defaultMuted = true;

      const startFade = () => {
        if (
          target.requestId !== requestIdRef.current ||
          latestTargetRef.current !== target.index
        ) {
          return;
        }

        if (!gsap) {
          finishTransition(target);
          return;
        }

        const duration = reducedMotionRef.current ? 0.08 : 0.8;
        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: () => finishTransition(target),
        });
        transitionRef.current = timeline;
        timeline
          .to(
            incomingVideo,
            { opacity: 1, duration, ease: "power2.inOut" },
            0,
          )
          .to(
            outgoingVideo,
            { opacity: 0, duration, ease: "power2.inOut" },
            0,
          );
      };

      if (shouldPlay) {
        void incomingVideo.play().then(startFade).catch(() => {
          latestTargetRef.current = displayedIndexRef.current;
          startedRequestRef.current = 0;
          pendingRef.current = null;
          setPending(null);
          resetSlotPresentation(target.slot, 0);
        });
      } else {
        incomingVideo.pause();
        startFade();
      }
    },
    [finishTransition, resetSlotPresentation, shouldPlay],
  );

  const selectFilm = useCallback(
    (targetIndex: number) => {
      if (
        targetIndex < 0 ||
        targetIndex >= films.length ||
        (targetIndex === displayedIndexRef.current && !pendingRef.current)
      ) {
        return;
      }

      const requestId = ++requestIdRef.current;
      startedRequestRef.current = 0;
      latestTargetRef.current = targetIndex;
      transitionRef.current?.kill();
      transitionRef.current = null;
      resetSlotPresentation(activeSlotRef.current, 1);

      const targetSlot: 0 | 1 = activeSlotRef.current === 0 ? 1 : 0;
      const target: PendingFilm = {
        index: targetIndex,
        slot: targetSlot,
        requestId,
      };
      pendingRef.current = target;
      setSlotFilms((current) => {
        const next: [number | null, number | null] = [...current];
        next[targetSlot] = targetIndex;
        return next;
      });
      setPending(target);
    },
    [resetSlotPresentation],
  );

  useEffect(() => {
    let mounted = true;
    const videos = videoRefs.current;
    void import("gsap").then(({ gsap }) => {
      if (!mounted) return;
      gsapRef.current = gsap;
      resetSlotPresentation(0, 1);
      resetSlotPresentation(1, 0);
    });
    return () => {
      mounted = false;
      transitionRef.current?.kill();
      videos.forEach((video) => video?.pause());
      gsapRef.current = null;
    };
  }, [resetSlotPresentation]);

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollToPlugin")]).then(
      ([gsapModule, scrollToModule]) => {
        if (!mounted || !sectionRef.current) return;

        const gsap = gsapModule.gsap;
        gsap.registerPlugin(scrollToModule.ScrollToPlugin);
        let state: HandoffState = "released";
        let navigationActive = false;
        let intent = 0;
        let intentTimer: number | null = null;
        let tween: ReturnType<typeof gsap.to> | null = null;

        const supported = () =>
          window.innerWidth > 1024 &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const clearIntent = () => {
          intent = 0;
          if (intentTimer !== null) {
            window.clearTimeout(intentTimer);
            intentTimer = null;
          }
        };

        const positions = () => {
          const model = document.getElementById("models");
          const video = sectionRef.current;
          return {
            modelTop: model?.offsetTop ?? -1,
            videoTop: video?.offsetTop ?? -1,
          };
        };

        const settle = () => {
          const { modelTop, videoTop } = positions();
          if (Math.abs(window.scrollY - videoTop) <= 3) state = "showcase";
          else if (Math.abs(window.scrollY - modelTop) <= 3) state = "ready";
          else state = "released";
        };

        const stopTween = () => {
          if (!tween) return;
          tween.kill();
          tween = null;
          settle();
        };

        const align = () => {
          const section = sectionRef.current;
          if (!section || state !== "ready") return;
          state = "aligning";
          clearIntent();
          tween = gsap.to(window, {
            scrollTo: {
              y: section.offsetTop,
              offsetY: 0,
              autoKill: false,
            },
            duration: 0.7,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              tween = null;
              state = "showcase";
            },
            onInterrupt: () => {
              tween = null;
              settle();
            },
          });
        };

        const onWheel = (event: WheelEvent) => {
          if (
            event.ctrlKey ||
            navigationActive ||
            !supported() ||
            document.hidden
          ) {
            return;
          }

          if (state === "aligning") {
            event.preventDefault();
            return;
          }

          if (state === "showcase") {
            if (event.deltaY > 0) state = "released";
            return;
          }

          if (state !== "ready") return;
          const { modelTop } = positions();
          if (
            Math.abs(window.scrollY - modelTop) > 4 ||
            event.deltaY <= 0 ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ) {
            clearIntent();
            return;
          }

          event.preventDefault();
          intent += event.deltaY;
          if (intentTimer !== null) window.clearTimeout(intentTimer);
          intentTimer = window.setTimeout(clearIntent, 140);
          if (intent >= 20) align();
        };

        const onScroll = () => {
          if (state === "aligning") return;
          const { modelTop, videoTop } = positions();
          if (Math.abs(window.scrollY - modelTop) <= 3) state = "ready";
          else if (Math.abs(window.scrollY - videoTop) <= 3)
            state = "showcase";
          else if (state !== "released") state = "released";
        };

        const onNavigation = (event: Event) => {
          navigationActive = (
            event as CustomEvent<{ active: boolean }>
          ).detail.active;
          if (navigationActive) {
            clearIntent();
            stopTween();
          }
        };

        const onResize = () => {
          clearIntent();
          if (!supported()) stopTween();
          else settle();
        };

        settle();
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);

        cleanup = () => {
          clearIntent();
          tween?.kill();
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          window.removeEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);
        };
      },
    );

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  const handleChapterKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % films.length
        : (index - 1 + films.length) % films.length;
    chapterRefs.current[nextIndex]?.focus();
    selectFilm(nextIndex);
  };

  const activeFilm = films[displayedIndex];

  return (
    <section
      ref={sectionRef}
      id="jetour-films"
      data-header-theme="dark"
      className={styles.section}
      aria-label="Jetour cinematic films"
    >
      <div className={styles.videoViewport}>
        {slotFilms.map((filmIndex, slotIndex) => {
          if (filmIndex === null) return null;
          const film = films[filmIndex];
          const slot = slotIndex as 0 | 1;
          return (
            <video
              key={slot}
              ref={(element) => {
                videoRefs.current[slot] = element;
                if (element) {
                  element.muted = true;
                  element.defaultMuted = true;
                }
              }}
              className={styles.video}
              style={
                {
                  "--film-position-desktop": film.objectPositionDesktop,
                  "--film-position-mobile": film.objectPositionMobile,
                } as CSSProperties
              }
              src={film.src}
              poster={film.poster}
              muted
              loop
              playsInline
              preload={slot === activeSlot && inView ? "metadata" : "none"}
              aria-hidden="true"
              tabIndex={-1}
              onCanPlay={() => {
                if (
                  pending?.slot === slot &&
                  pending.index === filmIndex
                ) {
                  beginTransition(pending);
                }
              }}
              onError={() => {
                if (pending?.slot !== slot) return;
                latestTargetRef.current = displayedIndexRef.current;
                startedRequestRef.current = 0;
                pendingRef.current = null;
                setPending(null);
                resetSlotPresentation(slot, 0);
              }}
            />
          );
        })}
        <div className={styles.readabilityGradient} aria-hidden="true" />
      </div>

      <div className={styles.editorial}>
        <div className={styles.eyebrowRow}>
          <span>Jetour Films</span>
          <span className={styles.rule} aria-hidden="true" />
          <span>
            {String(displayedIndex + 1).padStart(2, "0")} /{" "}
            {String(films.length).padStart(2, "0")}
          </span>
        </div>
        <h2>{activeFilm.title}</h2>
        <p>{activeFilm.description}</p>
        {activeFilm.modelHref ? (
          <Link href={activeFilm.modelHref} className={styles.cta}>
            {activeFilm.id === "g700" ? "Explore G700" : "Explore the Range"}
          </Link>
        ) : null}
      </div>

      <div
        className={styles.chapterSelector}
        role="tablist"
        aria-label="Choose a Jetour film"
      >
        {films.map((film, index) => (
          <button
            key={film.id}
            ref={(element) => {
              chapterRefs.current[index] = element;
            }}
            type="button"
            role="tab"
            aria-selected={displayedIndex === index}
            aria-current={displayedIndex === index ? "true" : undefined}
            aria-label={`Show ${film.title} film`}
            className={styles.chapter}
            onClick={() => selectFilm(index)}
            onKeyDown={(event) => handleChapterKeyDown(event, index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{film.label}</strong>
          </button>
        ))}
      </div>

      <div className={styles.playbackControls}>
        <button
          type="button"
          className={styles.control}
          aria-label={
            pausedByUser ? "Play cinematic video" : "Pause cinematic video"
          }
          onClick={() => {
            if (pausedByUser) setManuallyStarted(true);
            setPausedByUser((current) => !current);
          }}
        >
          <HugeiconsIcon
            icon={pausedByUser ? PlayIcon : PauseIcon}
            size={20}
          />
        </button>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </section>
  );
}
