import { modelCatalogue } from "@/data/model-catalogue";
import { vehiclePages } from "@/data/vehicle-pages";
import type { ModelCatalogueEntry, VehicleColor } from "@/types/vehicle";
import type { HomeModel } from "./home-types";

const showcaseVisuals: Record<string, HomeModel["visuals"]> = {
  g700: {
    stageScale: 1.08, stageX: "3%", stageY: "2%", stageMaxWidth: "940px", stageObjectPosition: "50% 55%",
    selectorScale: 1.42, selectorX: "0%", selectorY: "1%",
    wordmarkX: "58%", wordmarkY: "58%", wordmarkScale: 1.16, wordmarkTracking: "-0.075em",
  },
  t1: {
    stageScale: 1.16, stageX: "3%", stageY: "3%", stageMaxWidth: "900px", stageObjectPosition: "50% 55%",
    selectorScale: 1.52, selectorX: "0%", selectorY: "2%",
    wordmarkX: "58%", wordmarkY: "57%", wordmarkScale: 1.2, wordmarkTracking: "-0.07em",
  },
  t2: {
    stageScale: 1.13, stageX: "3%", stageY: "3%", stageMaxWidth: "910px", stageObjectPosition: "50% 55%",
    selectorScale: 1.48, selectorX: "0%", selectorY: "2%",
    wordmarkX: "58%", wordmarkY: "57%", wordmarkScale: 1.2, wordmarkTracking: "-0.07em",
  },
  "t2-i-dm": {
    stageScale: 1.1, stageX: "3%", stageY: "3%", stageMaxWidth: "920px", stageObjectPosition: "50% 55%",
    selectorScale: 1.46, selectorX: "0%", selectorY: "2%",
    wordmarkX: "56%", wordmarkY: "58%", wordmarkScale: 0.94, wordmarkTracking: "-0.065em",
  },
  dashing: {
    stageScale: 1.39, stageX: "4%", stageY: "4%", stageMaxWidth: "910px", stageObjectPosition: "50% 66%",
    selectorScale: 1.72, selectorX: "0%", selectorY: "6%",
    wordmarkX: "55%", wordmarkY: "59%", wordmarkScale: 0.95, wordmarkTracking: "-0.075em",
  },
  x50: {
    stageScale: 1.31, stageX: "3%", stageY: "1%", stageMaxWidth: "900px", stageObjectPosition: "50% 50%",
    selectorScale: 1.66, selectorX: "0%", selectorY: "1%",
    wordmarkX: "58%", wordmarkY: "58%", wordmarkScale: 1.12, wordmarkTracking: "-0.07em",
  },
  "x70-fl": {
    stageScale: 1.22, stageX: "3%", stageY: "1%", stageMaxWidth: "920px", stageObjectPosition: "50% 50%",
    selectorScale: 1.54, selectorX: "0%", selectorY: "1%",
    wordmarkX: "57%", wordmarkY: "58%", wordmarkScale: 1, wordmarkTracking: "-0.07em",
  },
  "x70-plus": {
    stageScale: 1.02, stageX: "4%", stageY: "1%", stageMaxWidth: "780px", stageObjectPosition: "49% 46%",
    selectorScale: 1, selectorX: "0%", selectorY: "0%",
    wordmarkX: "55%", wordmarkY: "58%", wordmarkScale: 0.87, wordmarkTracking: "-0.065em",
  },
  "x90-plus": {
    stageScale: 1.2, stageX: "3%", stageY: "0%", stageMaxWidth: "930px", stageObjectPosition: "50% 50%",
    selectorScale: 1.52, selectorX: "0%", selectorY: "0%",
    wordmarkX: "55%", wordmarkY: "58%", wordmarkScale: 0.87, wordmarkTracking: "-0.065em",
  },
};

function preferredColor(model: ModelCatalogueEntry): VehicleColor | undefined {
  return (
    model.colors.find((color) => /^(carbon )?black$/i.test(color.name) && color.available && color.image) ??
    model.colors.find((color) => color.available && color.image)
  );
}

export function getHomeModel(slug: string): HomeModel {
  const model = modelCatalogue.find((entry) => entry.slug === slug);
  if (!model) throw new Error(`Homepage model "${slug}" is missing from the catalogue.`);
  const vehiclePage = vehiclePages.find((entry) => entry.slug === slug);

  const color = preferredColor(model);
  const image = color?.image ?? model.image;
  if (!image) throw new Error(`Homepage model "${slug}" has no approved local image.`);

  return {
    name: model.name,
    slug: model.slug,
    category: model.category,
    tagline: vehiclePage?.tagline ?? "Full model details coming soon",
    specifications: vehiclePage?.quickSpecifications ?? [],
    image,
    imageAlt: color?.alt ?? model.imageAlt ?? `Jetour ${model.name}`,
    mediaMode: model.catalogueMediaMode === "studio-image" ? "studio" : "transparent",
    visuals: showcaseVisuals[model.slug],
  };
}
