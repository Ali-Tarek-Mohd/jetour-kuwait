import type { VehiclePage } from "@/types/vehicle";

export const plannedVehicleSlugs = ["t2", "dashing", "x70-plus", "x90-plus", "g700", "t1", "t2-idm"] as const;

export const vehiclePages: VehiclePage[] = [
  {
    slug: "t2",
    name: "T2",
    category: "Adventure SUV",
    tagline: "The Adventurer",
    summary: "A bold adventure SUV shaped around confident capability, purposeful technology and everyday comfort.",
    pageReady: true,
    isPlaceholder: true,
    hero: {
      transparentVehicleImage: "/images/vehicles/t2/t2-hero.png",
      alt: "Jetour T2 adventure SUV in Glacier White",
      eyebrow: "Jetour adventure SUV",
      title: "Explore beyond",
      description: "Distinctive design and confident capability for journeys that move beyond the expected.",
    },
    quickSpecifications: [
      { label: "Engine", value: "2.0L Turbo" },
      { label: "Drivetrain", value: "XWD" },
    ],
    overview: {
      heading: "Ready for a wider world",
      description: "The T2 brings a strong, purposeful stance to daily driving and open-road exploration, balancing its adventurous character with a considered cabin experience.",
      statement: "Designed for drivers who see every road as the beginning of something more.",
      media: { image: "/images/vehicles/t2/t2-hero.png", alt: "Jetour T2 exterior profile" },
    },
    exterior: {
      heading: "A confident silhouette",
      description: "Clean geometric surfaces and an upright profile give the T2 a distinctive presence without unnecessary decoration.",
      highlights: ["Purposeful body styling", "Distinctive lighting signature", "Adventure-focused stance"],
      media: { plannedImage: "/images/vehicles/t2/exterior/exterior-main.webp", alt: "Jetour T2 exterior design" },
    },
    colors: [
      { name: "Glacier White", swatch: "#e6e5df", image: "/images/vehicles/t2/t2-hero.png", plannedImage: "/images/vehicles/t2/colors/glacier-white.webp", available: true, alt: "Jetour T2 in Glacier White" },
      { name: "Carbon Black", swatch: "#242629", plannedImage: "/images/vehicles/t2/colors/carbon-black.webp", available: false },
      { name: "Desert Silver", swatch: "#aaa79e", plannedImage: "/images/vehicles/t2/colors/desert-silver.webp", available: false },
      { name: "Forest Green", swatch: "#35423b", plannedImage: "/images/vehicles/t2/colors/forest-green.webp", available: false },
    ],
    interior: {
      heading: "Space with purpose",
      description: "The interior architecture is prepared to present verified seating, display, storage, material and comfort details as official Kuwait specifications become available.",
      highlights: ["Driver-focused layout", "Flexible everyday space", "Comfort-led cabin design"],
      media: { plannedImage: "/images/vehicles/t2/interior/cabin-main.webp", alt: "Jetour T2 cabin" },
    },
    featureGroups: [
      { id: "performance", title: "Performance", introduction: "A foundation for confident progress on the road and beyond it.", items: [{ icon: "adventure", title: "Confident capability", description: "Powertrain details will be expanded as Kuwait specifications are confirmed." }] },
      { id: "technology", title: "Technology", introduction: "Useful intelligence designed around the journey.", items: [{ icon: "technology", title: "Connected experience", description: "Verified display and connectivity details will be added when available." }] },
      { id: "safety", title: "Safety", introduction: "Supportive systems with driver confidence at their centre.", items: [{ icon: "safety", title: "Driver support", description: "Market-specific safety equipment will be listed after confirmation." }] },
      { id: "comfort", title: "Comfort", introduction: "A considered environment for daily drives and longer escapes.", items: [{ icon: "comfort", title: "Cabin comfort", description: "Verified seating and convenience features will be added here." }] },
    ],
    trims: [],
    gallery: [{ image: "/images/vehicles/t2/t2-hero.png", alt: "Jetour T2 adventure SUV exterior", width: 2560, height: 1440 }],
    relatedVehicles: ["dashing", "x70-plus"],
  },
];

export const readyVehiclePages = vehiclePages.filter((vehicle) => vehicle.pageReady);
export function getVehiclePage(slug: string) { return readyVehiclePages.find((vehicle) => vehicle.slug === slug); }
