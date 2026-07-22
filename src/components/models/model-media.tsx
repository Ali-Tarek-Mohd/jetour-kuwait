import Image from "next/image";
import type { VehicleMedia } from "@/types/vehicle";
import { cn } from "@/lib/cn";

export function ModelMedia({ media, sizes, className }: { media: VehicleMedia; sizes: string; className?: string }) {
  return <div className={cn("model-media relative min-h-[320px] overflow-hidden border border-white/10", className)}>
    {media.image ? <Image src={media.image} alt={media.alt} fill sizes={sizes} className="object-contain p-6" /> : <>
      <div className="jetour-grid absolute inset-0 opacity-40" />
      <div className="absolute inset-x-[12%] top-[28%] h-[42%] border border-white/12 bg-white/[.025] [clip-path:polygon(2%_66%,16%_40%,39%_22%,72%_30%,95%_54%,100%_74%,8%_76%)]" />
      <p className="absolute inset-x-6 bottom-6 border-t border-white/12 pt-4 text-[10px] tracking-[.17em] text-white/35 uppercase">Approved model imagery coming soon</p>
    </>}
  </div>;
}
