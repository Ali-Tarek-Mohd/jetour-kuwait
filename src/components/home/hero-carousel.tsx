"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowLeft01Icon from "@hugeicons/core-free-icons/ArrowLeft01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { Container } from "@/components/ui/container";
import { JetourButton } from "@/components/ui/jetour-button";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";

const campaigns = [
  { model: "T2", kicker: "New", title: "Explore your world", copy: "Powerful capability, intelligent technology and an adventurous spirit.", image: "/images/vehicles/t2/t2-hero.png", href: "/models/t2", testDrive: "/book-test-drive?model=t2" },
  { model: "G700", kicker: "Coming soon", title: "Beyond the expected", copy: "A bold new expression of intelligent, premium adventure.", href: "/models", testDrive: "/book-test-drive" },
  { model: "T1 i-DM", kicker: "Electrified journey", title: "Power meets possibility", copy: "A new chapter of confident, efficient exploration.", href: "/models", testDrive: "/book-test-drive" },
];

const AUTOPLAY_MS = 8000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [navigationActive, setNavigationActive] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );
  const [hasAdvanced, setHasAdvanced] = useState(false);
  const campaign = campaigns[index];

  const move = useCallback((step: number) => {
    setHasAdvanced(true);
    setIndex((current) => (current + step + campaigns.length) % campaigns.length);
  }, []);

  useEffect(() => {
    const onNavigationActivity = (event: Event) => {
      setNavigationActive((event as CustomEvent<{ active: boolean }>).detail.active);
    };
    const onVisibilityChange = () => setDocumentVisible(document.visibilityState === "visible");
    window.addEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigationActivity);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      window.removeEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigationActivity);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (navigationActive || !documentVisible || !desktop.matches || reducedMotion.matches) return;
    const timer = window.setTimeout(() => move(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [documentVisible, move, navigationActive]);

  return (
    <Container className="relative z-10 flex min-h-[780px] items-end pb-52 pt-28 lg:min-h-[900px] lg:items-center lg:pb-36">
      <div key={campaign.model} className={`relative z-10 max-w-xl ${hasAdvanced ? "motion-safe:animate-[hero-in_.35s_ease-out]" : ""}`}>
        <p className="eyebrow text-white/65">{campaign.kicker}</p>
        <p className="mb-3 text-lg font-semibold tracking-[.08em] uppercase">Jetour {campaign.model}</p>
        <h1 className="max-w-xl text-[clamp(3.25rem,7vw,7rem)] leading-[.88] font-semibold tracking-[-.06em] uppercase">{campaign.title}</h1>
        <p className="mt-7 max-w-md text-sm leading-7 text-white/68 sm:text-base">{campaign.copy}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <JetourButton href={campaign.href} size="large">Explore {campaign.model}</JetourButton>
          <JetourButton href={campaign.testDrive} variant="secondary" size="large">Book a Test Drive</JetourButton>
        </div>
        <div className="mt-9 flex items-center gap-6">
          <span aria-live="polite" className="text-sm tracking-[.1em]">{String(index + 1).padStart(2, "0")} / {String(campaigns.length).padStart(2, "0")}</span>
          <div className="flex gap-2">
            <button onClick={() => move(-1)} aria-label="Previous campaign" className="grid size-11 place-items-center border border-white/25 hover:bg-white hover:text-black"><HugeiconsIcon icon={ArrowLeft01Icon} /></button>
            <button onClick={() => move(1)} aria-label="Next campaign" className="grid size-11 place-items-center border border-white/25 hover:bg-white hover:text-black"><HugeiconsIcon icon={ArrowRight01Icon} /></button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-[13%] top-24 h-[24%] sm:inset-x-3 sm:h-[42%] lg:inset-y-[15%] lg:left-[42%] lg:h-auto">
        {campaign.image ? (
          <Image src={campaign.image} alt={`Jetour ${campaign.model}`} fill loading="eager" fetchPriority="high" sizes="(max-width: 639px) 74vw, (max-width: 1023px) 100vw, 58vw" className="object-contain drop-shadow-[0_30px_45px_rgba(0,0,0,.8)]" />
        ) : (
          <div className="flex h-full items-center justify-center"><span className="text-[clamp(6rem,18vw,18rem)] font-semibold tracking-[-.09em] text-white/[.045]">{campaign.model}</span></div>
        )}
      </div>
    </Container>
  );
}