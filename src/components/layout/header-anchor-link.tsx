"use client";

import type { MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

export function HeaderAnchorLink({
  href,
  className,
  children,
  onNavigate,
}: {
  href: `/#${string}`;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();
    onNavigate?.();

    const hash = href.slice(2);
    const target = document.getElementById(hash);
    if (pathname === "/" && target) {
      window.history.replaceState(null, "", `/#${hash}`);
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    router.replace(href);
  };

  return (
    <a href={href} className={className} onClick={navigate}>
      {children}
    </a>
  );
}
