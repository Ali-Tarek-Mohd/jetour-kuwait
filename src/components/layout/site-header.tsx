"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { JetourButton } from "@/components/ui/jetour-button";
import { MobileNavigation } from "./mobile-navigation";
import { navigationItems } from "@/data/navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let scheduled = false;
    const update = () => { setScrolled(window.scrollY > 24); scheduled = false; };
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-white/15 bg-black/95" : "border-white/8 bg-black/35"}`}>
    <Container className="flex h-[76px] items-center justify-between">
      <Link href="/" aria-label="Jetour Kuwait homepage" className="leading-none"><span className="block text-xl font-semibold tracking-[.18em]">JETOUR</span><span className="mt-1 block text-[7px] tracking-[.2em] text-white/60">DRIVE YOUR FUTURE</span></Link>
      <nav aria-label="Primary navigation" className="hidden items-center gap-6 xl:flex">{navigationItems.map((item) => <Link key={item.label} href={item.href} className="text-[11px] font-semibold tracking-[.07em] text-white/72 uppercase hover:text-white">{item.label}</Link>)}</nav>
      <div className="hidden items-center gap-5 lg:flex"><div className="flex gap-3 text-[11px]"><button aria-label="Switch to English">EN</button><span className="text-white/25">/</span><button lang="ar" aria-label="التبديل إلى العربية" className="text-white/60">العربية</button></div><JetourButton href="/book-test-drive" variant="secondary">Book a Test Drive</JetourButton></div>
      <MobileNavigation />
    </Container>
  </header>;
}
