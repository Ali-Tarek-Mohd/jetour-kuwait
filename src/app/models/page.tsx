import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { ModelsCatalogue } from "@/components/models/models-catalogue";
import { ModelsConversionActions } from "@/components/models/models-conversion-actions";
import { modelCatalogue, modelCategories } from "@/data/model-catalogue";

export const metadata: Metadata = {
  title: "Models",
  description: "Explore the Jetour Kuwait SUV range and discover available model details.",
  alternates: { canonical: "/models" },
};

export default function ModelsPage() {
  return <main className="min-h-screen overflow-x-clip bg-jetour-black text-white">
    <SiteHeader />
    <section className="relative flex min-h-[380px] items-end overflow-hidden border-b border-white/10 bg-[#0b0d0f] pb-14 pt-32 lg:min-h-[440px] lg:pb-16">
      <div className="jetour-grid absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_72%,rgba(168,119,68,.2),transparent_28%),linear-gradient(90deg,rgba(5,6,7,.98),rgba(12,14,16,.76))]" />
      <span aria-hidden="true" className="absolute -right-5 bottom-[-.16em] hidden text-[clamp(8rem,19vw,19rem)] leading-none font-semibold tracking-[-.08em] text-white/[.025] md:block">MODELS</span>
      <Container className="relative"><div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-end"><div><p className="eyebrow">Jetour Kuwait</p><h1 className="section-title max-w-4xl">Explore the range</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">From adventurous capability to considered family space, discover the Jetour model designed for your next journey.</p></div><div className="border-l border-white/15 pl-5"><p className="text-4xl font-semibold">{modelCatalogue.length}</p><p className="mt-1 text-[10px] tracking-[.14em] text-white/40 uppercase">Model records</p></div></div></Container>
    </section>
    <section aria-label="Vehicle catalogue" className="bg-[linear-gradient(180deg,#0b0d0f,#050607_28rem)]">
      <ModelsCatalogue models={modelCatalogue} categories={modelCategories} />
      <Container className="py-12 lg:py-16"><p className="mb-9 max-w-xl text-xs leading-6 text-white/42">Model pages and market information are published as approved Kuwait content becomes available.</p></Container>
    </section>
    <section className="relative overflow-hidden border-y border-white/10 bg-[#17130f] py-20 lg:py-24"><div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_50%,rgba(217,176,111,.17),transparent_34%)]" /><Container className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(30rem,34rem)] lg:items-center lg:gap-14"><div><p className="eyebrow">Need help choosing?</p><h2 className="section-title max-w-3xl">Find the Jetour made for your journey</h2><p className="mt-5 max-w-xl leading-7 text-white/58">Experience the range in person or connect with the Jetour Kuwait team.</p></div><ModelsConversionActions /></Container></section>
    <SiteFooter />
  </main>;
}
