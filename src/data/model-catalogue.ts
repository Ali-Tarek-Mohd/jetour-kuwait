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
  {
    name: "G700",
    slug: "g700",
    image: "/images/vehicles/g700/colors/white.webp",
    imageAlt: "Jetour G700 in White",
    availability: "details-coming-soon",
    detailStatus: "coming-soon",
    colorControlVerb: "View",
    colors: [
      { name: "White", swatch: "#ecece7", image: "/images/vehicles/g700/colors/white.webp", available: true, alt: "Jetour G700 in White", studioBackground: { base: "#23272a", centralGlow: "rgba(178,188,190,.52)", highlight: "rgba(244,247,243,.26)", floorGlow: "rgba(194,203,203,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Dark Grey", swatch: "#4b5053", image: "/images/vehicles/g700/colors/dark-grey.webp", available: true, alt: "Jetour G700 in Dark Grey", studioBackground: { base: "#171c1f", centralGlow: "rgba(87,99,106,.53)", highlight: "rgba(166,177,182,.2)", floorGlow: "rgba(94,105,111,.16)", vignetteStrength: .71 }, foregroundTone: "light" },
      { name: "Silver", swatch: "#a5abad", image: "/images/vehicles/g700/colors/silver.webp", available: true, alt: "Jetour G700 in Silver", studioBackground: { base: "#20272b", centralGlow: "rgba(132,149,157,.54)", highlight: "rgba(207,218,221,.24)", floorGlow: "rgba(151,167,173,.17)", vignetteStrength: .69 }, foregroundTone: "light" },
      { name: "Orange", swatch: "#a9572e", image: "/images/vehicles/g700/colors/orange.webp", available: true, alt: "Jetour G700 in Orange", studioBackground: { base: "#29160f", centralGlow: "rgba(159,70,34,.57)", highlight: "rgba(211,126,75,.23)", floorGlow: "rgba(145,62,28,.19)", vignetteStrength: .68 }, foregroundTone: "light" },
      { name: "Sand", swatch: "#ae9a78", image: "/images/vehicles/g700/colors/sand.webp", available: true, alt: "Jetour G700 in Sand", studioBackground: { base: "#281f16", centralGlow: "rgba(155,116,70,.57)", highlight: "rgba(227,190,128,.25)", floorGlow: "rgba(188,139,77,.2)", vignetteStrength: .67 }, foregroundTone: "light" },
      { name: "Blue", swatch: "#36566f", image: "/images/vehicles/g700/colors/blue.webp", available: true, alt: "Jetour G700 in Blue", studioBackground: { base: "#121f2b", centralGlow: "rgba(52,91,123,.58)", highlight: "rgba(153,181,199,.22)", floorGlow: "rgba(57,100,132,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Black", swatch: "#17191a", image: "/images/vehicles/g700/colors/black.webp", available: true, alt: "Jetour G700 in Black", studioBackground: { base: "#111517", centralGlow: "rgba(72,81,86,.54)", highlight: "rgba(157,166,171,.21)", floorGlow: "rgba(94,103,108,.17)", vignetteStrength: .69 }, foregroundTone: "light" },
    ],
  },
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
  {
    name: "Dashing",
    slug: "dashing",
    category: verifiedCategory("dashing"),
    image: "/images/vehicles/dashing/colors/black.webp",
    imageAlt: "Jetour Dashing in Black",
    availability: "details-coming-soon",
    detailStatus: "coming-soon",
    colorControlVerb: "View",
    catalogueImageScale: 1.55,
    catalogueImageTransformOrigin: "50% 70%",
    colors: [
      { name: "Black", swatch: "#17191a", image: "/images/vehicles/dashing/colors/black.webp", available: true, alt: "Jetour Dashing in Black", studioBackground: { base: "#111517", centralGlow: "rgba(72,81,86,.55)", highlight: "rgba(159,168,173,.21)", floorGlow: "rgba(95,104,109,.18)", vignetteStrength: .69 }, foregroundTone: "light" },
      { name: "Light Blue", swatch: "#8eb5c5", image: "/images/vehicles/dashing/colors/light-blue.webp", available: true, alt: "Jetour Dashing in Light Blue", studioBackground: { base: "#152630", centralGlow: "rgba(91,148,175,.55)", highlight: "rgba(190,220,231,.23)", floorGlow: "rgba(92,137,155,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Silver", swatch: "#a5abad", image: "/images/vehicles/dashing/colors/silver.webp", available: true, alt: "Jetour Dashing in Silver", studioBackground: { base: "#20272b", centralGlow: "rgba(130,148,157,.54)", highlight: "rgba(207,219,222,.24)", floorGlow: "rgba(150,166,173,.17)", vignetteStrength: .69 }, foregroundTone: "light" },
      { name: "Dark Blue", swatch: "#253f58", image: "/images/vehicles/dashing/colors/dark-blue.webp", available: true, alt: "Jetour Dashing in Dark Blue", studioBackground: { base: "#111d2a", centralGlow: "rgba(49,78,105,.57)", highlight: "rgba(142,167,185,.21)", floorGlow: "rgba(47,74,99,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "White", swatch: "#ecece7", image: "/images/vehicles/dashing/colors/white.webp", available: true, alt: "Jetour Dashing in White", studioBackground: { base: "#23272a", centralGlow: "rgba(178,188,190,.52)", highlight: "rgba(244,247,243,.26)", floorGlow: "rgba(194,203,203,.18)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Green", swatch: "#356c65", image: "/images/vehicles/dashing/colors/green.webp", available: true, alt: "Jetour Dashing in Green", studioBackground: { base: "#10231f", centralGlow: "rgba(45,112,96,.56)", highlight: "rgba(133,185,171,.22)", floorGlow: "rgba(46,101,88,.18)", vignetteStrength: .69 }, foregroundTone: "light" },
    ],
  },
  { name: "X50", slug: "x50", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 FL", slug: "x70-fl", availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X70 Plus", slug: "x70-plus", category: verifiedCategory("x70-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
  { name: "X90 Plus", slug: "x90-plus", category: verifiedCategory("x90-plus"), availability: "details-coming-soon", detailStatus: "coming-soon", colors: [] },
];

export const modelCategories: ModelCategory[] = ["Adventure SUV", "Urban SUV", "Family SUV", "Premium SUV"];
export const modelNavigationItems = modelCatalogue.map(({ name, slug }) => ({ label: name, href: `/models/${slug}` }));
export function getModelCatalogueEntry(slug: string) { return modelCatalogue.find((model) => model.slug === slug); }
