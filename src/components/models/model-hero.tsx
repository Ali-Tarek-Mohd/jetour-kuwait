import Image from "next/image";
import { Container } from "@/components/ui/container";
import { JetourButton } from "@/components/ui/jetour-button";
import type { VehiclePage } from "@/types/vehicle";

export function ModelHero({ vehicle }: { vehicle: VehiclePage }) {
  return <section className="relative isolate min-h-[760px] overflow-hidden bg-[#090b0d] pt-[76px] lg:min-h-[820px]">
    <div className="jetour-grid absolute inset-0 opacity-30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_44%,rgba(217,176,111,.2),transparent_29%),linear-gradient(90deg,rgba(0,0,0,.96),rgba(0,0,0,.42)_72%,rgba(0,0,0,.8))]" />
    <Container className="relative flex min-h-[684px] flex-col justify-end pb-16 pt-[42%] lg:min-h-[744px] lg:justify-center lg:pb-16 lg:pt-10">
      <div className="relative z-10 max-w-xl"><p className="eyebrow">{vehicle.hero.eyebrow}</p><p className="text-lg font-semibold tracking-[.1em] uppercase">Jetour {vehicle.name}</p><h1 className="mt-3 text-[clamp(3.5rem,7vw,7rem)] leading-[.88] font-semibold tracking-[-.06em] uppercase">{vehicle.hero.title}</h1><p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base">{vehicle.hero.description}</p>
        {vehicle.pricing?.startingPrice ? <p className="mt-6 text-sm text-white/60">From <strong className="text-xl text-white">{vehicle.pricing.startingPrice.toLocaleString()} {vehicle.pricing.currency}</strong></p> : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><JetourButton href="#specifications" size="large">Explore specifications</JetourButton><JetourButton href={`/book-test-drive?model=${vehicle.slug}`} variant="secondary" size="large">Book a Test Drive</JetourButton></div>
      </div>
      <div className="pointer-events-none absolute inset-x-[8%] top-20 h-[34%] lg:inset-y-[12%] lg:left-[40%] lg:right-0 lg:h-auto"><Image src={vehicle.hero.transparentVehicleImage} alt={vehicle.hero.alt} fill loading="eager" fetchPriority="high" sizes="(max-width: 767px) 84vw, 60vw" className="object-contain object-center drop-shadow-[0_28px_35px_rgba(0,0,0,.65)]" /></div>
    </Container>
  </section>;
}
