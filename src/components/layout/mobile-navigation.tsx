"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import Cancel01Icon from "@hugeicons/core-free-icons/Cancel01Icon";
import Menu01Icon from "@hugeicons/core-free-icons/Menu01Icon";
import { navigationItems } from "@/data/navigation";
import { modelNavigationItems } from "@/data/model-catalogue";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return <div className="lg:hidden">
    <button type="button" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)} className="grid size-12 place-items-center border border-white/25"><HugeiconsIcon icon={Menu01Icon} size={24} /></button>
    {open ? <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu" className="fixed inset-0 z-[80] overflow-y-auto bg-jetour-black px-5 py-5 motion-safe:animate-[menu-in_.25s_ease-out]">
      <div className="flex items-center justify-between border-b border-white/12 pb-5"><span className="text-xl font-semibold tracking-[.16em]">JETOUR</span><button ref={closeRef} type="button" aria-label="Close navigation menu" onClick={close} className="grid size-12 place-items-center border border-white/25"><HugeiconsIcon icon={Cancel01Icon} size={24} /></button></div>
      <nav aria-label="Mobile navigation" className="mt-7">
        <Link href="/models" onClick={close} className="flex min-h-12 items-center border-b border-white/15 text-lg font-semibold uppercase">Models</Link>
        <div className="grid grid-cols-2 gap-x-4">{modelNavigationItems.map((model) => <Link key={model.href} href={model.href} onClick={close} className="flex min-h-11 items-center border-b border-white/8 text-xs font-semibold tracking-[.05em] text-white/68 uppercase">{model.label}</Link>)}</div>
        <div className="mt-5 flex flex-col">{navigationItems.filter((item) => item.label !== "Models").map((item) => <Link key={item.label} href={item.href} onClick={close} className="flex min-h-13 items-center border-b border-white/10 text-lg font-medium">{item.label}</Link>)}</div>
      </nav>
      <div className="mt-7 grid gap-3 pb-5"><Link href="/book-test-drive" onClick={close} className="flex min-h-14 items-center justify-center bg-white font-semibold text-black uppercase">Book a Test Drive</Link><div className="flex min-h-12 items-center justify-center gap-5 text-sm"><button>English</button><span className="h-4 w-px bg-white/25" /><button lang="ar">العربية</button></div></div>
    </div> : null}
  </div>;
}
