import { SiteHeader } from "@/components/layout/site-header";
import { HeroCarousel } from "./hero-carousel";
import { BrandHighlights } from "./brand-highlights";
import { HeroBackground, type HeroBackgroundSources } from "./hero-background";

export function HeroSection({ background }: { background?: HeroBackgroundSources }) {
  return (
    <>
      <SiteHeader />
      <section data-header-theme="dark" className="relative isolate min-h-[780px] overflow-hidden bg-jetour-ink lg:min-h-[900px]">
        <HeroBackground sources={background} />
        <div className="jetour-grid absolute inset-0 opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_38%,rgba(217,176,111,.2),transparent_28%),linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.42)_72%,rgba(0,0,0,.78))]" />
        <HeroCarousel />
        <BrandHighlights />
      </section>
    </>
  );
}