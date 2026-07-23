"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowDown01Icon from "@hugeicons/core-free-icons/ArrowDown01Icon";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import Cancel01Icon from "@hugeicons/core-free-icons/Cancel01Icon";
import Menu01Icon from "@hugeicons/core-free-icons/Menu01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { headerNavigationItems, moreNavigationItems } from "@/data/navigation";
import { announceNavigationActivity } from "@/lib/navigation-events";
import { HeaderAnchorLink } from "./header-anchor-link";
import type { HeaderModel } from "./site-header-client";
import type { HeaderTheme } from "./use-header-theme";

export function MobileNavigation({
  models,
  headerTheme,
  onOpenChange,
}: {
  models: HeaderModel[];
  headerTheme: HeaderTheme;
  onOpenChange: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [modelsOpen, setModelsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("aria-disabled"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      menuButton?.focus();
    };
  }, [open]);

  useEffect(() => {
    announceNavigationActivity(open);
    onOpenChange(open);
    return () => {
      announceNavigationActivity(false);
      onOpenChange(false);
    };
  }, [onOpenChange, open]);

  return (
    <div className="fixed top-[13px] right-5 z-[calc(var(--layer-header)+1)] flex sm:right-8 xl:hidden">
      <button
        ref={menuButtonRef}
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-navigation-drawer"
        onClick={() => setOpen(true)}
        className={`grid size-11 place-items-center border transition-colors ${
          headerTheme === "light"
            ? "border-black/25 text-[#090b0d] hover:border-black hover:bg-black hover:text-white"
            : "border-white/22 text-white hover:border-white hover:bg-white hover:text-black"
        }`}
      >
        <HugeiconsIcon icon={Menu01Icon} size={22} />
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[var(--layer-mobile-navigation)] flex flex-col overflow-hidden bg-[#07090b] motion-safe:animate-[mobile-drawer-in_.22s_ease-out]"
        >
          <div className="flex h-[70px] shrink-0 items-center justify-between border-b border-white/12 px-5 sm:px-8">
            <Link href="/" onClick={close} aria-label="Jetour Kuwait homepage" className="relative h-[36px] w-[210px]">
              <Image src="/images/brand/jetour-budastoor-header.png" alt="Jetour and Budastoor Motors" fill sizes="210px" className="object-contain object-left" />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={close}
              className="grid size-11 place-items-center border border-white/22 transition-colors hover:bg-white hover:text-black"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={22} />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="home-scrollbar-hidden flex-1 overflow-y-auto px-5 py-5 sm:px-8">
            <MobileAccordion
              id="mobile-models"
              label="Models"
              open={modelsOpen}
              onToggle={() => setModelsOpen((value) => !value)}
            >
              <div className="grid grid-cols-2 gap-x-4 pb-4">
                {models.map((model) => (
                  <Link
                    key={model.slug}
                    href={`/models/${model.slug}`}
                    onClick={close}
                    className="flex min-h-12 items-center border-b border-white/8 text-xs font-semibold tracking-[.06em] text-white/70 uppercase transition-colors hover:text-jetour-accent"
                  >
                    {model.name}
                  </Link>
                ))}
              </div>
              <Link href="/models" onClick={close} className="mb-3 flex min-h-12 items-center justify-between border border-white/14 px-4 text-xs font-semibold uppercase">
                View all models
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </Link>
            </MobileAccordion>

            {headerNavigationItems.map((item) => (
              <HeaderAnchorLink key={item.label} href={item.href} onNavigate={close} className="flex min-h-14 items-center border-b border-white/12 text-lg font-semibold tracking-[-.01em] uppercase">
                {item.label}
              </HeaderAnchorLink>
            ))}

            <MobileAccordion
              id="mobile-more"
              label="More"
              open={moreOpen}
              onToggle={() => setMoreOpen((value) => !value)}
            >
              <div className="grid pb-3 sm:grid-cols-2 sm:gap-x-5">
                {moreNavigationItems.map((item) => item.disabled ? (
                  <div key={item.label} aria-disabled="true" className="flex min-h-14 items-center justify-between border-b border-white/8 text-sm text-white/48">
                    <span>{item.label}</span>
                    <span className="text-[9px] tracking-[.08em] text-jetour-accent/75 uppercase">Coming soon</span>
                  </div>
                ) : item.href.startsWith("/#") ? (
                  <HeaderAnchorLink key={item.label} href={item.href as `/#${string}`} onNavigate={close} className="flex min-h-14 items-center border-b border-white/8 text-sm font-medium">
                    {item.label}
                  </HeaderAnchorLink>
                ) : (
                  <Link key={item.label} href={item.href} onClick={close} className="flex min-h-14 items-center border-b border-white/8 text-sm font-medium">
                    {item.label}
                  </Link>
                ))}
              </div>
            </MobileAccordion>

            <div className="mt-7 border-t border-white/12 pt-6">
              <p className="text-[9px] tracking-[.18em] text-white/40 uppercase">Language</p>
              <div role="group" aria-label="Language selection" className="mt-3 flex min-h-12 items-center gap-5">
                <button type="button" aria-pressed="true" className="min-h-11 border-b border-jetour-accent text-sm font-semibold">EN</button>
                <span className="h-4 w-px bg-white/20" />
                <button type="button" aria-pressed="false" lang="ar" aria-label="Switch to Arabic" className="min-h-11 text-sm text-white/72">العربية</button>
              </div>
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/12 bg-[#080a0c] p-5 sm:px-8">
            <Link href="/book-test-drive" onClick={close} className="mobile-booking-cta flex min-h-13 items-center justify-center gap-3 bg-white px-5 text-sm font-semibold tracking-[.07em] uppercase transition-colors hover:bg-jetour-accent">
              Book a Test Drive
              <HugeiconsIcon icon={ArrowRight01Icon} size={17} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({
  id,
  label,
  open,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/12">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-14 w-full items-center justify-between text-left text-lg font-semibold tracking-[-.01em] uppercase"
      >
        {label}
        <HugeiconsIcon icon={ArrowDown01Icon} size={19} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div id={id} hidden={!open}>{children}</div>
    </div>
  );
}
