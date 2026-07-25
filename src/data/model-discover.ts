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
  },
];

export function getModelDiscoverData(slug: string) {
  return discoverModels.find((model) => model.slug === slug);
}
