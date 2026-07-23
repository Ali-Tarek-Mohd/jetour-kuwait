import { modelCatalogue } from "@/data/model-catalogue";
import type { ModelCatalogueEntry } from "@/types/vehicle";
import { SiteHeaderClient, type HeaderModel } from "./site-header-client";

const megaMenuPreviewFits: Record<
  string,
  NonNullable<HeaderModel["previewFit"]>
> = {
  g700: { scale: 1.12, x: 0, y: 4, origin: "50% 58%" },
  t1: { scale: 1.22, x: 0, y: 6, origin: "50% 58%" },
  t2: { scale: 1.18, x: 0, y: 4, origin: "50% 58%" },
  "t2-i-dm": { scale: 1.18, x: 0, y: 4, origin: "50% 58%" },
  dashing: { scale: 1.4, x: 0, y: 4, origin: "50% 58%" },
  x50: { scale: 1.34, x: 0, y: 2, origin: "50% 56%" },
  "x70-fl": { scale: 1.06, x: 0, y: 2, origin: "50% 56%" },
  "x70-plus": {
    scale: 0.94,
    x: 0,
    y: -2,
    origin: "50% 50%",
    objectPosition: "50% 48%",
    studio: true,
  },
  "x90-plus": { scale: 1.08, x: 0, y: 2, origin: "50% 56%" },
};

function headerModel(model: ModelCatalogueEntry): HeaderModel {
  const preferredColor =
    model.colors.find((color) => /^(carbon )?black$/i.test(color.name) && color.available && color.image) ??
    model.colors.find((color) => color.available && color.image);

  return {
    name: model.name,
    slug: model.slug,
    category: model.category,
    image: preferredColor?.image ?? model.image,
    imageAlt: preferredColor?.alt ?? model.imageAlt ?? `Jetour ${model.name}`,
    mediaMode: model.catalogueMediaMode === "studio-image" ? "studio" : "transparent",
    imageScale: model.catalogueMediaMode === "studio-image"
      ? model.catalogueStudioImageScale
      : model.catalogueImageScale,
    imagePosition: model.catalogueMediaMode === "studio-image"
      ? model.catalogueStudioImageObjectPosition
      : model.catalogueImageTransformOrigin,
    previewFit: megaMenuPreviewFits[model.slug],
  };
}

export function SiteHeader() {
  return <SiteHeaderClient models={modelCatalogue.map(headerModel)} />;
}
