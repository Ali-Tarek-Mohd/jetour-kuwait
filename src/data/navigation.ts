export const headerNavigationItems = [
  { label: "Showrooms", href: "/#showrooms" },
  { label: "Contact", href: "/#contact" },
] as const;

export type MoreNavigationItem =
  | { label: string; description: string; href: string; disabled?: false }
  | { label: string; description: string; disabled: true; href?: never };

export const moreNavigationItems: MoreNavigationItem[] = [
  { label: "About Us", href: "/#discover", description: "Discover the Jetour approach" },
  { label: "Book a Test Drive", href: "/book-test-drive", description: "Begin your model request" },
  { label: "Book Service", description: "Service booking", disabled: true },
  { label: "Jetour Club Kuwait", description: "Community and ownership", disabled: true },
  { label: "Catalogues", description: "Model publications", disabled: true },
  { label: "Events & News", description: "Latest Jetour updates", disabled: true },
  { label: "Careers", description: "Join the team", disabled: true },
];
