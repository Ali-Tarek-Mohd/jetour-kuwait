import { Fragment } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  getModelDiscoverSectionIds,
  type ModelDiscoverData,
} from "@/data/model-discover";
import { ModelDiscoverExteriorStory } from "./model-discover-exterior-story";
import { ModelDiscoverExteriorStudio } from "./model-discover-exterior-studio";
import { ModelDiscoverFinalCta } from "./model-discover-final-cta";
import { ModelDiscoverHero } from "./model-discover-hero";
import { ModelDiscoverInteriorDetails } from "./model-discover-interior-details";
import { ModelDiscoverInteriorViewer } from "./model-discover-interior-viewer";
import { ModelDiscoverOverview } from "./model-discover-overview";
import { ModelDiscoverSpecifications } from "./model-discover-specifications";
import { ModelDiscoverTechnology } from "./model-discover-technology";
import styles from "./model-discover.module.css";

export function ModelDiscoverPage({ model }: { model: ModelDiscoverData }) {
  const sectionIds = getModelDiscoverSectionIds(model);
  const renderSection = (section: ModelDiscoverData["sectionOrder"][number]) => {
    if (section === "hero") {
      return <ModelDiscoverHero model={model} sectionIds={sectionIds} />;
    }
    if (section === "overview" && model.overview) {
      return <ModelDiscoverOverview overview={model.overview} />;
    }
    if (section === "exteriorStudio" && model.exterior?.studio) {
      return (
        <ModelDiscoverExteriorStudio
          modelName={model.name}
          exterior={model.exterior.studio}
        />
      );
    }
    if (section === "exteriorDesign" && model.exterior?.story) {
      return <ModelDiscoverExteriorStory exterior={model.exterior.story} />;
    }
    if (section === "interiorViewer" && model.interior?.viewer) {
      return <ModelDiscoverInteriorViewer interior={model.interior.viewer} />;
    }
    if (section === "interiorDetails" && model.interior?.features) {
      return (
        <ModelDiscoverInteriorDetails
          modelName={model.name}
          interior={model.interior.features}
        />
      );
    }
    if (section === "technology" && model.technology) {
      return <ModelDiscoverTechnology technology={model.technology} />;
    }
    if (section === "specifications" && model.specifications) {
      return (
        <ModelDiscoverSpecifications
          modelName={model.name}
          specifications={model.specifications}
        />
      );
    }
    if (section === "finalCta" && model.finalCta) {
      return (
        <ModelDiscoverFinalCta
          modelSlug={model.slug}
          finalCta={model.finalCta}
        />
      );
    }
    return null;
  };

  return (
    <main className={styles.page}>
      <SiteHeader />
      {model.sectionOrder.map((section) => (
        <Fragment key={section}>
          {renderSection(section)}
        </Fragment>
      ))}
      <SiteFooter />
    </main>
  );
}
