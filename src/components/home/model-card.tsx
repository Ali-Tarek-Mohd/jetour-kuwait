import Image from "next/image";
import type { Vehicle } from "@/types/vehicle";
import { IconLink } from "@/components/ui/icon-link";

export function ModelCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  return <article className="group flex min-h-[440px] flex-col border border-white/10 bg-jetour-surface transition-transform duration-300 hover:-translate-y-1">
    <div className="relative aspect-[4/3] overflow-hidden bg-[radial-gradient(circle_at_55%_42%,rgba(217,176,111,.17),transparent_43%),#111417]">
      {vehicle.image ? <Image src={vehicle.image} alt={vehicle.imageAlt} fill sizes="(max-width: 639px) 74vw, (max-width: 1279px) 50vw, 25vw" className="scale-[1.18] object-contain object-center transition-transform duration-500 group-hover:scale-[1.21]" /> : <>
        <span className="absolute right-4 top-2 text-8xl font-semibold text-white/[.035]">0{index + 1}</span>
        <div className="absolute inset-x-[10%] top-[27%] h-[45%] border-y border-white/[.06]" />
        <div className="absolute inset-x-[12%] top-[37%] h-[34%] border border-white/15 bg-[linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.015))] [clip-path:polygon(3%_59%,12%_38%,30%_20%,67%_18%,84%_35%,96%_57%,91%_75%,10%_77%)]" />
        <div className="absolute inset-x-[20%] top-[61%] h-px bg-white/10" />
        <p className="absolute inset-x-0 bottom-4 text-center text-[9px] tracking-[.18em] text-white/30 uppercase">Imagery coming soon</p>
      </>}
    </div>
    <div className="flex flex-1 flex-col p-6"><p className="text-[10px] tracking-[.15em] text-jetour-accent uppercase">{vehicle.category}</p><h3 className="mt-2 text-3xl font-semibold uppercase">{vehicle.name}</h3><p className="mt-2 text-sm text-white/55">{vehicle.tagline}</p><p className="mt-auto pt-7 text-xs text-white/45">{vehicle.specification}</p>{vehicle.pageReady ? <IconLink href={`/models/${vehicle.slug}`} className="mt-2">Explore</IconLink> : <span className="mt-3 inline-flex min-h-10 items-center text-[10px] font-semibold tracking-[.1em] text-white/35 uppercase">Details coming soon</span>}</div>
  </article>;
}
