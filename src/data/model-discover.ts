export type ModelDiscoverHighlight = {
  value: string;
  label: string;
};

export type ModelDiscoverFact = {
  value: string;
  label: string;
  displayLines?: string[];
  typography?: "battery-warranty" | "smartphone-integration";
};

export type ModelDiscoverColor = {
  name: string;
  image: string;
  swatch: string;
};

export type ModelDiscoverStoryImage = {
  src: string;
  alt: string;
  subtitle: string;
  description?: string;
  objectPosition: string;
  mediaScale?: number;
};

export type ModelDiscoverInteriorFeature = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  imageFit?: "cover" | "contain";
};

export type ModelDiscoverTechnologySlide = {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  points: string[];
};

export type ModelDiscoverSpecificationDetail = {
  label: string;
  value?: string;
};

export type ModelDiscoverSpecificationCategory = {
  name: string;
  leadValues: ModelDiscoverFact[];
  details: ModelDiscoverSpecificationDetail[];
};

export type ModelDiscoverSectionIdentity = {
  id: string;
  headingId: string;
};

export type ModelDiscoverSectionKey =
  | "hero"
  | "overview"
  | "exteriorStudio"
  | "exteriorDesign"
  | "interiorViewer"
  | "interiorDetails"
  | "technology"
  | "specifications"
  | "finalCta";

export type ModelDiscoverOverview = ModelDiscoverSectionIdentity & {
  index: string;
  heading: string;
  headingLines?: string[];
  description: string;
  image: string;
  imageAlt: string;
  imagePresentation?: "full-bleed" | "vehicle-cutout";
  imageObjectPosition?: string;
  video?: {
    src: string;
    poster: string;
  };
  facts: ModelDiscoverFact[];
};

export type ModelDiscoverExteriorStudio = ModelDiscoverSectionIdentity & {
  index: string;
  heading: string;
  description: string;
  disclaimer: string;
  defaultColorIndex: number;
  colors: ModelDiscoverColor[];
};

export type ModelDiscoverExteriorStory = ModelDiscoverSectionIdentity & {
  index: string;
  heading: string;
  description: string;
  images: ModelDiscoverStoryImage[];
};

export type ModelDiscoverInteriorViewer = ModelDiscoverSectionIdentity & {
  index: string;
  heading: string;
  note?: string;
  images: ModelDiscoverStoryImage[];
};

export type ModelDiscoverInteriorDetails = ModelDiscoverSectionIdentity & {
  index: string;
  heading: string;
  note?: string;
  items: ModelDiscoverInteriorFeature[];
};

export type ModelDiscoverTechnology = ModelDiscoverSectionIdentity & {
  index: string;
  slides: ModelDiscoverTechnologySlide[];
};

export type ModelDiscoverSpecifications = ModelDiscoverSectionIdentity & {
  controlIdPrefix: string;
  index: string;
  heading: string;
  intro?: string;
  note: string;
  document?: {
    eyebrow: string;
    label: string;
    metadata: string;
    href: string;
    ariaLabel: string;
  };
  categories: ModelDiscoverSpecificationCategory[];
};

export type ModelDiscoverFinalCta = ModelDiscoverSectionIdentity & {
  eyebrow: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  contentPosition?: "left" | "right";
  objectPositionDesktop: string;
  objectPositionMobile: string;
};

export type ModelDiscoverData = {
  slug: string;
  name: string;
  metadataDescription: string;
  sectionOrder: ModelDiscoverSectionKey[];
  hero: ModelDiscoverSectionIdentity & {
    eyebrow: string;
    supportingLine: string;
    image: string;
    imageAlt: string;
    objectPosition: string;
    copyPosition?: "left" | "right";
    primaryAction?: "booking" | "discover";
    highlightTone?: "default" | "bronze-values";
    mediaPresentation?: "default" | "letterboxed-cinematic";
    video?: {
      src: string;
      poster: string;
    };
    highlights: ModelDiscoverHighlight[];
  };
  overview?: ModelDiscoverOverview;
  exterior?: {
    studio?: ModelDiscoverExteriorStudio;
    story?: ModelDiscoverExteriorStory;
  };
  interior?: {
    viewer?: ModelDiscoverInteriorViewer;
    features?: ModelDiscoverInteriorDetails;
  };
  technology?: ModelDiscoverTechnology;
  specifications?: ModelDiscoverSpecifications;
  finalCta?: ModelDiscoverFinalCta;
};

const discoverModels: ModelDiscoverData[] = [
  {
    slug: "t1",
    name: "T1",
    metadataDescription:
      "Discover the Jetour T1 for Kuwait, with a 2.0-litre turbocharged GDI engine, 4×4 and an eight-speed automatic transmission.",
    sectionOrder: [
      "hero",
      "overview",
      "exteriorStudio",
      "exteriorDesign",
      "interiorViewer",
      "interiorDetails",
      "technology",
      "specifications",
      "finalCta",
    ],
    hero: {
      id: "t1-discover-hero",
      headingId: "t1-discover-title",
      eyebrow: "Jetour T1",
      supportingLine: "Built for every journey",
      image:
        "/images/vehicles/t1/discover/hero/t1-hero-poster.webp",
      imageAlt: "Jetour T1 driving along a tree-lined road",
      objectPosition: "50% 50%",
      copyPosition: "right",
      primaryAction: "discover",
      video: {
        src: "/images/vehicles/t1/discover/hero/t1-hero.mp4",
        poster:
          "/images/vehicles/t1/discover/hero/t1-hero-poster.webp",
      },
      highlights: [
        { value: "2.0L", label: "Turbocharged GDI" },
        { value: "4×4", label: "Drivetrain" },
        { value: "8-Speed", label: "Automatic" },
        { value: "5", label: "Seats" },
      ],
    },
    overview: {
      id: "overview",
      headingId: "t1-overview-title",
      index: "01 / T1",
      heading: "Ready for every road.",
      headingLines: ["Ready for", "Every road."],
      description:
        "The T1 combines a 2.0-litre turbocharged four-cylinder GDI engine, an eight-speed automatic transmission and 4×4 capability in a confident five-seat SUV.",
      image:
        "/images/vehicles/t1/discover/exterior/colors/green.webp",
      imageAlt: "Green Jetour T1 five-seat SUV",
      imagePresentation: "vehicle-cutout",
      imageObjectPosition: "68% 54%",
      facts: [
        { value: "2.0L Turbocharged GDI", label: "Engine" },
        { value: "4×4", label: "Drivetrain" },
        { value: "8-Speed Automatic", label: "Transmission" },
      ],
    },
    exterior: {
      studio: {
        id: "t1-exterior-studio",
        headingId: "t1-exterior-title",
        index: "02 / Exterior",
        heading: "Distinctive from every angle.",
        description:
          "A confident upright profile, sculpted surfaces and a purposeful stance give the T1 a strong road presence.",
        disclaimer:
          "Colours shown are for visual reference. Local availability may vary.",
        defaultColorIndex: 0,
        colors: [
          {
            name: "Green",
            image:
              "/images/vehicles/t1/discover/exterior/colors/green.webp",
            swatch: "#435f58",
          },
          {
            name: "Sand",
            image:
              "/images/vehicles/t1/discover/exterior/colors/sand.webp",
            swatch: "#a89c82",
          },
          {
            name: "White",
            image:
              "/images/vehicles/t1/discover/exterior/colors/white.webp",
            swatch: "#e9e8e2",
          },
          {
            name: "Silver",
            image:
              "/images/vehicles/t1/discover/exterior/colors/silver.webp",
            swatch: "#9da2a3",
          },
          {
            name: "Black",
            image:
              "/images/vehicles/t1/discover/exterior/colors/black.webp",
            swatch: "#181b1b",
          },
        ],
      },
      story: {
        id: "t1-exterior-design",
        headingId: "t1-exterior-design-title",
        index: "03 / Exterior Design",
        heading: "Exterior in focus.",
        description:
          "Four perspectives reveal the T1's confident exterior character.",
        images: [
          {
            src: "/images/vehicles/t1/discover/exterior/editorial/desert-drive.webp",
            alt: "Green Jetour T1 driving through a desert landscape",
            subtitle: "Desert Drive",
            objectPosition: "52% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/exterior/editorial/coastal-presence.webp",
            alt: "Silver Jetour T1 presented beside the coast",
            subtitle: "Coastal Presence",
            objectPosition: "47% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/exterior/editorial/strong-profile.webp",
            alt: "Jetour T1 shown in side profile",
            subtitle: "Strong Profile",
            objectPosition: "50% 55%",
          },
          {
            src: "/images/vehicles/t1/discover/exterior/editorial/open-road-character.webp",
            alt: "Jetour T1 driving on an open road",
            subtitle: "Open-Road Character",
            objectPosition: "48% 54%",
          },
        ],
      },
    },
    interior: {
      viewer: {
        id: "t1-interior-experience",
        headingId: "t1-interior-title",
        index: "04 / Interior",
        heading: "Designed around\nevery journey.",
        images: [
          {
            src: "/images/vehicles/t1/discover/interior/editorial/digital-cockpit.webp",
            alt: "Wide view of the Jetour T1 dashboard and front cabin",
            subtitle: "Driver-focused cockpit",
            objectPosition: "50% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/interior/editorial/cabin-comfort.webp",
            alt: "Front cabin and dashboard inside the Jetour T1",
            subtitle: "Comfortable cabin environment",
            objectPosition: "52% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/interior/editorial/interior-space.webp",
            alt: "Cutaway view of the Jetour T1 five-seat cabin",
            subtitle: "Spacious five-seat cabin",
            objectPosition: "50% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/interior/editorial/front-seat-comfort.webp",
            alt: "Jetour T1 front seats viewed beneath the panoramic roof",
            subtitle: "Ventilated front-seat comfort",
            objectPosition: "48% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/interior/editorial/passenger-comfort.webp",
            alt: "Jetour T1 front passenger area viewed through the open door",
            subtitle: "Passenger-seat comfort",
            objectPosition: "50% 50%",
          },
          {
            src: "/images/vehicles/t1/discover/interior/editorial/thoughtful-cabin-detailing.webp",
            alt: "Close view of the Jetour T1 steering wheel, displays and centre console",
            subtitle: "Thoughtful cabin detailing",
            objectPosition: "55% 48%",
          },
        ],
      },
      features: {
        id: "t1-interior-details",
        headingId: "t1-interior-details-title",
        index: "05 / T1 Highlights",
        heading: "Engineered for\nevery journey.",
        note:
          "Equipment shown may vary by local specification and availability.",
        items: [
          {
            title: "Digital Cockpit",
            description:
              "A 15.6-inch central touchscreen and 10.56-inch digital instrument display place essential information within easy reach.",
            image:
              "/images/vehicles/t1/discover/highlights/digital-cockpit.webp",
            imageAlt: "Jetour T1 dashboard with central touchscreen and digital instrument display",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "Body Structure",
            description:
              "A structural view reveals the framework beneath the T1's upright SUV form.",
            image:
              "/images/vehicles/t1/discover/highlights/body-structure.webp",
            imageAlt: "Structural framework of the Jetour T1 body",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "4×4 Confidence",
            description:
              "A 4×4 drivetrain and XWD system support confident travel across varied driving conditions.",
            image:
              "/images/vehicles/t1/discover/highlights/four-wheel-drive.webp",
            imageAlt: "Jetour T1 presented on varied terrain",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "Turbocharged Powertrain",
            description:
              "A 2.0-litre turbocharged four-cylinder GDI engine is paired with an eight-speed automatic transmission.",
            image:
              "/images/vehicles/t1/discover/highlights/turbocharged-powertrain.webp",
            imageAlt: "Jetour T1 turbocharged engine and transmission assembly",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "Five-Seat Practicality",
            description:
              "A five-seat cabin provides practical passenger space for everyday journeys.",
            image:
              "/images/vehicles/t1/discover/highlights/five-seat-space.webp",
            imageAlt: "Cutaway view of the Jetour T1 five-seat cabin",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
        ],
      },
    },
    technology: {
      id: "t1-intelligent-technology",
      headingId: "t1-technology-title",
      index: "06 / Technology",
      slides: [
        {
          heading: "Digital\ncontrol.",
          description:
            "A 15.6-inch central touchscreen and 10.56-inch digital instrument display bring key information, media and vehicle controls together.",
          image:
            "/images/vehicles/t1/discover/interior/editorial/digital-cockpit.webp",
          imageAlt:
            "Wide view of the Jetour T1 dashboard, touchscreen and digital instrument display",
          objectPosition: "42% 50%",
          points: [
            "15.6-inch touchscreen",
            "10.56-inch instrument display",
            "Bluetooth connectivity",
            "Wireless charging",
            "USB-A and USB-C connectivity",
            "Nine-speaker Sony audio",
          ],
        },
        {
          heading: "Assistance\nall around.",
          description:
            "A range of awareness and assistance features supports the driver across everyday journeys.",
          image:
            "/images/vehicles/t1/discover/interior/editorial/thoughtful-cabin-detailing.webp",
          imageAlt:
            "Jetour T1 steering wheel, displays and centre console",
          objectPosition: "44% 50%",
          points: [
            "Forward-collision warning",
            "Lane-departure warning",
            "Lane-keeping assistance",
            "Lane-change assistance",
            "Door-opening warning",
            "Rear traffic alert",
            "Tyre-pressure monitoring",
            "Low-speed emergency braking",
          ],
        },
      ],
    },
    specifications: {
      id: "t1-kuwait-specifications",
      headingId: "t1-specifications-title",
      controlIdPrefix: "t1-specification",
      index: "07 / Kuwait Specifications",
      heading: "T1\nat a glance.",
      intro:
        "Key equipment and dimensions based on the supplied Jetour Kuwait specification material.",
      note:
        "Specifications and equipment are based on the supplied Kuwait-market material and may vary by trim, availability or later distributor updates. Contact Jetour Kuwait for final confirmation.",
      document: {
        eyebrow: "Official Kuwait Brochure",
        label: "View Kuwait Brochure",
        metadata: "PDF · 1.87 MB",
        href: "/documents/t1/t1-kuwait-brochure.pdf",
        ariaLabel:
          "View the official T1 Kuwait brochure PDF in a new tab",
      },
      categories: [
        {
          name: "Powertrain & Drivetrain",
          leadValues: [
            { value: "2.0L", label: "Turbocharged GDI Engine" },
            { value: "4×4", label: "Drivetrain" },
          ],
          details: [
            {
              label: "Engine",
              value: "2.0L turbocharged four-cylinder GDI",
            },
            { label: "Transmission", value: "8-speed automatic" },
            { label: "Drivetrain", value: "4×4" },
            { label: "Fuel tank", value: "70 L" },
            {
              label: "XWD system",
              value: "Listed on Kuwait specification sheet",
            },
          ],
        },
        {
          name: "Dimensions & Capacity",
          leadValues: [
            { value: "4705 mm", label: "Length" },
            { value: "2800 mm", label: "Wheelbase" },
          ],
          details: [
            {
              label: "Length × Width × Height",
              value: "4705 × 1967 × 1843 mm",
            },
            { label: "Wheelbase", value: "2800 mm" },
            { label: "Seating capacity", value: "5" },
            { label: "Wheel and tyre size", value: "235/60 R19" },
          ],
        },
        {
          name: "Interior & Connectivity",
          leadValues: [
            { value: "15.6 inches", label: "Central Touchscreen" },
            { value: "10.56 inches", label: "Instrument Display" },
          ],
          details: [
            { label: "Central touchscreen", value: "15.6 inches" },
            { label: "Instrument display", value: "10.56 inches" },
            { label: "Climate control", value: "Dual-zone" },
            { label: "Mobile connection", value: "Bluetooth" },
            {
              label: "USB connectivity",
              value: "2 × USB-A and 2 × USB-C",
            },
            { label: "Wireless charger", value: "Available" },
            { label: "Audio system", value: "9-speaker Sony system" },
            { label: "Front-seat ventilation", value: "Available" },
            { label: "Passenger-seat leg rest", value: "Electric" },
          ],
        },
        {
          name: "Safety & Driver Support",
          leadValues: [
            { value: "6", label: "Airbags" },
            { value: "TPMS", label: "Tyre-Pressure Monitoring" },
          ],
          details: [
            { label: "Airbags", value: "6" },
            { label: "Tyre-pressure monitoring", value: "Available" },
            { label: "Anti-lock braking", value: "ABS" },
            { label: "Brake-force distribution", value: "EBD" },
            {
              label: "Parking brake",
              value: "Electronic parking brake with Auto Hold",
            },
            { label: "Forward-collision warning", value: "Available" },
            { label: "Lane-departure warning", value: "Available" },
            { label: "Lane-keeping assistance", value: "Available" },
            { label: "Lane-change assistance", value: "Available" },
            { label: "Door-opening warning", value: "Available" },
            { label: "Rear traffic alert", value: "Available" },
            {
              label: "Low-speed emergency braking",
              value: "Available",
            },
            {
              label: "Wading radar",
              value: "Listed on Kuwait specification sheet",
            },
          ],
        },
      ],
    },
    finalCta: {
      id: "t1-final-cta",
      headingId: "t1-final-cta-title",
      eyebrow: "08 / Take the Next Step",
      heading: "Ready for\nwhat’s next?",
      description:
        "Experience the T1 in person and discover how its confident design, five-seat cabin and 4×4 drivetrain fit your everyday journeys.",
      image:
        "/images/vehicles/t1/discover/exterior/editorial/open-road-character.webp",
      imageAlt: "Green Jetour T1 beside an open road and lake",
      contentPosition: "right",
      objectPositionDesktop: "50% 50%",
      objectPositionMobile: "48% 50%",
    },
  },
  {
    slug: "t2",
    name: "T2",
    metadataDescription:
      "Discover the Jetour T2 Luxury 2026 for Kuwait, with a 2.0-litre turbocharged four-cylinder GDI engine, 254 hp, 4×4 and a seven-speed dual-clutch transmission.",
    sectionOrder: [
      "hero",
      "overview",
      "exteriorStudio",
      "exteriorDesign",
      "interiorViewer",
      "interiorDetails",
      "specifications",
    ],
    hero: {
      id: "t2-discover-hero",
      headingId: "t2-discover-title",
      eyebrow: "Jetour T2",
      supportingLine: "Confidence for every journey",
      image:
        "/images/vehicles/t2/discover/hero/t2-hero-poster.webp",
      imageAlt: "Jetour T2 driving through a desert landscape",
      objectPosition: "52% 50%",
      primaryAction: "discover",
      highlightTone: "bronze-values",
      mediaPresentation: "letterboxed-cinematic",
      video: {
        src: "/images/vehicles/t2/discover/hero/t2-hero.mp4",
        poster:
          "/images/vehicles/t2/discover/hero/t2-hero-poster.webp",
      },
      highlights: [
        { value: "2.0L", label: "Turbo GDI" },
        { value: "254 hp", label: "Power" },
        { value: "4×4", label: "Drivetrain" },
        { value: "7-Speed", label: "DCT" },
      ],
    },
    overview: {
      id: "overview",
      headingId: "t2-overview-title",
      index: "01 / T2",
      heading: "Designed for the journey ahead.",
      headingLines: ["Designed for", "The journey", "Ahead."],
      description:
        "The T2 pairs a 2.0-litre turbocharged four-cylinder GDI engine with a seven-speed dual-clutch transmission and 4×4 drivetrain in a confident five-seat SUV.",
      image: "/images/vehicles/t2/t2-hero.png",
      imageAlt: "Cyan Jetour T2 five-seat SUV",
      imagePresentation: "vehicle-cutout",
      imageObjectPosition: "68% 54%",
      facts: [
        { value: "254 hp", label: "Power" },
        { value: "4×4", label: "Drivetrain" },
        { value: "7-Speed DCT", label: "Transmission" },
      ],
    },
    exterior: {
      studio: {
        id: "t2-exterior-studio",
        headingId: "t2-exterior-title",
        index: "02 / Exterior",
        heading: "A presence that stands apart.",
        description:
          "Bold proportions, sculpted surfaces and an upright silhouette give the T2 a confident exterior character.",
        disclaimer:
          "Colours shown are for visual reference. Local availability may vary.",
        defaultColorIndex: 1,
        colors: [
          {
            name: "Black",
            image:
              "/images/vehicles/t2/discover/exterior/colors/black.webp",
            swatch: "#17191a",
          },
          {
            name: "Cyan",
            image:
              "/images/vehicles/t2/discover/exterior/colors/cyan.webp",
            swatch: "#718c9f",
          },
          {
            name: "Sand",
            image:
              "/images/vehicles/t2/discover/exterior/colors/sand.webp",
            swatch: "#c8b08c",
          },
          {
            name: "Silver",
            image:
              "/images/vehicles/t2/discover/exterior/colors/silver.webp",
            swatch: "#aeb3b4",
          },
        ],
      },
      story: {
        id: "t2-exterior-design",
        headingId: "t2-exterior-design-title",
        index: "03 / Exterior Design",
        heading: "Shaped with purpose.",
        description:
          "Four visual studies explore the T2's exterior form and character.",
        images: [
          {
            src:
              "/images/vehicles/t2/discover/exterior/editorial/rugged-profile.webp",
            alt: "Jetour T2 shown from the rear three-quarter angle",
            subtitle: "Rugged Profile",
            description:
              "Defined surfaces and a confident stance give the T2 a purposeful character.",
            objectPosition: "48% 54%",
          },
          {
            src:
              "/images/vehicles/t2/discover/exterior/editorial/open-road-presence.webp",
            alt: "Jetour T2 presented in an open mountain landscape",
            subtitle: "Open-Road Presence",
            description:
              "A strong front profile and upright proportions create a distinctive road presence.",
            objectPosition: "46% 58%",
          },
          {
            src:
              "/images/vehicles/t2/discover/exterior/editorial/water-crossing.webp",
            alt: "Jetour T2 photographed in a mountain stream",
            subtitle: "Dynamic Character",
            description:
              "A bold silhouette remains visually composed across changing surroundings.",
            objectPosition: "68% 58%",
          },
          {
            src:
              "/images/vehicles/t2/discover/exterior/editorial/structural-form.webp",
            alt: "Transparent visual study of the Jetour T2 exterior form",
            subtitle: "Structural Form",
            description:
              "A transparent visual study reveals the form and packaging beneath the exterior design.",
            objectPosition: "42% 48%",
            mediaScale: 1.22,
          },
        ],
      },
    },
    interior: {
      viewer: {
        id: "t2-interior-experience",
        headingId: "t2-interior-title",
        index: "04 / Interior",
        heading: "Designed around\nthe driver.",
        note:
          "Interior colours shown are for visual reference. Local availability may vary.",
        images: [
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/black-cabin-panorama.webp",
            alt: "Panoramic black cabin presentation inside the Jetour T2",
            subtitle: "Black Cabin Panorama",
            description:
              "A dark cabin presentation highlights the T2’s upright layout and interior contrast.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/black-cabin-detail.webp",
            alt: "Closer view of the black Jetour T2 cabin and seating",
            subtitle: "Black Cabin Detail",
            description:
              "A closer view reveals the seating design, centre console and cabin detailing.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/warm-cabin-panorama.webp",
            alt: "Panoramic warm cabin presentation inside the Jetour T2",
            subtitle: "Warm Cabin Panorama",
            description:
              "A warm-toned cabin presentation gives the T2 interior a distinct visual character.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/warm-cabin-detail.webp",
            alt: "Closer view of the warm Jetour T2 cabin and seating",
            subtitle: "Warm Cabin Detail",
            description:
              "A closer perspective highlights the seating surfaces and cockpit arrangement.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/green-cabin-panorama.webp",
            alt: "Panoramic green cabin presentation inside the Jetour T2",
            subtitle: "Green Cabin Panorama",
            description:
              "A green cabin presentation provides another visual expression of the T2 interior.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/green-cabin-detail.webp",
            alt: "Closer view of the green Jetour T2 cabin and seating",
            subtitle: "Green Cabin Detail",
            description:
              "A detailed cabin view focuses on the seating design and centre-console layout.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/flexible-seating-layout.webp",
            alt: "Top-down five-seat layout study of the Jetour T2 cabin",
            subtitle: "Flexible Seating Layout",
            description:
              "A five-seat layout study shows the relationship between passenger space and the surrounding cabin.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/centre-console-detail.webp",
            alt: "Close-up view of the Jetour T2 centre-console controls and selector",
            subtitle: "Centre Console Detail",
            description:
              "A close-up view focuses on the centre-console controls and selector design.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/cargo-storage-practicality.webp",
            alt: "Overhead Jetour T2 passenger and cargo storage study",
            subtitle: "Cargo & Storage Practicality",
            description:
              "An overhead view illustrates how passenger and storage areas can support everyday journeys.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/driver-controls.webp",
            alt: "Jetour T2 steering wheel, driver display and primary controls",
            subtitle: "Driver Controls",
            description:
              "A focused view highlights the steering wheel, driver display and primary controls.",
            objectPosition: "50% 50%",
          },
          {
            src:
              "/images/vehicles/t2/discover/interior/editorial/driver-focused-cockpit.webp",
            alt: "Symmetrical dashboard and cockpit view inside the Jetour T2",
            subtitle: "Driver-Focused Cockpit",
            description:
              "A symmetrical dashboard view brings the central display, instrument panel and cockpit controls together.",
            objectPosition: "50% 50%",
          },
        ],
      },
      features: {
        id: "t2-highlights",
        headingId: "t2-highlights-title",
        index: "05 / T2 Highlights",
        heading: "Details with\na purpose.",
        note:
          "Equipment shown is based on the supplied T2 Luxury 2026 material and may vary by availability or later distributor updates.",
        items: [
          {
            title: "Driver Controls",
            description:
              "A clearly arranged steering wheel and driver display place essential information and controls within easy reach.",
            image:
              "/images/vehicles/t2/discover/interior/editorial/driver-controls.webp",
            imageAlt:
              "Jetour T2 steering wheel, driver display and dashboard controls",
            objectPosition: "50% 50%",
          },
          {
            title: "Five-Seat Layout",
            description:
              "A five-seat cabin provides practical passenger space for everyday journeys.",
            image:
              "/images/vehicles/t2/discover/interior/editorial/flexible-seating-layout.webp",
            imageAlt: "Top-down cutaway view of the Jetour T2 five-seat cabin",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "Centre Console Detail",
            description:
              "A sculpted centre-console detail creates a distinctive visual focal point within the cockpit.",
            image:
              "/images/vehicles/t2/discover/interior/editorial/centre-console-detail.webp",
            imageAlt: "Close view of the Jetour T2 centre console",
            objectPosition: "50% 50%",
          },
          {
            title: "Storage Practicality",
            description:
              "A trunk storage box supports practical organization for everyday use.",
            image:
              "/images/vehicles/t2/discover/interior/editorial/cargo-storage-practicality.webp",
            imageAlt:
              "Jetour T2 cabin cutaway showing an organized trunk storage box",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
          {
            title: "Eight Airbags",
            description:
              "Eight airbags are listed as part of the supplied T2 Luxury 2026 Kuwait specification.",
            image:
              "/images/vehicles/t2/discover/highlights/eight-airbags.webp",
            imageAlt:
              "Jetour T2 cabin illustration showing eight deployed airbags",
            objectPosition: "50% 50%",
            imageFit: "contain",
          },
        ],
      },
    },
    specifications: {
      id: "t2-kuwait-specifications",
      headingId: "t2-specifications-title",
      controlIdPrefix: "t2-specification",
      index: "06 / Kuwait Specifications",
      heading: "T2 Luxury\nat a glance.",
      intro:
        "Key specifications and equipment based on the supplied T2 Luxury 2026 Kuwait material.",
      note:
        "Specifications and equipment are based on the supplied T2 Luxury 2026 Kuwait material and may vary by availability or later distributor updates. Contact Jetour Kuwait for final confirmation.",
      document: {
        eyebrow: "Official Kuwait Specification",
        label: "View Kuwait Specification",
        metadata: "PDF · 451 KB",
        href: "/documents/t2/t2-kuwait-luxury-2026.pdf",
        ariaLabel:
          "Open the T2 Luxury 2026 Kuwait specification PDF in a new tab",
      },
      categories: [
        {
          name: "Powertrain & Drivetrain",
          leadValues: [
            { value: "254 hp", label: "Power" },
            { value: "4×4", label: "Drivetrain" },
          ],
          details: [
            {
              label: "Engine",
              value: "2.0L Turbocharged 4-Cylinder GDI",
            },
            { label: "Power", value: "254 hp" },
            {
              label: "Transmission",
              value: "7-Speed Dual-Clutch Transmission",
            },
            { label: "Drivetrain", value: "4×4" },
            { label: "Fuel Tank", value: "70 L" },
          ],
        },
        {
          name: "Wheels & Practicality",
          leadValues: [
            { value: "5", label: "Seating Capacity" },
            { value: "20-inch", label: "Alloy Wheels" },
          ],
          details: [
            { label: "Seating Capacity", value: "5" },
            { label: "Alloy Wheels", value: "20 inches" },
            { label: "Tyre Size", value: "255/55 R20" },
            { label: "Trunk Storage Box", value: "Available" },
            { label: "Luggage Rack", value: "Available" },
          ],
        },
        {
          name: "Interior & Connectivity",
          leadValues: [
            { value: "15.6-inch", label: "Central Touchscreen" },
            { value: "12-speaker", label: "Sony Audio System" },
          ],
          details: [
            {
              label: "Central Touchscreen",
              value: "15.6-inch HD Display",
            },
            {
              label: "Instrument Display",
              value: "10.25-inch LCD",
            },
            { label: "Panoramic Sunroof", value: "Available" },
            { label: "Wireless Phone Charging", value: "Available" },
            { label: "Audio System", value: "12-Speaker Sony System" },
            { label: "Front-Seat Ventilation", value: "Available" },
            {
              label: "USB Connectivity",
              value: "USB and Type-C Connections",
            },
            { label: "Smart Keys", value: "2" },
          ],
        },
        {
          name: "Safety & Convenience",
          leadValues: [
            { value: "8", label: "Airbags" },
            { value: "ABS", label: "Anti-Lock Braking" },
          ],
          details: [
            { label: "Airbags", value: "8" },
            {
              label: "Tyre-Pressure Monitoring",
              value: "Available",
            },
            { label: "Anti-Lock Braking", value: "ABS" },
            { label: "Parking Assistance", value: "Auto Hold" },
            { label: "Child Lock", value: "Manual" },
            { label: "Front Fog Lights", value: "Available" },
            { label: "Tail Lights", value: "LED" },
            { label: "Power Windows", value: "Front and Rear" },
          ],
        },
      ],
    },
  },
  {
    slug: "g700",
    name: "G700",
    metadataDescription:
      "Discover the Jetour G700 plug-in hybrid for Kuwait, with 904 PS combined system power, 4WD and dual electric motors.",
    sectionOrder: [
      "hero",
      "overview",
      "exteriorStudio",
      "exteriorDesign",
      "interiorViewer",
      "interiorDetails",
      "technology",
      "specifications",
      "finalCta",
    ],
    hero: {
      id: "g700-discover-hero",
      headingId: "g700-discover-title",
      eyebrow: "Jetour G700",
      supportingLine: "Plug-in Hybrid Power",
      image: "/images/vehicles/g700/discover/hero.webp",
      imageAlt: "Blue Jetour G700 driving across a rugged desert landscape",
      objectPosition: "58% 50%",
      highlights: [
        { value: "904 PS", label: "Combined System Power" },
        { value: "4WD", label: "Intelligent Four-Wheel Drive" },
        { value: "230 mm", label: "Minimum Ground Clearance" },
        { value: "34.13 kWh", label: "Battery Capacity" },
      ],
    },
    overview: {
      id: "overview",
      headingId: "g700-overview-title",
      index: "01 / G700",
      heading: "Power for the unexpected.",
      description:
        "The G700 brings together a 2.0-litre turbocharged four-cylinder engine, dual electric motors and a two-speed DHT in a plug-in hybrid system with 4WD.",
      image: "/images/vehicles/g700/discover/overview-vehicle.webp",
      imageAlt: "Blue Jetour G700 plug-in hybrid exterior",
      video: {
        src: "/images/vehicles/g700/discover/video/g700-overview.mp4",
        poster:
          "/images/vehicles/g700/discover/video/g700-overview-poster.webp",
      },
      facts: [
        { value: "2.0L", label: "Turbocharged Engine" },
        { value: "Dual", label: "Electric Motors" },
        { value: "2-speed", label: "DHT" },
      ],
    },
    exterior: {
      studio: {
        id: "exterior-studio",
        headingId: "g700-exterior-title",
        index: "03 / Exterior",
        heading: "Commanding from every angle.",
        description:
          "A bold, upright profile and carefully resolved exterior details give the G700 a distinctive presence.",
        disclaimer:
          "Colours shown are for visual reference. Local availability may vary.",
        defaultColorIndex: 1,
        colors: [
        {
          name: "Black",
          image: "/images/vehicles/g700/discover/exterior/colors/black.webp",
          swatch: "#17191a",
        },
        {
          name: "Blue",
          image: "/images/vehicles/g700/discover/exterior/colors/blue.webp",
          swatch: "#365a76",
        },
        {
          name: "Brown",
          image: "/images/vehicles/g700/discover/exterior/colors/brown.webp",
          swatch: "#74513e",
        },
        {
          name: "Orange",
          image: "/images/vehicles/g700/discover/exterior/colors/orange.webp",
          swatch: "#bd612c",
        },
        {
          name: "Snow Silver",
          image:
            "/images/vehicles/g700/discover/exterior/colors/silver-snow.webp",
          swatch: "#d3d5d3",
        },
        {
          name: "Silver",
          image: "/images/vehicles/g700/discover/exterior/colors/silver.webp",
          swatch: "#858b8d",
        },
        {
          name: "White",
          image: "/images/vehicles/g700/discover/exterior/colors/white.webp",
          swatch: "#edeae3",
        },
        ],
      },
      story: {
        id: "exterior-design",
        headingId: "g700-exterior-story-title",
        index: "04 / Exterior Design",
        heading: "Designed with presence.",
        description:
          "An upright silhouette, strong front graphic and carefully resolved exterior details create a composed view from every angle.",
        images: [
          {
            src: "/images/vehicles/g700/discover/hero.webp",
            alt: "Blue Jetour G700 moving through a desert landscape",
            subtitle: "A commanding exterior profile",
            objectPosition: "56% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/exterior/exterior-presence.webp",
            alt: "Blue Jetour G700 shown in side profile at sunset",
            subtitle: "A composed view from every angle",
            objectPosition: "60% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/exterior/front-detail.webp",
            alt: "Front grille and lighting detail of the Jetour G700",
            subtitle: "Distinctive front design",
            objectPosition: "48% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/exterior/low-angle-action.webp",
            alt: "Blue Jetour G700 viewed from a low angle in the desert",
            subtitle: "Built around a bold silhouette",
            objectPosition: "56% 50%",
          },
        ],
      },
    },
    interior: {
      viewer: {
        id: "interior-experience",
        headingId: "g700-interior-title",
        index: "05 / Interior",
        heading: "Interior experience.",
        images: [
          {
            src: "/images/vehicles/g700/discover/interior/editorial/interior-1.webp",
            alt: "Wide view across the Jetour G700 cabin",
            subtitle: "Wide cabin view",
            objectPosition: "51% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/interior/editorial/interior-2.webp",
            alt: "Driver-focused view inside the Jetour G700",
            subtitle: "Driver-focused cockpit",
            objectPosition: "60% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/interior/editorial/interior-3.webp",
            alt: "Jetour G700 seating and centre console",
            subtitle: "Premium seating",
            objectPosition: "52% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/interior/editorial/interior-4.webp",
            alt: "Full dashboard view inside the Jetour G700",
            subtitle: "Full dashboard view",
            objectPosition: "50% 50%",
          },
          {
            src: "/images/vehicles/g700/discover/interior/editorial/interior-5.webp",
            alt: "Rear cabin view looking toward the Jetour G700 dashboard",
            subtitle: "Rear cabin view",
            objectPosition: "50% 50%",
          },
        ],
      },
      features: {
        id: "interior-details",
        headingId: "g700-interior-details-title",
        index: "06 / Interior Details",
        heading: "Interior details.",
        items: [
          {
            title: "Digital Cockpit",
            description:
              "A modern cabin centred around a 15.6-inch touchscreen and integrated digital controls.",
            image:
              "/images/vehicles/g700/discover/interior/editorial/interior-4.webp",
            imageAlt: "Full dashboard and digital cockpit inside the Jetour G700",
            objectPosition: "50% 50%",
          },
          {
            title: "Seamless Connectivity",
            description:
              "Apple CarPlay, Android Auto and conveniently positioned USB-A and USB-C connections.",
            image:
              "/images/vehicles/g700/discover/interior/features/seamless-connectivity.webp",
            imageAlt: "Jetour G700 cabin viewed from the rear seating area",
            objectPosition: "50% 50%",
          },
          {
            title: "Cabin Comfort",
            description:
              "Automatic climate control supports a comfortable and considered cabin environment.",
            image:
              "/images/vehicles/g700/discover/interior/editorial/interior-2.webp",
            imageAlt: "Driver seated inside the Jetour G700 cabin",
            objectPosition: "60% 50%",
          },
          {
            title: "Interior Space",
            description:
              "A spacious cabin designed around passenger comfort and everyday versatility.",
            image:
              "/images/vehicles/g700/discover/interior/editorial/interior-3.webp",
            imageAlt: "Jetour G700 front and rear seating layout",
            objectPosition: "52% 50%",
          },
          {
            title: "Immersive Audio Experience",
            description:
              "Integrated cabin audio creates a more engaging experience for every journey.",
            image:
              "/images/vehicles/g700/discover/interior/features/immersive-audio.webp",
            imageAlt: "Lexicon speaker detail inside the Jetour G700",
            objectPosition: "50% 50%",
          },
        ],
      },
    },
    technology: {
      id: "intelligent-technology",
      headingId: "g700-technology-title",
      index: "07 / Intelligent Technology",
      slides: [
        {
          heading: "Digital\ncockpit.",
          description:
            "A 15.6-inch central touchscreen brings vehicle controls and connected features together in one focused interface.",
          image:
            "/images/vehicles/g700/discover/technology/digital-cockpit.webp",
          imageAlt: "Wide dashboard and central touchscreen inside the Jetour G700",
          objectPosition: "42% 50%",
          points: [
            "15.6-inch central touchscreen",
            "Apple CarPlay",
            "Android Auto",
            "USB-A and USB-C connections",
          ],
        },
        {
          heading: "Assistance\nall around.",
          description:
            "Camera and driver-assistance systems support awareness, manoeuvring and everyday confidence.",
          image:
            "/images/vehicles/g700/discover/technology/driver-assistance.webp",
          imageAlt:
            "Overhead view of a Jetour G700 with surrounding detection graphics",
          objectPosition: "40% 50%",
          points: [
            "360° surround-view monitor",
            "Automatic Parking Assist",
            "Level 2 driver assistance",
            "Blind Spot Detection",
          ],
        },
      ],
    },
    specifications: {
      id: "kuwait-specifications",
      headingId: "g700-specifications-title",
      controlIdPrefix: "g700-specification",
      index: "08 / Kuwait Specifications",
      heading: "Engineered\nin detail.",
      note:
        "Specifications shown are based on available Jetour Kuwait materials. Equipment and availability may vary.",
      document: {
        eyebrow: "Official Kuwait Brochure",
        label: "View / Download PDF",
        metadata: "PDF · 2 Pages",
        href: "/documents/g700/g700-kuwait-brochure.pdf",
        ariaLabel:
          "View or download the official G700 Kuwait brochure PDF in a new tab",
      },
      categories: [
        {
          name: "Powertrain & Hybrid",
          leadValues: [
            { value: "904 PS", label: "Combined System Power" },
            { value: "34.13 kWh", label: "Battery Capacity" },
          ],
          details: [
            { label: "Powertrain", value: "Plug-in Hybrid" },
            {
              label: "Engine",
              value: "2.0L Turbocharged 4-Cylinder",
            },
            { label: "Electric Motors", value: "Dual" },
            { label: "Drivetrain", value: "4WD" },
            { label: "Transmission", value: "2-Speed DHT" },
            { label: "Fuel Tank", value: "100 L" },
          ],
        },
        {
          name: "Vehicle & Ownership",
          leadValues: [
            { value: "230 mm", label: "Minimum Ground Clearance" },
            {
              value: "8 Years / 160,000 km",
              label: "Battery Warranty",
              displayLines: ["8 Years /", "160,000 km"],
              typography: "battery-warranty",
            },
          ],
          details: [
            { label: "Vehicle Width", value: "2050 mm" },
            { label: "Number of Doors", value: "5" },
            { label: "Fuel Tank", value: "100 L" },
            { label: "Battery Capacity", value: "34.13 kWh" },
            { label: "Minimum Ground Clearance", value: "230 mm" },
            { label: "Battery Warranty", value: "8 Years or 160,000 km" },
          ],
        },
        {
          name: "Safety & Assistance",
          leadValues: [
            { value: "360°", label: "Surround-View Monitor" },
            { value: "Level 2", label: "Driver Assistance" },
          ],
          details: [
            { label: "Anti-lock Braking System", value: "ABS" },
            { label: "Electronic Stability Control", value: "ESC" },
            { label: "Active Emergency Braking", value: "AEB" },
            { label: "Adaptive Cruise Control" },
            { label: "Intelligent Cruise Assist", value: "ICA" },
            { label: "Blind Spot Detection", value: "BSD" },
            { label: "Lane Change Assist", value: "LCA" },
            { label: "Lane Keeping Assist", value: "LKA" },
            { label: "Rear Collision Warning", value: "RCW" },
            { label: "Door Opening Warning", value: "DOW" },
          ],
        },
        {
          name: "Interior & Connectivity",
          leadValues: [
            { value: "15.6-inch", label: "Central Touchscreen" },
            {
              value: "Apple CarPlay and Android Auto",
              label: "Smartphone Integration",
              displayLines: ["Apple CarPlay", "and Android Auto"],
              typography: "smartphone-integration",
            },
          ],
          details: [
            { label: "Climate Control", value: "Automatic" },
            {
              label: "Connectivity",
              value: "Apple CarPlay and Android Auto",
            },
            { label: "Ports", value: "USB-A and USB-C" },
            { label: "Starting System", value: "Keyless Start" },
            { label: "Roof", value: "Panoramic Sunroof" },
            { label: "Seat Material", value: "Faux Leather" },
            { label: "Rear Seating", value: "Second Row Folds Flat" },
            {
              label: "Steering Wheel",
              value: "Manual 4-Way Adjustment",
            },
          ],
        },
      ],
    },
    finalCta: {
      id: "g700-final-cta",
      headingId: "g700-final-cta-title",
      eyebrow: "Experience G700",
      heading: "Ready for\nwhat’s next?",
      description:
        "Experience the G700 in person and discover its presence, technology and comfort from behind the wheel.",
      image:
        "/images/vehicles/g700/discover/exterior/low-angle-action.webp",
      imageAlt: "Blue Jetour G700 driving through a desert landscape",
      objectPositionDesktop: "56% 50%",
      objectPositionMobile: "61% 50%",
    },
  },
];

export function getModelDiscoverData(slug: string) {
  return discoverModels.find((model) => model.slug === slug);
}

export function getModelDiscoverSectionIds(model: ModelDiscoverData) {
  const sections: Partial<
    Record<ModelDiscoverSectionKey, ModelDiscoverSectionIdentity>
  > = {
    hero: model.hero,
    overview: model.overview,
    exteriorStudio: model.exterior?.studio,
    exteriorDesign: model.exterior?.story,
    interiorViewer: model.interior?.viewer,
    interiorDetails: model.interior?.features,
    technology: model.technology,
    specifications: model.specifications,
    finalCta: model.finalCta,
  };

  return model.sectionOrder.flatMap((section) => {
    const id = sections[section]?.id;
    return id ? [id] : [];
  });
}
