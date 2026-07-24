"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import { NAVIGATION_ACTIVITY_EVENT } from "@/lib/navigation-events";
import styles from "./conversion-gateway-section.module.css";

type HandoffState = "ready" | "aligning" | "gateway" | "released";

const experiences = [
  {
    id: "test-drive",
    index: "01",
    category: "Experience",
    title: "Book a Test Drive",
    description:
      "Choose a Jetour model and schedule your showroom test-drive request.",
    href: "/book-test-drive",
    action: "Book a Test Drive",
    image: "/images/home/conversion/book-test-drive-visual.png",
    imageAlt: "Orange Jetour SUV with a stylized Kuwait skyline",
    tone: "primary",
  },
  {
    id: "service",
    index: "02",
    category: "Ownership",
    title: "Book a Jetour Service",
    description:
      "Start a service enquiry and connect with the team for maintenance support.",
    href: "/#showrooms",
    action: "Contact Service Team",
    image: "/images/home/conversion/book-service-visual.png",
    imageAlt: "Grey Jetour SUV with service and Kuwait skyline illustration",
    tone: "secondary",
  },
] as const;

export function ConversionGatewaySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [serviceHovered, setServiceHovered] = useState(false);
  const [serviceFocused, setServiceFocused] = useState(false);
  const serviceActive = serviceHovered || serviceFocused;

  useEffect(() => {
    let mounted = true;
    let cleanup = () => {};

    void Promise.all([import("gsap"), import("gsap/ScrollToPlugin")]).then(
      ([gsapModule, scrollToModule]) => {
        if (!mounted || !sectionRef.current) return;

        const gsap = gsapModule.gsap;
        gsap.registerPlugin(scrollToModule.ScrollToPlugin);

        let state: HandoffState = "released";
        let navigationActive = false;
        let intent = 0;
        let intentTimer: number | null = null;
        let tween: ReturnType<typeof gsap.to> | null = null;

        const supported = () =>
          window.innerWidth > 1024 &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const positions = () => {
          const films = document.getElementById("jetour-films");
          const gateway = sectionRef.current;
          return {
            filmsTop: films?.offsetTop ?? -1,
            gatewayTop: gateway?.offsetTop ?? -1,
          };
        };

        const clearIntent = () => {
          intent = 0;
          if (intentTimer !== null) {
            window.clearTimeout(intentTimer);
            intentTimer = null;
          }
        };

        const settle = () => {
          const { filmsTop, gatewayTop } = positions();
          if (Math.abs(window.scrollY - gatewayTop) <= 3) state = "gateway";
          else if (Math.abs(window.scrollY - filmsTop) <= 3) state = "ready";
          else state = "released";
        };

        const stopTween = () => {
          if (!tween) return;
          tween.kill();
          tween = null;
          settle();
        };

        const align = () => {
          const gateway = sectionRef.current;
          if (!gateway || state !== "ready") return;

          state = "aligning";
          clearIntent();
          tween = gsap.to(window, {
            scrollTo: {
              y: gateway.offsetTop,
              offsetY: 0,
              autoKill: false,
            },
            duration: 0.7,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              tween = null;
              state = "gateway";
            },
            onInterrupt: () => {
              tween = null;
              settle();
            },
          });
        };

        const onWheel = (event: WheelEvent) => {
          if (
            event.defaultPrevented ||
            event.ctrlKey ||
            navigationActive ||
            !supported() ||
            document.hidden
          ) {
            return;
          }

          if (state === "aligning") {
            event.preventDefault();
            return;
          }

          if (state === "gateway") {
            if (event.deltaY > 0) state = "released";
            return;
          }

          if (state !== "ready") return;

          const { filmsTop } = positions();
          if (
            Math.abs(window.scrollY - filmsTop) > 4 ||
            event.deltaY <= 0 ||
            Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ) {
            clearIntent();
            return;
          }

          event.preventDefault();
          intent += event.deltaY;
          if (intentTimer !== null) window.clearTimeout(intentTimer);
          intentTimer = window.setTimeout(clearIntent, 140);
          if (intent >= 20) align();
        };

        const onScroll = () => {
          if (state === "aligning") return;
          settle();
        };

        const onNavigation = (event: Event) => {
          navigationActive = (
            event as CustomEvent<{ active: boolean }>
          ).detail.active;
          if (navigationActive) {
            clearIntent();
            stopTween();
          }
        };

        const onResize = () => {
          clearIntent();
          if (!supported()) stopTween();
          else settle();
        };

        settle();
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        window.addEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);

        cleanup = () => {
          clearIntent();
          tween?.kill();
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
          window.removeEventListener(NAVIGATION_ACTIVITY_EVENT, onNavigation);
        };
      },
    );

    return () => {
      mounted = false;
      cleanup();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="conversion-gateway"
      data-header-theme="dark"
      className={styles.section}
      aria-labelledby="conversion-gateway-title"
    >
      <div className={styles.ambientLight} aria-hidden="true" />

      <header className={styles.intro}>
        <p className={styles.eyebrow}>Your next journey</p>
        <div className={styles.introCopy}>
          <h2 id="conversion-gateway-title">
            Drive it.
            <br />
            Care for it.
          </h2>
          <p>
            Experience a Jetour on the road or connect with the team for
            ownership support.
          </p>
        </div>
      </header>

      <div
        className={`${styles.experienceGrid} ${
          serviceActive ? styles.serviceActive : ""
        }`}
      >
        {experiences.map((experience) => (
          <article
            key={experience.id}
            className={`${styles.panel} ${
              experience.tone === "primary"
                ? styles.primaryPanel
                : styles.secondaryPanel
            }`}
            onMouseEnter={
              experience.id === "service"
                ? () => setServiceHovered(true)
                : undefined
            }
            onMouseLeave={
              experience.id === "service"
                ? () => setServiceHovered(false)
                : undefined
            }
            onFocus={
              experience.id === "service"
                ? () => setServiceFocused(true)
                : undefined
            }
            onBlur={
              experience.id === "service"
                ? (event) => {
                    if (
                      !(event.relatedTarget instanceof Node) ||
                      !event.currentTarget.contains(event.relatedTarget)
                    ) {
                      setServiceFocused(false);
                    }
                  }
                : undefined
            }
          >
            <div className={styles.panelGlow} aria-hidden="true" />
            <div className={styles.panelCopy}>
              <p className={styles.panelMeta}>
                <span>{experience.index}</span>
                <span className={styles.panelRule} aria-hidden="true" />
                {experience.category}
              </p>
              <h3>{experience.title}</h3>
              <p className={styles.description}>{experience.description}</p>
              {experience.id === "service" ? (
                <p className={styles.availabilityNote}>
                  Online service booking coming soon.
                </p>
              ) : null}
              <Link
                href={experience.href}
                className={`${styles.cta} ${
                  experience.tone === "primary"
                    ? styles.primaryCta
                    : styles.secondaryCta
                }`}
              >
                <span>{experience.action}</span>
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className={styles.artwork}>
              <Image
                src={experience.image}
                alt={experience.imageAlt}
                fill
                sizes={
                  experience.tone === "primary"
                    ? "(min-width: 1025px) 48vw, 92vw"
                    : "(min-width: 1025px) 34vw, 92vw"
                }
                className={styles.vehicleImage}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
