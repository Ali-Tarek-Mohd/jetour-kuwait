"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleColor } from "@/types/vehicle";

export function ModelColorStudio({ model, colors }: { model: string; colors: VehicleColor[] }) {
  const initial = Math.max(0, colors.findIndex((color) => color.available && color.image));
  const [selected, setSelected] = useState(initial);
  const color = colors[selected];
  if (!colors.length || !color?.image) return null;

  return <section aria-labelledby="color-studio-heading" className="border-y border-white/10 bg-[#0d0f10] py-20 lg:py-28">
    <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Color studio</p><h2 id="color-studio-heading" className="section-title">Find your expression</h2></div><div className="md:text-right"><p className="text-[10px] tracking-[.16em] text-white/40 uppercase">Selected paint</p><p aria-live="polite" className="mt-2 text-xl font-semibold">{color.name}</p><p className="mt-1 text-xs text-jetour-accent">Approved image available</p></div></div>
      <div className="vehicle-studio relative mt-10 aspect-[16/8] min-h-[280px] overflow-hidden border border-white/10 sm:min-h-[430px]"><div className="absolute inset-x-[18%] bottom-[10%] h-[14%] rounded-[50%] bg-black/55 blur-2xl" /><Image key={color.image} src={color.image} alt={color.alt ?? `${model} in ${color.name}`} fill sizes="(max-width: 1023px) 100vw, 86vw" className="scale-[1.12] object-contain motion-safe:animate-[studio-in_.35s_ease-out] sm:scale-[1.18]" /></div>
      <div role="radiogroup" aria-label={`${model} exterior color`} className="mt-7 flex flex-wrap gap-x-6 gap-y-3">{colors.map((item, index) => <button key={item.name} type="button" role="radio" aria-checked={index === selected} disabled={!item.available || !item.image} onClick={() => setSelected(index)} aria-label={`${item.name}${item.available && item.image ? "" : " — image unavailable"}`} className="flex min-h-12 items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35"><span style={{ backgroundColor: item.swatch }} className={`size-8 rounded-full border-4 ${index === selected ? "ring-2 ring-jetour-accent ring-offset-4 ring-offset-[#0d0f10]" : "border-white/25"}`} /><span className="text-xs">{item.name}</span></button>)}</div>
      <p className="mt-3 text-xs text-white/38">Unavailable finishes activate when approved local paint imagery is supplied.</p>
    </div>
  </section>;
}
