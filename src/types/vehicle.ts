export type VehicleColor = {
  name: string;
  swatch: string;
  image?: string;
  plannedImage?: string;
  available: boolean;
  alt?: string;
  background?: string;
  studioBackground?: {
    base: string;
    centralGlow: string;
    highlight: string;
    floorGlow?: string;
    vignetteStrength?: number;
  };
  foregroundTone?: "light" | "dark";
};

export type ModelCategory = "Adventure SUV" | "Urban SUV" | "Family SUV" | "Premium SUV";
export type ModelDetailStatus = "complete" | "coming-soon";
export type ModelAvailability = "available" | "details-coming-soon";

export type ModelCatalogueEntry = {
  name: string;
  slug: string;
  category?: ModelCategory;
  image?: string;
  imageAlt?: string;
  availability: ModelAvailability;
  detailStatus: ModelDetailStatus;
  colors: VehicleColor[];
  colorControlVerb?: "Show" | "View";
  catalogueImageScale?: number;
  catalogueImageTransformOrigin?: string;
  catalogueMediaMode?: "studio-image";
  catalogueStudioImageLayout?: "integrated-tall";
  catalogueStudioImageScale?: number;
  catalogueStudioImageObjectPosition?: string;
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
    posterImage?: string;
    desktopVideoWebm?: string;
    desktopVideoMp4?: string;
    mobileVideoWebm?: string;
    mobileVideoMp4?: string;
    videoFocalPoint?: string;
    videoAltDescription?: string;
    videoEnabled?: boolean;
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
