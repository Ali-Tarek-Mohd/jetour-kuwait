import Image from "next/image";
import type { VehiclePage } from "@/types/vehicle";

export function ModelHeroMedia({ hero }: { hero: VehiclePage["hero"] }) {
  return <div className="pointer-events-none absolute inset-x-[8%] top-20 h-[34%] lg:inset-y-[12%] lg:left-[40%] lg:right-0 lg:h-auto">
    <Image
      src={hero.posterImage ?? hero.transparentVehicleImage}
      alt={hero.alt}
      fill
      loading="eager"
      fetchPriority="high"
      sizes="(max-width: 767px) 84vw, 60vw"
      className="object-contain object-center drop-shadow-[0_28px_35px_rgba(0,0,0,.65)]"
    />
  </div>;
}
