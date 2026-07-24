"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { JetourButton } from "@/components/ui/jetour-button";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";
import type { HomeModel } from "./home-types";
import styles from "./model-range-showcase.module.css";

type IncomingModel = {
  index: number;
  requestId: number;
};

type GsapApi = typeof import("gsap").gsap;
type GsapTimeline = ReturnType<GsapApi["timeline"]>;
type HandoffState = "ready" | "aligning" | "showcase" | "released";

function ShowcaseModelLayer({
  model,
  priority = false,
  layerRef,
  incoming = false,
  onLoad,
  onError,
}: {
  model: HomeModel & { index: number; total: number };
  priority?: boolean;
  layerRef: RefObject<HTMLDivElement | null>;
  incoming?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}) {
  const imageStyle = {
    "--showcase-stage-scale": model.visuals.stageScale,
    "--showcase-stage-x": model.visuals.stageX,
    "--showcase-stage-y": model.visuals.stageY,
    "--showcase-stage-max-width": model.visuals.stageMaxWidth,
    "--showcase-object-position": model.visuals.stageObjectPosition,
    "--showcase-word-x": model.visuals.wordmarkX,
    "--showcase-word-y": model.visuals.wordmarkY,
    "--showcase-word-scale": model.visuals.wordmarkScale,
    "--showcase-word-tracking": model.visuals.wordmarkTracking,
  } as CSSProperties;

  return (
    <article
      ref={layerRef}
      className={`${styles.modelLayer} ${incoming ? styles.incomingLayer : ""}`}
      style={imageStyle}
      aria-hidden={incoming || undefined}
    >
      <div
        data-showcase-word
        className={styles.backgroundWord}
        aria-hidden="true"
      >
        {model.name}
      </div>

      <div data-showcase-copy className={styles.modelInformation}>
        <div className={styles.editorialMarker}>
          <span>{String(model.index + 1).padStart(2, "0")} / {String(model.total).padStart(2, "0")}</span>
          <span className={styles.accentRule} aria-hidden="true" />
          <span>Explore the range</span>
        </div>
        <h2 className={styles.modelTitle}>{model.name}</h2>
        {model.category ? <p className={styles.category}>{model.category}</p> : null}
        <p className={styles.tagline}>{model.tagline}</p>
        <div className={styles.actions}>
          <JetourButton href={`/models/${model.slug}`} className={styles.primaryAction}>
            Explore Model
          </JetourButton>
          <JetourButton
            href={`/book-test-drive?model=${model.slug}`}
            variant="secondary"
            className={styles.secondaryAction}
          >
            Book a Test Drive
          </JetourButton>
        </div>
      </div>

      <div data-showcase-vehicle className={styles.vehicleStage}>
        <div className={styles.floorShadow} aria-hidden="true" />
        {model.mediaMode === "studio" ? (
          <div className={styles.studioImageFrame}>
            <Image
              src={model.image}
              alt={incoming ? "" : model.imageAlt}
              fill
              priority={priority}
              loading={priority ? undefined : "eager"}
              sizes="(max-width: 1024px) 100vw, 66vw"
              className={styles.studioImage}
              style={{ objectPosition: model.visuals.stageObjectPosition }}
              onLoad={onLoad}
              onError={onError}
            />
          </div>
        ) : (
          <Image
            src={model.image}
            alt={incoming ? "" : model.imageAlt}
            fill
            priority={priority}
            loading={priority ? undefined : "eager"}
            sizes="(max-width: 1024px) 100vw, 66vw"
            className={styles.vehicleImage}
            onLoad={onLoad}
            onError={onError}
          />
        )}
      </div>

      <div data-showcase-copy className={styles.specificationPanel}>
        {model.specifications.length ? (
          <dl className={styles.specificationList}>
            {model.specifications.slice(0, 3).map((specification) => (
              <div key={specification.label} className={styles.specification}>
                <dt>{specification.label}</dt>
                <dd>
                  {specification.value}
                  {specification.unit ? ` ${specification.unit}` : ""}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className={styles.pendingSpecifications}>
            Kuwait specifications will be added when confirmed.
          </p>
        )}
      </div>
    </article>
  );
}

export function ModelRangeShowcase({ models }: { models: HomeModel[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [incoming, setIncoming] = useState<IncomingModel | null>(null);
  const [announcement, setAnnouncement] = useState(models[0]?.name ?? "");
  const [reducedMotion, setReducedMotion] = useState(false);

  const shellRef = useRef<HTMLElement>(null);
  const currentLayerRef = useRef<HTMLDivElement>(null);
  const incomingLayerRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const selectorButtonsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const currentIndexRef = useRef(0);
  const incomingRef = useRef<IncomingModel | null>(null);
  const latestTargetRef = useRef(0);
  const requestIdRef = useRef(0);
  const timelineRef = useRef<GsapTimeline | null>(null);
  const gsapRef = useRef<GsapApi | null>(null);
  const reducedMotionRef = useRef(false);

  const resetLayer = useCallback((layer: HTMLDivElement | null) => {
    const gsap = gsapRef.current;
    if (!gsap || !layer) return;
    gsap.set(layer, { clearProps: "opacity,visibility" });
    gsap.set(
      layer.querySelectorAll(
        "[data-showcase-vehicle],[data-showcase-copy],[data-showcase-word]",
      ),
      { clearProps: "all" },
    );
  }, []);

  const finishImmediately = useCallback(
    (targetIndex: number) => {
      currentIndexRef.current = targetIndex;
      latestTargetRef.current = targetIndex;
      incomingRef.current = null;
      setCurrentIndex(targetIndex);
      setIncoming(null);
      setAnnouncement(models[targetIndex].name);
    },
    [models],
  );

  const animateToIncoming = useCallback(
    (target: IncomingModel) => {
      if (
        target.requestId !== requestIdRef.current ||
        latestTargetRef.current !== target.index
      ) {
        return;
      }

      const gsap = gsapRef.current;
      const outgoingLayer = currentLayerRef.current;
      const incomingLayer = incomingLayerRef.current;
      if (!gsap || !outgoingLayer || !incomingLayer) {
        finishImmediately(target.index);
        return;
      }

      timelineRef.current?.kill();
      resetLayer(outgoingLayer);
      resetLayer(incomingLayer);

      const direction = target.index > currentIndexRef.current ? 1 : -1;
      const outgoingVehicle = outgoingLayer.querySelector(
        "[data-showcase-vehicle]",
      );
      const incomingVehicle = incomingLayer.querySelector(
        "[data-showcase-vehicle]",
      );
      const outgoingCopy = outgoingLayer.querySelectorAll(
        "[data-showcase-copy]",
      );
      const incomingCopy = incomingLayer.querySelectorAll(
        "[data-showcase-copy]",
      );
      const outgoingWord = outgoingLayer.querySelector(
        "[data-showcase-word]",
      );
      const incomingWord = incomingLayer.querySelector(
        "[data-showcase-word]",
      );

      const timeline = gsap.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          if (
            target.requestId !== requestIdRef.current ||
            latestTargetRef.current !== target.index
          ) {
            return;
          }

          resetLayer(incomingLayer);
          currentIndexRef.current = target.index;
          incomingRef.current = null;
          setCurrentIndex(target.index);
          setIncoming(null);
          setAnnouncement(models[target.index].name);
          timelineRef.current = null;
        },
      });
      timelineRef.current = timeline;

      if (reducedMotionRef.current) {
        timeline
          .set(incomingLayer, { autoAlpha: 0 })
          .to(outgoingLayer, { autoAlpha: 0, duration: 0.12 })
          .to(incomingLayer, { autoAlpha: 1, duration: 0.18 }, 0.05);
        return;
      }

      timeline
        .set(incomingLayer, { autoAlpha: 1 })
        .set(incomingVehicle, {
          xPercent: direction * 24,
          autoAlpha: 0,
          scale: 0.97,
        })
        .set(incomingCopy, { x: direction * 24, autoAlpha: 0 })
        .set(incomingWord, { autoAlpha: 0 })
        .to(
          outgoingVehicle,
          {
            xPercent: direction * -22,
            autoAlpha: 0,
            scale: 0.97,
            duration: 0.52,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          outgoingCopy,
          {
            x: direction * -22,
            autoAlpha: 0,
            duration: 0.34,
            ease: "power2.in",
          },
          0,
        )
        .to(outgoingWord, { autoAlpha: 0, duration: 0.3 }, 0)
        .to(
          incomingVehicle,
          {
            xPercent: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.72,
            ease: "power3.inOut",
          },
          0.12,
        )
        .to(
          incomingCopy,
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.22,
        )
        .to(incomingWord, { autoAlpha: 1, duration: 0.56 }, 0.18);
    },
    [finishImmediately, models, resetLayer],
  );

  const selectModel = useCallback(
    (targetIndex: number) => {
      if (targetIndex < 0 || targetIndex >= models.length) return;

      latestTargetRef.current = targetIndex;
      const requestId = ++requestIdRef.current;
      timelineRef.current?.kill();
      timelineRef.current = null;
      resetLayer(currentLayerRef.current);
      if (incomingLayerRef.current) {
        const gsap = gsapRef.current;
        if (gsap) gsap.set(incomingLayerRef.current, { autoAlpha: 0 });
      }

      if (targetIndex === currentIndexRef.current) {
        incomingRef.current = null;
        setIncoming(null);
        return;
      }

      const nextIncoming = { index: targetIndex, requestId };
      incomingRef.current = nextIncoming;
      setIncoming(nextIncoming);
    },
    [models.length, resetLayer],
  );

  const move = (step: 1 | -1) => {
    const baseIndex =
      incomingRef.current?.index ?? latestTargetRef.current ?? currentIndexRef.current;
    selectModel((baseIndex + step + models.length) % models.length);
  };

  const handleSelectorKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    itemIndex: number,
  ) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (itemIndex + step + models.length) % models.length;
    selectorButtonsRef.current[nextIndex]?.focus();
    selectModel(nextIndex);
  };

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    incomingRef.current = incoming;
  }, [incoming]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = motionQuery.matches;
      setReducedMotion(motionQuery.matches);
    };
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () =>
      motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    let active = true;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollToPlugin")]).then(
      ([gsapModule, scrollToModule]) => {
        if (!active || !shellRef.current) return;

        const gsap = gsapModule.gsap;
        gsap.registerPlugin(scrollToModule.ScrollToPlugin);
        gsapRef.current = gsap;

        let state: HandoffState =
          window.scrollY <= 24 ? "ready" : "released";
        let navigationOpen = false;
        let intentTotal = 0;
        let intentTimer: number | null = null;
        let alignmentTween: ReturnType<typeof gsap.to> | null = null;

        const supportsHandoff = () =>
          window.innerWidth > 1024 &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const clearIntent = () => {
          intentTotal = 0;
          if (intentTimer !== null) {
            window.clearTimeout(intentTimer);
            intentTimer = null;
          }
        };

        const settleAfterInterruption = () => {
          const showcaseTop = shellRef.current?.offsetTop ?? 0;
          state =
            Math.abs(window.scrollY - showcaseTop) <= 2
              ? "showcase"
              : window.scrollY <= showcaseTop * 0.35
                ? "ready"
                : "released";
        };

        const stopAlignment = () => {
          if (!alignmentTween) return;
          alignmentTween.kill();
          alignmentTween = null;
          settleAfterInterruption();
        };

        const alignToShowcase = () => {
          const showcase = shellRef.current;
          if (!showcase || state !== "ready") return;

          state = "aligning";
          clearIntent();
          alignmentTween = gsap.to(window, {
            scrollTo: {
              y: showcase.offsetTop,
              offsetY: 0,
              autoKill: false,
            },
            duration: 0.7,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              alignmentTween = null;
              state = "showcase";
            },
            onInterrupt: () => {
              alignmentTween = null;
              settleAfterInterruption();
            },
          });
        };

        const onWheel = (event: WheelEvent) => {
          if (
            event.ctrlKey ||
            navigationOpen ||
            !supportsHandoff() ||
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

          const showcaseTop = shellRef.current?.offsetTop ?? 0;
          if (
            window.scrollY > showcaseTop * 0.35 ||
            event.deltaY <= 0 ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ) {
            clearIntent();
            return;
          }

          event.preventDefault();
          intentTotal += event.deltaY;
          if (intentTimer !== null) window.clearTimeout(intentTimer);
          intentTimer = window.setTimeout(clearIntent, 140);

          if (intentTotal >= 18) alignToShowcase();
        };

        const onScroll = () => {
          if (state === "aligning" || !shellRef.current) return;
          const showcaseTop = shellRef.current.offsetTop;
          if (window.scrollY <= showcaseTop * 0.35) {
            state = "ready";
          } else if (
            state === "ready" &&
            window.scrollY > showcaseTop * 0.45
          ) {
            state = "released";
          }
        };

        const onNavigationActivity = (event: Event) => {
          navigationOpen = (event as CustomEvent<{ active: boolean }>).detail
            .active;
          if (navigationOpen) {
            clearIntent();
            stopAlignment();
          }
        };

        const onResize = () => {
          clearIntent();
          if (!supportsHandoff()) stopAlignment();
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener(
          NAVIGATION_ACTIVITY_EVENT,
          onNavigationActivity,
        );

        cleanup = () => {
          clearIntent();
          alignmentTween?.kill();
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          window.removeEventListener(
            NAVIGATION_ACTIVITY_EVENT,
            onNavigationActivity,
          );
        };
      },
    );

    return () => {
      active = false;
      timelineRef.current?.kill();
      cleanup();
      gsapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const activeButton = selectorButtonsRef.current[currentIndex];
    const selector = selectorRef.current;
    if (!activeButton || !selector) return;
    selector.scrollTo({
      left:
        activeButton.offsetLeft -
        (selector.clientWidth - activeButton.offsetWidth) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [currentIndex, reducedMotion]);

  const indexedModels = models.map((model, index) => ({
    ...model,
    index,
    total: models.length,
  }));
  const indexedCurrentModel = indexedModels[currentIndex];
  const indexedIncomingModel = incoming ? indexedModels[incoming.index] : null;

  return (
    <section
      ref={shellRef}
      id="models"
      data-header-theme="light"
      className={styles.showcaseShell}
      aria-label="Explore Jetour models"
    >
      <div className={styles.showcaseStage}>
        <div className={styles.showroomLight} aria-hidden="true" />
        <div className={styles.floor} aria-hidden="true" />

        <ShowcaseModelLayer
          key={indexedCurrentModel.slug}
          model={indexedCurrentModel}
          priority={currentIndex === 0}
          layerRef={currentLayerRef}
        />
        {indexedIncomingModel && incoming ? (
          <ShowcaseModelLayer
            key={indexedIncomingModel.slug}
            model={indexedIncomingModel}
            incoming
            layerRef={incomingLayerRef}
            onLoad={() => animateToIncoming(incoming)}
            onError={() => {
              if (incoming.requestId !== requestIdRef.current) return;
              latestTargetRef.current = currentIndexRef.current;
              incomingRef.current = null;
              setIncoming(null);
            }}
          />
        ) : null}

        <div className={styles.selectorDock}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => move(-1)}
            aria-label="Previous model"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
          </button>

          <div
            ref={selectorRef}
            role="tablist"
            aria-label="Jetour model selector"
            className={styles.selectorList}
          >
            {models.map((model, itemIndex) => (
              <button
                key={model.slug}
                ref={(element) => {
                  selectorButtonsRef.current[itemIndex] = element;
                }}
                type="button"
                role="tab"
                aria-selected={itemIndex === currentIndex}
                aria-current={itemIndex === currentIndex ? "true" : undefined}
                className={styles.selectorItem}
                onClick={() => selectModel(itemIndex)}
                onKeyDown={(event) =>
                  handleSelectorKeyDown(event, itemIndex)
                }
                style={
                  {
                    "--showcase-selector-scale": model.visuals.selectorScale,
                    "--showcase-selector-x": model.visuals.selectorX,
                    "--showcase-selector-y": model.visuals.selectorY,
                  } as CSSProperties
                }
              >
                <span className={styles.thumbnail}>
                  {model.mediaMode === "studio" ? (
                    <span className={styles.studioThumbnailLabel} aria-hidden="true">
                      X70+
                    </span>
                  ) : (
                    <Image
                      src={model.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 112px, 145px"
                      className={styles.thumbnailImage}
                    />
                  )}
                </span>
                <span>{model.name}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => move(1)}
            aria-label="Next model"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={20} />
          </button>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement} selected
        </p>
      </div>
    </section>
  );
}
