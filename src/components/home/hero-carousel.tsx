"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import PauseIcon from "@hugeicons/core-free-icons/PauseIcon";
import PlayIcon from "@hugeicons/core-free-icons/PlayIcon";
import { HugeiconsIcon } from "@hugeicons/react";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";
import styles from "./hero-carousel.module.css";

const heroSlides = [
  {
    src: "/images/home/hero/01-t2.webp",
    alt: "Jetour T2 driving through a mountain stream",
    desktopY: "50%",
  },
  {
    src: "/images/home/hero/02-x50.webp",
    alt: "Black Jetour X50 presented on a city street",
    desktopY: "51%",
  },
  {
    src: "/images/home/hero/03-finance.webp",
    alt: "Jetour Kuwait vehicle range with zero percent profit promotion",
    desktopY: "50%",
  },
  {
    src: "/images/home/hero/04-g700-launch.webp",
    alt: "Jetour G700 Kuwait launch event",
    desktopY: "52%",
  },
  {
    src: "/images/home/hero/05-x70-plus.webp",
    alt: "Blue Jetour X70 Plus on an open road",
    desktopY: "50%",
  },
  {
    src: "/images/home/hero/06-x70.webp",
    alt: "White Jetour X70 on a mountain road",
    desktopY: "50%",
  },
] as const;

const VISIBLE_DURATION_MS = 7_500;
const CROSSFADE_DURATION_MS = 800;
const REDUCED_CROSSFADE_MS = 80;

type PreparedSlide = {
  index: number;
  requestId: number;
  ready: boolean;
};

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prepared, setPrepared] = useState<PreparedSlide | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [firstSlideStable, setFirstSlideStable] = useState(false);
  const [paused, setPaused] = useState(false);
  const [controlsActive, setControlsActive] = useState(false);
  const [navigationActive, setNavigationActive] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [timerEpoch, setTimerEpoch] = useState(0);

  const currentIndexRef = useRef(0);
  const preparedRef = useRef<PreparedSlide | null>(null);
  const requestIdRef = useRef(0);
  const transitionTimerRef = useRef<number | null>(null);
  const transitioningRef = useRef(false);
  const pendingTargetRef = useRef<number | null>(null);
  const loadedSlidesRef = useRef(new Set<number>([0]));
  const failedSlidesRef = useRef(new Set<number>());

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    preparedRef.current = prepared;
  }, [prepared]);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const findNextAvailable = useCallback((from: number, direction: 1 | -1) => {
    for (let offset = 1; offset <= heroSlides.length; offset += 1) {
      const candidate =
        (from + direction * offset + heroSlides.length) % heroSlides.length;
      if (!failedSlidesRef.current.has(candidate)) return candidate;
    }
    return from;
  }, []);

  const prepareSlide = useCallback((index: number) => {
    if (index === currentIndexRef.current) return null;

    const existing = preparedRef.current;
    if (existing?.index === index) return existing;

    const nextPrepared = {
      index,
      requestId: ++requestIdRef.current,
      ready: loadedSlidesRef.current.has(index),
    };
    preparedRef.current = nextPrepared;
    setPrepared(nextPrepared);
    return nextPrepared;
  }, []);

  const promotePreparedSlide = useCallback(
    (index: number, requestId: number) => {
      const activeRequest = preparedRef.current;
      if (
        transitioningRef.current ||
        !activeRequest ||
        activeRequest.index !== index ||
        activeRequest.requestId !== requestId ||
        !activeRequest.ready
      ) {
        return;
      }

      transitioningRef.current = true;
      setTransitioning(true);
      clearTransitionTimer();
      transitionTimerRef.current = window.setTimeout(
        () => {
          currentIndexRef.current = index;
          preparedRef.current = null;
          pendingTargetRef.current = null;
          transitioningRef.current = false;
          setCurrentIndex(index);
          setPrepared(null);
          setTransitioning(false);
          setTimerEpoch((value) => value + 1);
          transitionTimerRef.current = null;
        },
        reducedMotion ? REDUCED_CROSSFADE_MS : CROSSFADE_DURATION_MS,
      );
    },
    [clearTransitionTimer, reducedMotion],
  );

  const requestSlide = useCallback(
    (index: number) => {
      if (transitioningRef.current) {
        clearTransitionTimer();
        transitioningRef.current = false;
        setTransitioning(false);
      }

      if (index === currentIndexRef.current) {
        pendingTargetRef.current = null;
        preparedRef.current = null;
        setPrepared(null);
        setTimerEpoch((value) => value + 1);
        return;
      }

      pendingTargetRef.current = index;
      const target = prepareSlide(index);
      if (target?.ready) {
        promotePreparedSlide(target.index, target.requestId);
      }
      setTimerEpoch((value) => value + 1);
    },
    [clearTransitionTimer, prepareSlide, promotePreparedSlide],
  );

  const move = useCallback(
    (direction: 1 | -1) => {
      const requestedIndex =
        pendingTargetRef.current ??
        preparedRef.current?.index ??
        currentIndexRef.current;
      requestSlide(findNextAvailable(requestedIndex, direction));
    },
    [findNextAvailable, requestSlide],
  );

  const handlePreparedLoad = useCallback(
    (index: number, requestId: number) => {
      loadedSlidesRef.current.add(index);
      const activeRequest = preparedRef.current;
      if (
        !activeRequest ||
        activeRequest.index !== index ||
        activeRequest.requestId !== requestId
      ) {
        return;
      }

      const readyRequest = { ...activeRequest, ready: true };
      preparedRef.current = readyRequest;
      setPrepared(readyRequest);

      if (pendingTargetRef.current === index) {
        promotePreparedSlide(index, requestId);
      }
    },
    [promotePreparedSlide],
  );

  const handlePreparedError = useCallback(
    (index: number, requestId: number) => {
      const activeRequest = preparedRef.current;
      if (
        !activeRequest ||
        activeRequest.index !== index ||
        activeRequest.requestId !== requestId
      ) {
        return;
      }

      failedSlidesRef.current.add(index);
      pendingTargetRef.current = null;
      preparedRef.current = null;
      setPrepared(null);
      setTimerEpoch((value) => value + 1);
    },
    [],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReducedMotion(motionQuery.matches);
    const onNavigationActivity = (event: Event) => {
      setNavigationActive(
        (event as CustomEvent<{ active: boolean }>).detail.active,
      );
    };
    const onVisibilityChange = () => {
      setDocumentVisible(document.visibilityState === "visible");
    };

    onMotionChange();
    onVisibilityChange();
    motionQuery.addEventListener("change", onMotionChange);
    window.addEventListener(
      NAVIGATION_ACTIVITY_EVENT,
      onNavigationActivity,
    );
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener(
        NAVIGATION_ACTIVITY_EVENT,
        onNavigationActivity,
      );
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (
      !firstSlideStable ||
      transitioning ||
      preparedRef.current ||
      failedSlidesRef.current.size >= heroSlides.length - 1
    ) {
      return;
    }

    prepareSlide(findNextAvailable(currentIndex, 1));
  }, [
    currentIndex,
    findNextAvailable,
    firstSlideStable,
    prepareSlide,
    transitioning,
  ]);

  const autoplayBlocked =
    paused ||
    controlsActive ||
    navigationActive ||
    !documentVisible ||
    reducedMotion ||
    !firstSlideStable ||
    transitioning;

  useEffect(() => {
    if (autoplayBlocked) return;

    const timer = window.setTimeout(() => {
      const target = findNextAvailable(currentIndexRef.current, 1);
      requestSlide(target);
    }, VISIBLE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [
    autoplayBlocked,
    currentIndex,
    findNextAvailable,
    requestSlide,
    timerEpoch,
  ]);

  useEffect(() => {
    return () => clearTransitionTimer();
  }, [clearTransitionTimer]);

  const currentLayer = (
    <div
      key={`hero-slide-${currentIndex}`}
      style={
        {
          "--hero-image-y": heroSlides[currentIndex].desktopY,
        } as CSSProperties
      }
      className={`${styles.slide} ${
        transitioning ? styles.currentLeaving : styles.current
      }`}
    >
      <div className={styles.backdrop} aria-hidden="true">
        <Image
          src={heroSlides[currentIndex].src}
          alt=""
          fill
          quality={92}
          sizes="100vw"
          className={styles.backdropImage}
        />
        <div className={styles.backdropShade} />
      </div>
      <Image
        src={heroSlides[currentIndex].src}
        alt={heroSlides[currentIndex].alt}
        width={1920}
        height={1080}
        quality={92}
        preload={currentIndex === 0}
        fetchPriority={currentIndex === 0 ? "high" : "auto"}
        sizes="100vw"
        onLoad={() => {
          loadedSlidesRef.current.add(currentIndex);
          if (currentIndex === 0) setFirstSlideStable(true);
        }}
        className={styles.foregroundImage}
      />
    </div>
  );

  const preparedLayer = prepared ? (
    <div
      key={`hero-slide-${prepared.index}`}
      aria-hidden="true"
      style={
        {
          "--hero-image-y": heroSlides[prepared.index].desktopY,
        } as CSSProperties
      }
      className={`${styles.slide} ${
        transitioning ? styles.incomingVisible : styles.incoming
      }`}
    >
      <div className={styles.backdrop}>
        <Image
          src={heroSlides[prepared.index].src}
          alt=""
          fill
          quality={92}
          loading="eager"
          fetchPriority="low"
          sizes="100vw"
          className={styles.backdropImage}
        />
        <div className={styles.backdropShade} />
      </div>
      <Image
        src={heroSlides[prepared.index].src}
        alt=""
        width={1920}
        height={1080}
        quality={92}
        loading="eager"
        fetchPriority="low"
        sizes="100vw"
        onLoad={() =>
          handlePreparedLoad(prepared.index, prepared.requestId)
        }
        onError={() =>
          handlePreparedError(prepared.index, prepared.requestId)
        }
        className={styles.foregroundImage}
      />
    </div>
  ) : null;

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured Jetour promotions"
    >
      <div className={styles.stage}>
        {[currentLayer, preparedLayer]}
        <div className={styles.topShade} aria-hidden="true" />
      </div>

      <button
        type="button"
        className={`${styles.edgeButton} ${styles.previousButton}`}
        onClick={() => move(-1)}
        onPointerEnter={() => setControlsActive(true)}
        onPointerLeave={() => setControlsActive(false)}
        onFocusCapture={() => setControlsActive(true)}
        onBlurCapture={() => setControlsActive(false)}
        aria-label="Previous hero image"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={25} />
      </button>

      <button
        type="button"
        className={`${styles.edgeButton} ${styles.nextButton}`}
        onClick={() => move(1)}
        onPointerEnter={() => setControlsActive(true)}
        onPointerLeave={() => setControlsActive(false)}
        onFocusCapture={() => setControlsActive(true)}
        onBlurCapture={() => setControlsActive(false)}
        aria-label="Next hero image"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={25} />
      </button>

      <button
        type="button"
        className={styles.pauseButton}
        onClick={() => {
          setPaused((value) => !value);
          setTimerEpoch((value) => value + 1);
        }}
        onPointerEnter={() => setControlsActive(true)}
        onPointerLeave={() => setControlsActive(false)}
        onFocusCapture={() => setControlsActive(true)}
        onBlurCapture={() => setControlsActive(false)}
        aria-label={paused ? "Play hero carousel" : "Pause hero carousel"}
      >
        <HugeiconsIcon icon={paused ? PlayIcon : PauseIcon} size={18} />
      </button>
    </div>
  );
}
