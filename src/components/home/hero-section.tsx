import { SiteHeader } from "@/components/layout/site-header";
import { HeroCarousel } from "./hero-carousel";

export function HeroSection() {
  return (
    <>
      <SiteHeader />
      <section
        data-header-theme="dark"
        className="relative isolate overflow-hidden bg-[#050607]"
      >
        <HeroCarousel />
      </section>
    </>
  );
}
