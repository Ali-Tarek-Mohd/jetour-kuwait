const DISCOVER_PRELOAD_MARGIN = "75% 0px";

export function observeDiscoverMediaProximity(
  target: Element | null,
  preload: () => void,
) {
  let started = false;

  const start = () => {
    if (started) {
      return;
    }

    started = true;
    preload();
  };

  if (!target || typeof IntersectionObserver === "undefined") {
    start();
    return () => undefined;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        return;
      }

      observer.disconnect();
      start();
    },
    {
      rootMargin: DISCOVER_PRELOAD_MARGIN,
      threshold: 0,
    },
  );

  observer.observe(target);
  return () => observer.disconnect();
}
