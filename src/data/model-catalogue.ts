import type { ModelCatalogueEntry, ModelCategory } from "@/types/vehicle";
import { vehicles } from "./vehicles";

const verifiedBySlug = new Map(vehicles.map((vehicle) => [vehicle.slug, vehicle]));
const verifiedCategories = new Set<ModelCategory>(["Adventure SUV", "Urban SUV", "Family SUV", "Premium SUV"]);

function verifiedCategory(slug: string) {
  const category = verifiedBySlug.get(slug)?.category;
  return verifiedCategories.has(category as ModelCategory) ? category as ModelCategory : undefined;
}

const t2 = verifiedBySlug.get("t2");

export const modelCatalogue: ModelCatalogueEntry[] = [
  { name: "G700", slug: "g700", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  {
    name: "T1",
    slug: "t1",
    image: "/images/vehicles/t1/colors/green.webp",
    imageAlt: "Jetour T1 in Green",
    availability: "details-coming-soon",
    detailStatus: "coming-soon",
    colorControlVerb: "View",
    colors: [
      { name: "Green", swatch: "#617f78", image: "/images/vehicles/t1/colors/green.webp", available: true, alt: "Jetour T1 in Green", studioBackground: { base: "#17221f", centralGlow: "rgba(72,126,112,.58)", highlight: "rgba(159,199,188,.24)", floorGlow: "rgba(99,151,133,.2)", vignetteStrength: .68 }, foregroundTone: "light" },
      { name: "Sand", swatch: "#b3a58c", image: "/images/vehicles/t1/colors/sand.webp", available: true, alt: "Jetour T1 in Sand", studioBackground: { base: "#261f17", centralGlow: "rgba(151,113,68,.58)", highlight: "rgba(229,192,132,.25)", floorGlow: "rgba(188,139,78,.2)", vignetteStrength: .66 }, foregroundTone: "light" },
      { name: "White", swatch: "#ecebe5", image: "/images/vehicles/t1/colors/white.webp", available: true, alt: "Jetour T1 in White", studioBackground: { base: "#24282a", centralGlow: "rgba(174,186,188,.5)", highlight: "rgba(244,246,241,.26)", floorGlow: "rgba(190,199,199,.17)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Silver", swatch: "#a8adb0", image: "/images/vehicles/t1/colors/silver.webp", available: true, alt: "Jetour T1 in Silver", studioBackground: { base: "#20272b", centralGlow: "rgba(119,140,149,.5)", highlight: "rgba(202,213,217,.23)", floorGlow: "rgba(145,163,169,.17)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Black", swatch: "#17191a", image: "/images/vehicles/t1/colors/black.webp", available: true, alt: "Jetour T1 in Black", studioBackground: { base: "#101416", centralGlow: "rgba(64,77,84,.48)", highlight: "rgba(151,169,177,.19)", floorGlow: "rgba(91,108,116,.15)", vignetteStrength: .74 }, foregroundTone: "light" },
    ],
  },
  {
    name: "T2",
    slug: "t2",
    category: verifiedCategory("t2"),
    image: t2?.image,
    imageAlt: t2?.imageAlt,
    availability: "available",
    detailStatus: "complete",
    colors: t2?.colors ?? [],
  },
  {
    name: "T2 i-DM",
    slug: "t2-i-dm",
    image: "/images/vehicles/t2-i-dm/colors/blue.webp",
    imageAlt: "Jetour T2 i-DM in Blue",
    availability: "details-coming-soon",
    detailStatus: "coming-soon",
    colorControlVerb: "View",
    colors: [
      { name: "Blue", swatch: "#466b7f", image: "/images/vehicles/t2-i-dm/colors/blue.webp", available: true, alt: "Jetour T2 i-DM in Blue", studioBackground: { base: "#15232d", centralGlow: "rgba(67,107,132,.58)", highlight: "rgba(174,193,204,.23)", floorGlow: "rgba(74,119,146,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Black", swatch: "#17191b", image: "/images/vehicles/t2-i-dm/colors/black.webp", available: true, alt: "Jetour T2 i-DM in Black", studioBackground: { base: "#111517", centralGlow: "rgba(70,78,83,.52)", highlight: "rgba(150,158,162,.2)", floorGlow: "rgba(91,99,104,.16)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Sand", swatch: "#ae9c7e", image: "/images/vehicles/t2-i-dm/colors/sand.webp", available: true, alt: "Jetour T2 i-DM in Sand", studioBackground: { base: "#281f16", centralGlow: "rgba(155,116,70,.57)", highlight: "rgba(227,190,128,.25)", floorGlow: "rgba(188,139,77,.2)", vignetteStrength: .67 }, foregroundTone: "light" },
      { name: "Silver", swatch: "#a4aaad", image: "/images/vehicles/t2-i-dm/colors/silver.webp", available: true, alt: "Jetour T2 i-DM in Silver", studioBackground: { base: "#20272b", centralGlow: "rgba(119,139,149,.51)", highlight: "rgba(201,213,218,.23)", floorGlow: "rgba(145,161,169,.17)", vignetteStrength: .7 }, foregroundTone: "light" },
    ],
  },
  { name: "Dashing", slug: "dashing", category: verifiedCategory("dashing"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X50", slug: "x50", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 FL", slug: "x70-fl", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 Plus", slug: "x70-plus", category: verifiedCategory("x70-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X90 Plus", slug: "x90-plus", category: verifiedCategory("x90-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
];

export const modelCategories: ModelCategory[] = ["Adventure SUV", "Urban SUV", "Family SUV", "Premium SUV"];
export const modelNavigationItems = modelCatalogue.map(({ name, slug }) => ({ label: name, href: `/models/${slug}` }));
export function getModelCatalogueEntry(slug: string) { return modelCatalogue.find((model) => model.slug === slug); }
