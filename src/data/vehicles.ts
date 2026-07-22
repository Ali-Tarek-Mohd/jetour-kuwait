import type { Vehicle } from "@/types/vehicle";

export const vehicles: Vehicle[] = [
  {
    slug: "t2", name: "T2", category: "Adventure SUV", tagline: "The Adventurer",
    specification: "2.0L Turbo · XWD", image: "/images/vehicles/t2/t2-hero.png",
    imageAlt: "Jetour T2 adventure SUV", featured: true, pageReady: true,
    colors: [
      { name: "Glacier White", swatch: "#e6e5df", image: "/images/vehicles/t2/colors/glacier-white.webp", available: true, alt: "Jetour T2 in Glacier White", background: "radial-gradient(circle at 50% 44%, rgba(232,232,225,.28), transparent 38%), linear-gradient(145deg,#3a3b3a,#171a1c 72%)", foregroundTone: "light" },
      { name: "Carbon Black", swatch: "#242629", image: "/images/vehicles/t2/colors/carbon-black.webp", available: true, alt: "Jetour T2 in Carbon Black", background: "radial-gradient(circle at 50% 44%, rgba(104,110,114,.22), transparent 38%), linear-gradient(145deg,#24282b,#0d0f10 72%)", foregroundTone: "light" },
      { name: "Desert Sand", swatch: "#aa9678", image: "/images/vehicles/t2/colors/desert-sand.webp", available: true, alt: "Jetour T2 in Desert Sand", background: "radial-gradient(circle at 50% 44%, rgba(181,151,108,.25), transparent 38%), linear-gradient(145deg,#3b3328,#151516 72%)", foregroundTone: "light" },
      { name: "Metallic Silver", swatch: "#999fa2", image: "/images/vehicles/t2/colors/metallic-silver.webp", available: true, alt: "Jetour T2 in Metallic Silver", background: "radial-gradient(circle at 50% 44%, rgba(169,179,184,.25), transparent 38%), linear-gradient(145deg,#343a3e,#121416 72%)", foregroundTone: "light" },
    ],
  },
  { slug: "dashing", name: "Dashing", category: "Urban SUV", tagline: "Made for the city", specification: "Dynamic turbo performance", plannedImage: "/images/vehicles/dashing/dashing-card.webp", imageAlt: "Jetour Dashing SUV", featured: false, pageReady: false, colors: [] },
  { slug: "x70-plus", name: "X70 Plus", category: "Family SUV", tagline: "Space for every journey", specification: "Seven-seat cabin", plannedImage: "/images/vehicles/x70-plus/x70-plus-card.webp", imageAlt: "Jetour X70 Plus SUV", featured: false, pageReady: false, colors: [] },
  { slug: "x90-plus", name: "X90 Plus", category: "Premium SUV", tagline: "Elevated comfort", specification: "Premium seven-seat cabin", plannedImage: "/images/vehicles/x90-plus/x90-plus-card.webp", imageAlt: "Jetour X90 Plus SUV", featured: false, pageReady: false, colors: [] },
];
