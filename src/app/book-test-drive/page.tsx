import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TestDriveForm } from "@/components/booking/test-drive-form";
import { Container } from "@/components/ui/container";
import { modelCatalogue } from "@/data/model-catalogue";
import { absoluteCanonical } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Book a Test Drive",
  description: "Choose a Jetour model and prepare a test-drive request in Kuwait.",
  alternates: { canonical: absoluteCanonical("/book-test-drive") },
};

type Props = {
  searchParams: Promise<{ model?: string | string[] }>;
};

export default async function BookTestDrivePage({ searchParams }: Props) {
  const requestedModel = (await searchParams).model;
  const requestedSlug = typeof requestedModel === "string" ? requestedModel : undefined;
  const selectedModel = modelCatalogue.find((model) => model.slug === requestedSlug);
  const formModels = modelCatalogue.map(({ name, slug }) => ({ name, slug }));

  return (
    <main className="min-h-screen overflow-x-clip bg-jetour-black text-white">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-white/10 bg-[#0b0d0f] pb-14 pt-32 lg:pb-18 lg:pt-40">
        <div className="jetour-grid absolute inset-0 opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_35%,rgba(217,176,111,.16),transparent_32%)]" />
        <Container className="relative">
          <p className="eyebrow">Your next journey</p>
          <h1 className="section-title max-w-4xl">Book a test drive</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            Select a model and share your preferred contact details. A connected booking service will be added before public submissions are enabled.
          </p>
        </Container>
      </section>
      <section className="py-14 lg:py-20">
        <Container className="grid gap-8 lg:grid-cols-[minmax(0,.65fr)_minmax(32rem,1.35fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold tracking-[.16em] text-jetour-accent uppercase">Test-drive request</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.03em] uppercase">Tell us how to reach you</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
              {selectedModel ? `${selectedModel.name} has been selected from the model catalogue.` : "Choose any current catalogue model to begin."}
            </p>
          </div>
          <TestDriveForm models={formModels} selectedSlug={selectedModel?.slug} />
        </Container>
      </section>
      <SiteFooter />
    </main>
  );
}
