import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { JetourButton } from "@/components/ui/jetour-button";
import type { ModelCatalogueEntry } from "@/types/vehicle";

export function ModelComingSoon({ model }: { model: ModelCatalogueEntry }) {
  return <main className="min-h-screen overflow-x-clip bg-jetour-black text-white">
    <SiteHeader />
    <section className="relative flex min-h-[720px] items-center overflow-hidden border-b border-white/10 bg-[#0a0c0e] pt-[76px]">
      <div className="jetour-grid absolute inset-0 opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(217,176,111,.16),transparent_28%),linear-gradient(135deg,rgba(18,21,23,.35),#050607_74%)]" />
      <span aria-hidden="true" className="absolute right-[-.04em] bottom-[-.12em] text-[clamp(7rem,23vw,22rem)] leading-none font-semibold tracking-[-.09em] text-white/[.035] uppercase">{model.name}</span>
      <Container className="relative py-20">
        <p className="eyebrow">Jetour Kuwait</p>
        <h1 className="max-w-4xl text-[clamp(4rem,10vw,9rem)] leading-[.86] font-semibold tracking-[-.07em] uppercase">{model.name}</h1>
        <p className="mt-7 text-lg text-white/62">Full model details coming soon</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <JetourButton href="/#contact" size="large">Contact Sales</JetourButton>
          <JetourButton href={`/book-test-drive?model=${model.slug}`} variant="secondary" size="large">Book a Test Drive</JetourButton>
        </div>
        <Link href="/models" className="mt-7 inline-flex min-h-11 items-center border-b border-jetour-accent text-xs font-semibold tracking-[.1em] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jetour-accent">Back to all models</Link>
      </Container>
    </section>
    <SiteFooter />
  </main>;
}
