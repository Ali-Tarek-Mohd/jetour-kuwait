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
      { name: "Green", swatch: "#617f78", image: "/images/vehicles/t1/colors/green.webp", available: true, alt: "Jetour T1 in Green", background: "linear-gradient(145deg,#66766f,#171c1b 72%)", foregroundTone: "light" },
      { name: "Sand", swatch: "#b3a58c", image: "/images/vehicles/t1/colors/sand.webp", available: true, alt: "Jetour T1 in Sand", background: "linear-gradient(145deg,#8c806d,#1d1a16 72%)", foregroundTone: "light" },
      { name: "White", swatch: "#ecebe5", image: "/images/vehicles/t1/colors/white.webp", available: true, alt: "Jetour T1 in White", background: "linear-gradient(145deg,#9b9d99,#202322 72%)", foregroundTone: "light" },
      { name: "Silver", swatch: "#a8adb0", image: "/images/vehicles/t1/colors/silver.webp", available: true, alt: "Jetour T1 in Silver", background: "linear-gradient(145deg,#747b7e,#191d1f 72%)", foregroundTone: "light" },
      { name: "Black", swatch: "#17191a", image: "/images/vehicles/t1/colors/black.webp", available: true, alt: "Jetour T1 in Black", background: "linear-gradient(145deg,#383d3f,#0c0e0f 72%)", foregroundTone: "light" },
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
  { name: "T2 i-DM", slug: "t2-i-dm", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "Dashing", slug: "dashing", category: verifiedCategory("dashing"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X50", slug: "x50", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 FL", slug: "x70-fl", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 Plus", slug: "x70-plus", category: verifiedCategory("x70-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X90 Plus", slug: "x90-plus", category: verifiedCategory("x90-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
];

export const modelCategories: ModelCategory[] = ["Adventure SUV", "Urban SUV", "Family SUV", "Premium SUV"];
export const modelNavigationItems = modelCatalogue.map(({ name, slug }) => ({ label: name, href: `/models/${slug}` }));
export function getModelCatalogueEntry(slug: string) { return modelCatalogue.find((model) => model.slug === slug); }
