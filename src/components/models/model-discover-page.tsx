import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { ModelDiscoverData } from "@/data/model-discover";
import { ModelDiscoverHero } from "./model-discover-hero";
import { ModelDiscoverOverview } from "./model-discover-overview";
import styles from "./model-discover.module.css";

export function ModelDiscoverPage({ model }: { model: ModelDiscoverData }) {
  return (
    <main className={styles.page}>
      <SiteHeader />
      <ModelDiscoverHero model={model} />
      <ModelDiscoverOverview model={model} />
      <SiteFooter />
    </main>
  );
}
