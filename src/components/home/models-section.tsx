import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { JetourButton } from "@/components/ui/jetour-button";
import { vehicles } from "@/data/vehicles";
import { ModelCard } from "./model-card";
import { VehicleColorPicker } from "./vehicle-color-picker";

export function ModelsSection() {
  const featured = vehicles.find((vehicle) => vehicle.featured)!;
  return <section id="models" className="section-pad bg-jetour-black">
    <Container>
      <SectionHeading eyebrow="Explore the range" title="Our models" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{vehicles.map((vehicle, index) => <ModelCard key={vehicle.slug} vehicle={vehicle} index={index} />)}</div>
    </Container>
    <div id="t2" className="mt-20 border-y border-white/10 bg-[#0d0e0f] py-16 lg:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-14">
          <div className="lg:pt-8"><p className="eyebrow">Featured vehicle studio</p><h2 className="section-title">T2, in your element</h2><p className="mt-5 max-w-md leading-7 text-white/55">See the T2 in approved finishes, with a studio prepared for each official local paint image.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row"><JetourButton href="#t2" size="large">Explore T2</JetourButton><JetourButton href="/book-test-drive" variant="secondary" size="large">Book a Test Drive</JetourButton></div></div>
          <VehicleColorPicker colors={featured.colors} />
        </div>
      </Container>
    </div>
  </section>;
}
