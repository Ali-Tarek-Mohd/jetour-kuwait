import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ModelHero } from "@/components/models/model-hero";
import { ModelNavigation } from "@/components/models/model-navigation";
import { SpecificationStrip } from "@/components/models/specification-strip";
import { ModelOverview } from "@/components/models/model-overview";
import { ExteriorSection } from "@/components/models/exterior-section";
import { ModelColorStudio } from "@/components/models/model-color-studio";
import { InteriorSection } from "@/components/models/interior-section";
import { FeatureSection } from "@/components/models/feature-section";
import { TrimComparison } from "@/components/models/trim-comparison";
import { ModelGallery } from "@/components/models/model-gallery";
import { RelatedModels } from "@/components/models/related-models";
import { ModelCta } from "@/components/models/model-cta";
import { MobileModelActions } from "@/components/models/mobile-model-actions";
import { getVehiclePage, readyVehiclePages } from "@/data/vehicle-pages";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return readyVehiclePages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehiclePage(slug);
  if (!vehicle) return { title: "Model not found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `JETOUR ${vehicle.name}`,
    description: vehicle.summary,
    alternates: { canonical: `/models/${vehicle.slug}` },
    openGraph: {
      title: `JETOUR ${vehicle.name} | JETOUR Kuwait`,
      description: vehicle.summary,
      type: "website",
      images: siteUrl ? [{ url: new URL(vehicle.hero.transparentVehicleImage, siteUrl).toString(), alt: vehicle.hero.alt }] : undefined,
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = getVehiclePage(slug);
  if (!vehicle) notFound();
  return <main className="min-h-screen overflow-x-clip bg-jetour-black pb-20 text-white md:pb-0">
    <SiteHeader />
    <ModelHero vehicle={vehicle} />
    <ModelNavigation name={vehicle.name} />
    <SpecificationStrip specifications={vehicle.quickSpecifications} />
    <ModelOverview overview={vehicle.overview} />
    <ExteriorSection exterior={vehicle.exterior} />
    <ModelColorStudio model={vehicle.name} colors={vehicle.colors} />
    <InteriorSection interior={vehicle.interior} />
    <FeatureSection groups={vehicle.featureGroups} />
    <TrimComparison trims={vehicle.trims} />
    <ModelGallery gallery={vehicle.gallery} />
    <RelatedModels slugs={vehicle.relatedVehicles} />
    <ModelCta name={vehicle.name} slug={vehicle.slug} brochure={vehicle.brochure} />
    <SiteFooter />
    <MobileModelActions slug={vehicle.slug} />
  </main>;
}
