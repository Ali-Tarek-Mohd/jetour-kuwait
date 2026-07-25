export type ModelDiscoverHighlight = {
  value: string;
  label: string;
};

export type ModelDiscoverFact = {
  value: string;
  label: string;
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
  objectPosition: string;
};

export type ModelDiscoverInteriorFeature = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
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

export type ModelDiscoverData = {
  slug: string;
  name: string;
  metadataDescription: string;
  hero: {
    eyebrow: string;
    supportingLine: string;
    image: string;
    imageAlt: string;
    objectPosition: string;
    highlights: ModelDiscoverHighlight[];
  };
  overview: {
    index: string;
    heading: string;
    description: string;
    image: string;
    imageAlt: string;
    facts: ModelDiscoverFact[];
  };
  exterior: {
    index: string;
    heading: string;
    description: string;
    disclaimer: string;
    defaultColorIndex: number;
    colors: ModelDiscoverColor[];
    story: {
      index: string;
      heading: string;
      description: string;
      images: ModelDiscoverStoryImage[];
    };
  };
  interior: {
    viewer: {
      index: string;
      heading: string;
      images: ModelDiscoverStoryImage[];
    };
    features: {
      index: string;
      heading: string;
      items: ModelDiscoverInteriorFeature[];
    };
  };
  technology: {
    index: string;
    slides: ModelDiscoverTechnologySlide[];
  };
  specifications: {
    index: string;
    heading: string;
    note: string;
    categories: ModelDiscoverSpecificationCategory[];
  };
};

const discoverModels: ModelDiscoverData[] = [
  {
    slug: "g700",
    name: "G700",
    metadataDescription:
      "Discover the Jetour G700 plug-in hybrid for Kuwait, with 904 PS combined system power, 4WD and dual electric motors.",
    hero: {
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
      index: "01 / G700",
      heading: "Power for the unexpected.",
      description:
        "The G700 brings together a 2.0-litre turbocharged four-cylinder engine, dual electric motors and a two-speed DHT in a plug-in hybrid system with 4WD.",
      image: "/images/vehicles/g700/discover/overview-vehicle.webp",
      imageAlt: "Blue Jetour G700 plug-in hybrid exterior",
      facts: [
        { value: "2.0L", label: "Turbocharged Engine" },
        { value: "Dual", label: "Electric Motors" },
        { value: "2-speed", label: "DHT" },
      ],
    },
    exterior: {
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
      story: {
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
      index: "08 / Kuwait Specifications",
      heading: "Engineered\nin detail.",
      note:
        "Specifications shown are based on available Jetour Kuwait materials. Equipment and availability may vary.",
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
            { value: "8 Years / 160,000 km", label: "Battery Warranty" },
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
  },
];

export function getModelDiscoverData(slug: string) {
  return discoverModels.find((model) => model.slug === slug);
}
