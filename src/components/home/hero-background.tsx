import { getImageProps } from "next/image";

export type HeroBackgroundSources = {
  desktop: string;
  mobile: string;
  alt?: string;
};

export const t2HeroBackgroundPaths: HeroBackgroundSources = {
  desktop: "/images/hero/t2-desktop.webp",
  mobile: "/images/hero/t2-mobile.webp",
  alt: "",
};

export function HeroBackground({ sources }: { sources?: HeroBackgroundSources }) {
  if (!sources) return null;
  const common = { alt: sources.alt ?? "", fill: true, sizes: "100vw" } as const;
  const desktop = getImageProps({ ...common, src: sources.desktop, quality: 78 });
  const mobile = getImageProps({ ...common, src: sources.mobile, quality: 72 });

  return <picture className="absolute inset-0">
    <source media="(min-width: 768px)" srcSet={desktop.props.srcSet} sizes={desktop.props.sizes} />
    <img {...mobile.props} alt={sources.alt ?? ""} className="h-full w-full object-cover" />
  </picture>;
}
