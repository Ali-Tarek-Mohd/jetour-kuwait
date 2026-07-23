"use client";

import { useEffect, useState } from "react";

export type HeaderTheme = "dark" | "light";

const themedSectionSelector = "[data-header-theme]";

function themeAtHeader(): HeaderTheme {
  const headerHeight = window.innerWidth >= 1280 ? 92 : 70;
  const probeY = Math.min(headerHeight + 1, window.innerHeight - 1);
  const elements = document.elementsFromPoint(window.innerWidth / 2, probeY);

  for (const element of elements) {
    const section = element.closest<HTMLElement>(themedSectionSelector);
    const theme = section?.dataset.headerTheme;
    if (theme === "dark" || theme === "light") return theme;
  }

  return "dark";
}

export function useHeaderTheme() {
  const [theme, setTheme] = useState<HeaderTheme>("dark");

  useEffect(() => {
    let frame = 0;
    const resolveTheme = () => {
      frame = 0;
      const nextTheme = themeAtHeader();
      setTheme((current) => current === nextTheme ? current : nextTheme);
    };
    const scheduleResolve = () => {
      if (!frame) frame = window.requestAnimationFrame(resolveTheme);
    };

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(themedSectionSelector),
    );
    const observer = new IntersectionObserver(scheduleResolve, {
      rootMargin: "-70px 0px 0px 0px",
      threshold: [0, 0.01],
    });
    sections.forEach((section) => observer.observe(section));

    scheduleResolve();
    window.addEventListener("scroll", scheduleResolve, { passive: true });
    window.addEventListener("resize", scheduleResolve);
    window.addEventListener("hashchange", scheduleResolve);
    window.addEventListener("popstate", scheduleResolve);
    window.addEventListener("load", scheduleResolve, { once: true });

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleResolve);
      window.removeEventListener("resize", scheduleResolve);
      window.removeEventListener("hashchange", scheduleResolve);
      window.removeEventListener("popstate", scheduleResolve);
      window.removeEventListener("load", scheduleResolve);
    };
  }, []);

  return theme;
}
