export type ModelDiscoverHighlight = {
  value: string;
  label: string;
};

export type ModelDiscoverFact = {
  value: string;
  label: string;
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
  },
];

export function getModelDiscoverData(slug: string) {
  return discoverModels.find((model) => model.slug === slug);
}
