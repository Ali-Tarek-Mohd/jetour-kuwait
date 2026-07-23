import type { Vehicle } from "@/types/vehicle";

export const vehicles: Vehicle[] = [
  {
    slug: "t2", name: "T2", category: "Adventure SUV", tagline: "The Adventurer",
    specification: "2.0L Turbo · XWD", image: "/images/vehicles/t2/t2-hero.png",
    imageAlt: "Jetour T2 adventure SUV", featured: true, pageReady: true,
    colors: [
      { name: "Carbon Black", swatch: "#242629", image: "/images/vehicles/t2/colors/carbon-black.webp", available: true, alt: "Jetour T2 in Carbon Black", studioBackground: { base: "#101416", centralGlow: "rgba(65,76,82,.47)", highlight: "rgba(147,162,169,.18)", floorGlow: "rgba(88,103,110,.14)", vignetteStrength: .74 }, foregroundTone: "light" },
      { name: "Glacier White", swatch: "#e6e5df", image: "/images/vehicles/t2/colors/glacier-white.webp", available: true, alt: "Jetour T2 in Glacier White", studioBackground: { base: "#232729", centralGlow: "rgba(174,184,185,.5)", highlight: "rgba(242,244,239,.26)", floorGlow: "rgba(192,201,201,.17)", vignetteStrength: .7 }, foregroundTone: "light" },
      { name: "Desert Sand", swatch: "#aa9678", image: "/images/vehicles/t2/colors/desert-sand.webp", available: true, alt: "Jetour T2 in Desert Sand", studioBackground: { base: "#271f16", centralGlow: "rgba(155,111,59,.57)", highlight: "rgba(230,187,116,.25)", floorGlow: "rgba(191,136,69,.2)", vignetteStrength: .67 }, foregroundTone: "light" },
      { name: "Metallic Silver", swatch: "#999fa2", image: "/images/vehicles/t2/colors/metallic-silver.webp", available: true, alt: "Jetour T2 in Metallic Silver", studioBackground: { base: "#20262a", centralGlow: "rgba(115,135,145,.51)", highlight: "rgba(198,211,216,.23)", floorGlow: "rgba(143,160,168,.17)", vignetteStrength: .7 }, foregroundTone: "light" },
    ],
  },
  { slug: "dashing", name: "Dashing", category: "Urban SUV", tagline: "Made for the city", specification: "Dynamic turbo performance", plannedImage: "/images/vehicles/dashing/dashing-card.webp", imageAlt: "Jetour Dashing SUV", featured: false, pageReady: false, colors: [] },
  { slug: "x70-plus", name: "X70 Plus", category: "Family SUV", tagline: "Space for every journey", specification: "Seven-seat cabin", plannedImage: "/images/vehicles/x70-plus/x70-plus-card.webp", imageAlt: "Jetour X70 Plus SUV", featured: false, pageReady: false, colors: [] },
  { slug: "x90-plus", name: "X90 Plus", category: "Premium SUV", tagline: "Elevated comfort", specification: "Premium seven-seat cabin", plannedImage: "/images/vehicles/x90-plus/x90-plus-card.webp", imageAlt: "Jetour X90 Plus SUV", featured: false, pageReady: false, colors: [] },
];
