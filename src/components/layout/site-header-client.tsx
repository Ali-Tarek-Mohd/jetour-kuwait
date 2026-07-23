"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { headerNavigationItems, moreNavigationItems } from "@/data/navigation";
import { announceNavigationActivity } from "@/lib/navigation-events";
import { HeaderAnchorLink } from "./header-anchor-link";
import { MobileNavigation } from "./mobile-navigation";
import { useHeaderTheme } from "./use-header-theme";

export type HeaderModel = {
  name: string;
  slug: string;
  category?: string;
  image?: string;
  imageAlt: string;
  mediaMode: "transparent" | "studio";
  imageScale?: number;
  imagePosition?: string;
  previewFit?: {
    scale: number;
    x: number;
    y: number;
    origin: string;
    objectPosition?: string;
    studio?: boolean;
  };
};

type OpenMenu = "models" | "more" | null;
type PreviewPhase = "idle" | "loading" | "outgoing" | "incoming" | "settled";

export function SiteHeaderClient({ models }: { models: HeaderModel[] }) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const sectionTheme = useHeaderTheme();
  const menuLocked = openMenu !== null || mobileNavigationOpen;
  const effectiveTheme = menuLocked ? "dark" : sectionTheme;
  const rootRef = useRef<HTMLElement>(null);
  const modelsRegionRef = useRef<HTMLDivElement>(null);
  const moreRegionRef = useRef<HTMLDivElement>(null);
  const modelsTriggerRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const suppressFocusOpen = useRef(false);
  const pointerRegion = useRef<Exclude<OpenMenu, null> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  };

  const openWithDelay = (menu: Exclude<OpenMenu, null>) => {
    clearTimers();
    openTimer.current = setTimeout(() => {
      setOpenMenu(menu);
    }, 110);
  };

  const enterDisclosure = (menu: Exclude<OpenMenu, null>) => {
    pointerRegion.current = menu;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const closeWithDelay = (
    menu: Exclude<OpenMenu, null>,
    region: HTMLDivElement | null,
    relatedTarget: EventTarget | null,
  ) => {
    if (relatedTarget instanceof Node && region?.contains(relatedTarget)) return;
    if (region?.contains(document.activeElement)) return;
    pointerRegion.current = null;
    queueMicrotask(() => {
      if (pointerRegion.current === menu || region?.contains(document.activeElement)) return;
      clearTimers();
      closeTimer.current = setTimeout(() => {
        const panel = document.getElementById(
          menu === "models" ? "models-mega-menu" : "more-navigation-menu",
        );
        if (region?.matches(":hover") || panel?.matches(":hover")) {
          pointerRegion.current = menu;
          closeTimer.current = null;
          return;
        }
        setOpenMenu((current) => current === menu ? null : current);
        closeTimer.current = null;
      }, 380);
    });
  };

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (
        rootRef.current &&
        !rootRef.current.contains(target) &&
        !target?.closest("[data-header-disclosure]")
      ) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !openMenu) return;
      const trigger = openMenu === "models" ? modelsTriggerRef.current : moreTriggerRef.current;
      suppressFocusOpen.current = true;
      setOpenMenu(null);
      trigger?.focus();
      requestAnimationFrame(() => {
        suppressFocusOpen.current = false;
      });
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimers();
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  useEffect(() => {
    announceNavigationActivity(openMenu !== null);
    return () => announceNavigationActivity(false);
  }, [openMenu]);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget as Element | null;
    if (
      !event.currentTarget.contains(next) &&
      !next?.closest("[data-header-disclosure]")
    ) setOpenMenu(null);
  };

  return (
    <header
      ref={rootRef}
      onBlur={handleBlur}
      data-header-theme={effectiveTheme}
      data-menu-open={menuLocked}
      className={`site-header fixed inset-x-0 top-0 z-[var(--layer-header)] border-b backdrop-blur-[10px] transition-[background-color,border-color,box-shadow] duration-[220ms] ${
        menuLocked
          ? "border-white/13 bg-[#07090b] shadow-none"
          : effectiveTheme === "light"
            ? "border-black/12 bg-white/[.88] shadow-[0_5px_18px_rgba(0,0,0,.055)]"
            : "border-white/13 bg-[rgba(7,9,11,.28)] shadow-none"
      }`}
    >
      {openMenu ? (
        <div
          aria-hidden="true"
          className="fixed inset-x-0 top-[92px] bottom-0 z-[var(--layer-scrim)] hidden bg-black/55 motion-safe:animate-[header-scrim-in_.2s_ease-out] xl:block"
          onPointerDown={() => setOpenMenu(null)}
        />
      ) : null}
      <div className="mx-auto grid h-[70px] w-full max-w-[1520px] grid-cols-[1fr_auto] items-center px-5 sm:px-8 xl:h-[92px] xl:grid-cols-[340px_1fr_370px] xl:px-12">
        <Link href="/" aria-label="Jetour Kuwait homepage" className="relative block h-[38px] w-[220px] sm:h-[42px] sm:w-[244px] xl:h-[54px] xl:w-[312px]">
          <Image
            src="/images/brand/jetour-budastoor-header.png"
            alt="Jetour and Budastoor Motors"
            fill
            loading="eager"
            sizes="(max-width: 1279px) 244px, 312px"
            className={`object-contain object-left transition-opacity duration-[220ms] ${
              effectiveTheme === "dark" ? "opacity-100" : "opacity-0"
            }`}
          />
          <Image
            src="/images/brand/jetour-budastoor-header-dark.png"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 1279px) 244px, 312px"
            className={`object-contain object-left transition-opacity duration-[220ms] ${
              effectiveTheme === "light" ? "opacity-100" : "opacity-0"
            }`}
          />
        </Link>

        <nav aria-label="Primary navigation" className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-12 xl:flex 2xl:gap-14">
          <div
            ref={modelsRegionRef}
            className="flex h-full items-center"
            onPointerEnter={() => {
              enterDisclosure("models");
              openWithDelay("models");
            }}
            onPointerLeave={(event) => closeWithDelay("models", modelsRegionRef.current, event.relatedTarget)}
          >
            <button
              ref={modelsTriggerRef}
              type="button"
              aria-expanded={openMenu === "models"}
              aria-controls="models-mega-menu"
              onClick={() => {
                setOpenMenu((current) => current === "models" ? null : "models");
              }}
              onFocus={() => {
                if (!suppressFocusOpen.current) {
                  setOpenMenu("models");
                }
              }}
              className="site-nav-item"
              data-open={openMenu === "models"}
            >
              Models
            </button>
            {openMenu === "models" && (
              <ModelsMegaMenu
                models={models}
                onClose={() => setOpenMenu(null)}
                onPointerEnter={() => enterDisclosure("models")}
                onPointerLeave={(relatedTarget) => closeWithDelay("models", modelsRegionRef.current, relatedTarget)}
              />
            )}
          </div>

          {headerNavigationItems.map((item) => (
            <HeaderAnchorLink
              key={item.label}
              href={item.href}
              className="site-nav-item"
              onNavigate={() => setOpenMenu(null)}
            >
              {item.label}
            </HeaderAnchorLink>
          ))}

          <div
            ref={moreRegionRef}
            className="flex h-full items-center"
            onPointerEnter={() => {
              enterDisclosure("more");
              openWithDelay("more");
            }}
            onPointerLeave={(event) => closeWithDelay("more", moreRegionRef.current, event.relatedTarget)}
          >
            <button
              ref={moreTriggerRef}
              type="button"
              aria-expanded={openMenu === "more"}
              aria-controls="more-navigation-menu"
              onClick={() => setOpenMenu((current) => current === "more" ? null : "more")}
              onFocus={() => setOpenMenu("more")}
              className="site-nav-item"
              data-open={openMenu === "more"}
            >
              More
            </button>
            {openMenu === "more" && (
              <MoreMenu
                onClose={() => setOpenMenu(null)}
                onPointerEnter={() => enterDisclosure("more")}
                onPointerLeave={(relatedTarget) => closeWithDelay("more", moreRegionRef.current, relatedTarget)}
              />
            )}
          </div>
        </nav>

        <div className="hidden items-center justify-end gap-5 xl:col-start-3 xl:flex">
          <div role="group" aria-label="Language selection" className="header-language-control">
            <button type="button" aria-pressed="true" aria-label="English selected" className="header-language-option" data-active="true">
              <span aria-hidden="true" className="header-language-dot" />
              EN
            </button>
            <button type="button" aria-pressed="false" lang="ar" aria-label="Switch to Arabic" className="header-language-option">
              العربية
            </button>
          </div>
          <Link href="/book-test-drive" className="header-booking-cta">
            Book a Test Drive
            <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" />
          </Link>
        </div>

        <MobileNavigation
          models={models}
          headerTheme={effectiveTheme}
          onOpenChange={setMobileNavigationOpen}
        />
      </div>
    </header>
  );
}

function ModelsMegaMenu({
  models,
  onClose,
  onPointerEnter,
  onPointerLeave,
}: {
  models: HeaderModel[];
  onClose: () => void;
  onPointerEnter: () => void;
  onPointerLeave: (relatedTarget: EventTarget | null) => void;
}) {
  const initialModel = models.find((model) => model.slug === "t2") ?? models[0];
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [displayedModel, setDisplayedModel] = useState(initialModel);
  const [settledSlug, setSettledSlug] = useState(initialModel.slug);
  const [incomingModel, setIncomingModel] = useState<HeaderModel | null>(null);
  const [phase, setPhase] = useState<PreviewPhase>("idle");
  const intentTimer = useRef<number | null>(null);
  const transitionTimer = useRef<number | null>(null);
  const pendingSlug = useRef<string | null>(null);
  const requestGeneration = useRef(0);
  const loadedSlugs = useRef(new Set([initialModel.slug]));

  const clearPreviewTimers = () => {
    if (intentTimer.current) window.clearTimeout(intentTimer.current);
    if (transitionTimer.current) window.clearTimeout(transitionTimer.current);
    intentTimer.current = null;
    transitionTimer.current = null;
    pendingSlug.current = null;
  };

  const beginTransition = (model: HeaderModel, generation: number) => {
    if (generation !== requestGeneration.current || model.slug === displayedModel.slug) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIncomingModel(model);
    setPhase("outgoing");
    transitionTimer.current = window.setTimeout(() => {
      if (generation !== requestGeneration.current) return;
      setDisplayedModel(model);
      setIncomingModel(null);
      setPhase("incoming");
      transitionTimer.current = window.setTimeout(() => {
        if (generation !== requestGeneration.current) return;
        setSettledSlug(model.slug);
        setPhase("settled");
        transitionTimer.current = null;
      }, reduceMotion ? 0 : 210);
    }, reduceMotion ? 0 : 110);
  };

  const commitPreview = (model: HeaderModel) => {
    clearPreviewTimers();
    if (model.slug === displayedModel.slug && phase !== "outgoing") return;
    const generation = ++requestGeneration.current;
    setIncomingModel(model);
    if (loadedSlugs.current.has(model.slug)) {
      beginTransition(model, generation);
    } else {
      setPhase("loading");
    }
  };

  const schedulePreview = (model: HeaderModel, delay: number) => {
    if (model.slug === displayedModel.slug || model.slug === incomingModel?.slug) return;
    if (intentTimer.current) window.clearTimeout(intentTimer.current);
    pendingSlug.current = model.slug;
    intentTimer.current = window.setTimeout(() => {
      if (pendingSlug.current !== model.slug) return;
      pendingSlug.current = null;
      commitPreview(model);
    }, delay);
  };

  const handleIncomingLoad = (model: HeaderModel) => {
    loadedSlugs.current.add(model.slug);
    if (model.slug !== incomingModel?.slug) return;
    beginTransition(model, requestGeneration.current);
  };

  useEffect(() => () => {
    requestGeneration.current += 1;
    clearPreviewTimers();
  }, []);

  return createPortal(
    <>
      <div
        aria-hidden="true"
        data-header-disclosure="models"
        className="fixed top-[68px] left-1/2 z-[var(--layer-header-bridge)] h-6 w-[min(1080px,calc(100vw-64px))] -translate-x-1/2"
        onPointerEnter={onPointerEnter}
        onPointerLeave={(event) => onPointerLeave(event.relatedTarget)}
      />
      <div
        id="models-mega-menu"
        data-header-disclosure="models"
        className="fixed top-[92px] left-1/2 z-[var(--layer-header-menu)] w-[min(1080px,calc(100vw-64px))] -translate-x-1/2 border border-white/12 bg-[#090c0e] p-7 shadow-[0_28px_70px_rgba(0,0,0,.62)] motion-safe:animate-[header-menu-in_.2s_ease-out]"
        onPointerEnter={onPointerEnter}
        onPointerLeave={(event) => onPointerLeave(event.relatedTarget)}
      >
      <div className="grid grid-cols-[.94fr_1.06fr] gap-8">
        <div
          className="relative min-h-[350px] overflow-hidden border border-white/9 bg-[#07090a]"
          data-preview-phase={phase}
        >
          <HeaderVehiclePreview
            displayedModel={displayedModel}
            incomingModel={incomingModel}
            phase={phase}
            onIncomingLoad={handleIncomingLoad}
            onIncomingError={(model) => {
              if (model.slug !== incomingModel?.slug) return;
              requestGeneration.current += 1;
              setIncomingModel(null);
              setPhase("settled");
            }}
            onClose={onClose}
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-white/12 pb-4">
            <p className="text-[10px] tracking-[.18em] text-white/68 uppercase">Explore the range</p>
            <span className="text-[10px] text-white/58">{String(models.length).padStart(2, "0")} models</span>
          </div>
          <div className="grid flex-1 grid-cols-3 content-start gap-2 pt-4">
            {models.map((model, index) => (
              <Link
                key={model.slug}
                href={`/models/${model.slug}`}
                aria-current={model.slug === settledSlug ? "true" : undefined}
                onPointerEnter={() => {
                  setHoveredSlug(model.slug);
                  schedulePreview(model, 145);
                }}
                onPointerLeave={() => {
                  setHoveredSlug((current) => current === model.slug ? null : current);
                  if (pendingSlug.current === model.slug) {
                    if (intentTimer.current) window.clearTimeout(intentTimer.current);
                    intentTimer.current = null;
                    pendingSlug.current = null;
                  }
                }}
                onFocus={() => schedulePreview(model, 60)}
                onClick={onClose}
                className={`group relative flex min-h-[68px] items-center border border-transparent px-3 text-[13px] font-semibold tracking-[.035em] uppercase transition-[background-color,border-color,color] ${
                  model.slug === settledSlug
                    ? "border-[rgba(217,176,111,.2)] bg-[linear-gradient(90deg,rgba(147,91,38,.15),rgba(217,176,111,.045))] text-white before:absolute before:top-1/2 before:left-0 before:h-5 before:w-px before:-translate-y-1/2 before:bg-jetour-accent"
                    : model.slug === hoveredSlug
                      ? "border-[rgba(217,176,111,.14)] bg-[linear-gradient(90deg,rgba(174,102,39,.22),rgba(217,176,111,.07))] text-white"
                      : "text-white/82 hover:border-[rgba(217,176,111,.14)] hover:bg-[rgba(174,102,39,.14)] hover:text-white focus-visible:border-[rgba(217,176,111,.18)] focus-visible:bg-[rgba(174,102,39,.16)] focus-visible:text-white"
                }`}
              >
                <span className="mr-3 text-[9px] font-normal text-white/48">{String(index + 1).padStart(2, "0")}</span>
                {model.name}
              </Link>
            ))}
          </div>
          <Link href="/models" onClick={onClose} className="mt-4 inline-flex min-h-11 w-fit items-center gap-3 border-b border-white/25 text-[10px] font-semibold tracking-[.12em] uppercase transition-colors hover:border-jetour-accent hover:text-jetour-accent">
            View all models
            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
          </Link>
        </div>
      </div>
      </div>
    </>,
    document.body,
  );
}

function HeaderVehiclePreview({
  displayedModel,
  incomingModel,
  phase,
  onIncomingLoad,
  onIncomingError,
  onClose,
}: {
  displayedModel: HeaderModel;
  incomingModel: HeaderModel | null;
  phase: PreviewPhase;
  onIncomingLoad: (model: HeaderModel) => void;
  onIncomingError: (model: HeaderModel) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="jetour-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_52%_54%,rgba(204,208,210,.09),transparent_43%),radial-gradient(ellipse_at_50%_76%,rgba(217,176,111,.095),transparent_38%)]" />
      <div className="absolute top-[51%] right-[11%] left-[11%] h-[31%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(218,205,183,.13)_0%,rgba(217,176,111,.075)_34%,rgba(8,10,11,0)_72%)] blur-[16px]" />
      <div className="absolute top-[68%] right-[19%] left-[19%] h-[10%] rounded-[50%] bg-black/45 blur-xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,9,10,.12),transparent_45%,rgba(7,9,10,.58))]" />
      <HeaderPreviewImage
        key={`${displayedModel.slug}-${phase}`}
        model={displayedModel}
        className={phase === "outgoing" ? "header-preview-outgoing" : phase === "incoming" ? "header-preview-incoming" : "opacity-100"}
      />
      {incomingModel && (phase === "loading" || phase === "idle") ? (
        <HeaderPreviewImage
          key={`loader-${incomingModel.slug}`}
          model={incomingModel}
          className="pointer-events-none opacity-0"
          onLoad={() => onIncomingLoad(incomingModel)}
          onError={() => onIncomingError(incomingModel)}
        />
      ) : null}
      <div className={`absolute inset-x-5 bottom-5 z-10 ${phase === "outgoing" ? "header-preview-meta-outgoing" : phase === "incoming" ? "header-preview-meta-incoming" : ""}`}>
        <p className="text-[10px] tracking-[.17em] text-jetour-accent uppercase">
          {displayedModel.category ?? "Model range"}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <p className="text-3xl font-semibold tracking-[-.04em] text-white uppercase">
            {displayedModel.name}
          </p>
          <Link
            href={`/models/${displayedModel.slug}`}
            onClick={onClose}
            className="border-b border-white/45 pb-1 text-[10px] font-semibold tracking-[.12em] text-white uppercase transition-colors hover:border-jetour-accent hover:text-jetour-accent"
          >
            View model
          </Link>
        </div>
      </div>
    </>
  );
}

function HeaderPreviewImage({
  model,
  className,
  onLoad,
  onError,
}: {
  model: HeaderModel;
  className: string;
  onLoad?: () => void;
  onError?: () => void;
}) {
  if (!model.image) return null;
  const shared = `transition-opacity duration-200 ${className}`;
  const fit = model.previewFit ?? {
    scale: 1,
    x: 0,
    y: 0,
    origin: "50% 55%",
  };
  if (model.mediaMode === "studio" || fit.studio) {
    return (
      <div className={`absolute inset-0 overflow-hidden ${shared} [mask-image:linear-gradient(to_bottom,transparent,black_9%,black_78%,transparent_96%)]`}>
        <Image
          src={model.image}
          alt={model.imageAlt}
          fill
          sizes="480px"
          quality={88}
          className="object-cover"
          style={{
            objectPosition: fit.objectPosition ?? model.imagePosition ?? "center",
            transform: `translate3d(${fit.x}px,${fit.y}px,0) scale(${fit.scale})`,
            transformOrigin: fit.origin,
          }}
          onLoad={onLoad}
          onError={onError}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(7,9,10,.62)_100%),linear-gradient(to_bottom,rgba(7,9,10,.18),transparent_45%,rgba(7,9,10,.82))]" />
      </div>
    );
  }
  return (
    <div className={`absolute inset-0 ${shared}`}>
      <Image
        src={model.image}
        alt={model.imageAlt}
        fill
        sizes="480px"
        quality={88}
        className="object-contain p-2 drop-shadow-[0_20px_26px_rgba(0,0,0,.84)]"
        style={{
          transform: `translate3d(${fit.x}px,${fit.y}px,0) scale(${fit.scale})`,
          transformOrigin: fit.origin,
        }}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
}

function MoreMenu({
  onClose,
  onPointerEnter,
  onPointerLeave,
}: {
  onClose: () => void;
  onPointerEnter: () => void;
  onPointerLeave: (relatedTarget: EventTarget | null) => void;
}) {
  return createPortal(
    <>
      <div
        aria-hidden="true"
        data-header-disclosure="more"
        className="fixed top-[68px] left-1/2 z-[var(--layer-header-bridge)] h-6 w-[460px] -translate-x-1/2"
        onPointerEnter={onPointerEnter}
        onPointerLeave={(event) => onPointerLeave(event.relatedTarget)}
      />
      <div
        id="more-navigation-menu"
        data-header-disclosure="more"
        className="fixed top-[92px] left-1/2 z-[var(--layer-header-menu)] w-[460px] -translate-x-1/2 border border-white/12 bg-[#090c0e] p-5 shadow-[0_28px_70px_rgba(0,0,0,.62)] motion-safe:animate-[header-menu-in_.2s_ease-out]"
        onPointerEnter={onPointerEnter}
        onPointerLeave={(event) => onPointerLeave(event.relatedTarget)}
      >
      <p className="mb-4 text-[10px] tracking-[.18em] text-white/68 uppercase">More from Jetour Kuwait</p>
      <div className="grid grid-cols-2 gap-x-5">
        {moreNavigationItems.map((item) => item.disabled ? (
          <div key={item.label} aria-disabled="true" className="flex min-h-[64px] flex-col justify-center border-b border-white/12 text-white/64">
            <span className="text-xs font-semibold uppercase">{item.label}</span>
            <span className="mt-1 text-[9px] tracking-[.08em] text-jetour-accent uppercase">Coming soon</span>
          </div>
        ) : item.href.startsWith("/#") ? (
          <HeaderAnchorLink
            key={item.label}
            href={item.href as `/#${string}`}
            onNavigate={onClose}
            className="flex min-h-[64px] flex-col justify-center border-b border-white/12 text-white transition-colors hover:text-jetour-accent focus-visible:text-jetour-accent"
          >
            <span className="text-xs font-semibold uppercase">{item.label}</span>
            <span className="mt-1 text-[10px] text-white/68">{item.description}</span>
          </HeaderAnchorLink>
        ) : (
          <Link key={item.label} href={item.href} onClick={onClose} className="flex min-h-[64px] flex-col justify-center border-b border-white/12 text-white transition-colors hover:text-jetour-accent focus-visible:text-jetour-accent">
            <span className="text-xs font-semibold uppercase">{item.label}</span>
            <span className="mt-1 text-[10px] text-white/68">{item.description}</span>
          </Link>
        ))}
      </div>
      </div>
    </>,
    document.body,
  );
}
