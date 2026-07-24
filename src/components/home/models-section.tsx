import { modelCatalogue } from "@/data/model-catalogue";
import { getHomeModel } from "./home-model-data";
import { CinematicVideoSection } from "./cinematic-video-section";
import { ConversionGatewaySection } from "./conversion-gateway-section";
import { ModelRangeShowcase } from "./model-range-showcase";

export function ModelsSection() {
  const featuredModels = modelCatalogue.map((model) => getHomeModel(model.slug));

  return (
    <>
      <ModelRangeShowcase models={featuredModels} />
      <CinematicVideoSection />
      <ConversionGatewaySection />
    </>
  );
}
