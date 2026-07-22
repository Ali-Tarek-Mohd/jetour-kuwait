export type VehicleColor = { name: string; swatch: string; image?: string; available: boolean };
export type Vehicle = { slug: string; name: string; category: string; tagline: string; specification: string; image?: string; plannedImage?: string; imageAlt: string; startingPrice?: number; currency?: "KWD"; featured: boolean; colors: VehicleColor[] };
