export type VehicleColor = {
  name: string;
  swatch: string;
  image?: string;
  plannedImage?: string;
  available: boolean;
  alt?: string;
  background?: string;
  foregroundTone?: "light" | "dark";
};

export type Vehicle = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  specification: string;
  image?: string;
  plannedImage?: string;
  imageAlt: string;
  startingPrice?: number;
  currency?: "KWD";
  featured: boolean;
  pageReady: boolean;
  colors: VehicleColor[];
};

export type VehicleMedia = {
  image?: string;
  plannedImage?: string;
  alt: string;
};

export type VehicleHighlight = {
  title: string;
  description: string;
  icon: "adventure" | "technology" | "safety" | "comfort";
  value?: string;
};

export type VehicleFeatureGroup = {
  id: "performance" | "technology" | "safety" | "comfort";
  title: string;
  introduction: string;
  items: VehicleHighlight[];
};

export type VehiclePage = {
  slug: string;
  name: string;
  modelYear?: string;
  category: string;
  tagline: string;
  summary: string;
  pageReady: boolean;
  isPlaceholder: boolean;
  hero: {
    desktopImage?: string;
    mobileImage?: string;
    transparentVehicleImage: string;
    alt: string;
    eyebrow: string;
    title: string;
    description: string;
  };
  pricing?: { startingPrice?: number; currency: "KWD"; disclaimer?: string };
  quickSpecifications: { label: string; value: string; unit?: string }[];
  overview: { heading: string; description: string; statement?: string; media: VehicleMedia };
  exterior: { heading: string; description: string; highlights: string[]; media: VehicleMedia };
  colors: VehicleColor[];
  interior: { heading: string; description: string; highlights: string[]; media: VehicleMedia };
  featureGroups: VehicleFeatureGroup[];
  dimensions?: { length?: string; width?: string; height?: string; wheelbase?: string; groundClearance?: string };
  trims: { name?: string; price?: number; currency?: "KWD"; features: string[]; availability?: string }[];
  gallery: { image: string; alt: string; width: number; height: number }[];
  brochure?: string;
  relatedVehicles: string[];
};
