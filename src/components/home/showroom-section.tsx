import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { HugeiconsIcon } from "@hugeicons/react";
import styles from "./showroom-section.module.css";

const directionsUrl =
  "https://www.google.com/maps/place/Jetour+Kuwait/@29.3063268,47.9199692,15z/data=!4m6!3m5!1s0x3fcf9b8fbf27a041:0xba587fe373b21501!8m2!3d29.3067567!4d47.9274588!16s%2Fg%2F11smvgpfh6?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D";

const mapEmbedUrl =
  "https://www.google.com/maps?q=29.3067567,47.9274588&z=15&output=embed";

export function ShowroomSection() {
  return (
    <section
      id="showrooms"
      data-header-theme="dark"
      className={styles.section}
      aria-labelledby="showroom-title"
    >
      <div className={styles.information}>
        <div className={styles.informationInner}>
          <p className={styles.eyebrow}>Visit Jetour Kuwait</p>
          <h2 id="showroom-title">
            Find your way
            <br />
            to Jetour.
          </h2>
          <p className={styles.introduction}>
            Visit Jetour Kuwait in Al Rai and explore the current Jetour range
            in person.
          </p>

          <div className={styles.location}>
            <p className={styles.locationLabel}>Al Rai Showroom</p>
            <p className={styles.showroomName}>
              Jetour Kuwait <span aria-hidden="true">—</span> Budastoor Motors
            </p>
            <address>
              Street Mohammad Bin Al Qasim
              <br />
              Al Rai, Kuwait
            </address>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.directions}
          >
            <span>Get Directions</span>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={18}
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      <div className={styles.mapPanel}>
        <div className={styles.mapBlend} aria-hidden="true" />
        <iframe
          src={mapEmbedUrl}
          title="Jetour Kuwait showroom location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.map}
          allowFullScreen
        />
      </div>
    </section>
  );
}
