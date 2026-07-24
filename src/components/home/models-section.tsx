import { Container } from "@/components/ui/container";
import { JetourButton } from "@/components/ui/jetour-button";
import { modelCatalogue } from "@/data/model-catalogue";
import { getHomeModel } from "./home-model-data";
import { ModelRangeShowcase } from "./model-range-showcase";
import { VehicleColorPicker } from "./vehicle-color-picker";

export function ModelsSection() {
  const featuredModels = modelCatalogue.map((model) => getHomeModel(model.slug));
  const t2 = modelCatalogue.find((model) => model.slug === "t2");
  if (!t2) throw new Error("T2 catalogue data is required for the homepage studio.");

  return <>
    <ModelRangeShowcase models={featuredModels} />
    <section data-header-theme="dark" className="section-pad bg-jetour-black">
      <div id="t2" className="mt-20 border-y border-white/10 bg-[#0d0e0f] py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-14">
            <div className="lg:pt-8"><p className="eyebrow">Featured vehicle studio</p><h2 className="section-title">T2, in your element</h2><p className="mt-5 max-w-md leading-7 text-white/55">See the T2 in approved finishes, with a studio prepared for each official local paint image.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><JetourButton href="/models/t2" size="large">Explore T2</JetourButton><JetourButton href="/book-test-drive?model=t2" variant="secondary" size="large">Book a Test Drive</JetourButton></div></div>
            <VehicleColorPicker colors={t2.colors} />
          </div>
        </Container>
      </div>
    </section>
  </>;
}
