import type { Vehicle } from "@/types/vehicle";

export const vehicles: Vehicle[] = [
  {
    slug: "t2", name: "T2", category: "Adventure SUV", tagline: "The Adventurer",
    specification: "2.0L Turbo · XWD", image: "/images/vehicles/t2/t2-hero.png",
    imageAlt: "Jetour T2 adventure SUV", featured: true,
    colors: [
      { name: "Glacier White", swatch: "#e6e5df", image: "/images/vehicles/t2/t2-hero.png", available: true },
      { name: "Carbon Black", swatch: "#242629", available: false },
      { name: "Desert Silver", swatch: "#aaa79e", available: false },
      { name: "Forest Green", swatch: "#35423b", available: false },
    ],
  },
  { slug: "dashing", name: "Dashing", category: "Urban SUV", tagline: "Made for the city", specification: "Dynamic turbo performance", plannedImage: "/images/vehicles/dashing/dashing-card.webp", imageAlt: "Jetour Dashing SUV", featured: false, colors: [] },
  { slug: "x70-plus", name: "X70 Plus", category: "Family SUV", tagline: "Space for every journey", specification: "Seven-seat cabin", plannedImage: "/images/vehicles/x70-plus/x70-plus-card.webp", imageAlt: "Jetour X70 Plus SUV", featured: false, colors: [] },
  { slug: "x90-plus", name: "X90 Plus", category: "Premium SUV", tagline: "Elevated comfort", specification: "Premium seven-seat cabin", plannedImage: "/images/vehicles/x90-plus/x90-plus-card.webp", imageAlt: "Jetour X90 Plus SUV", featured: false, colors: [] },
];
