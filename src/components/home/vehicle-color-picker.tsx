"use client";

import { useState } from "react";
import Image from "next/image";
import type { VehicleColor } from "@/types/vehicle";

export function VehicleColorPicker({ colors }: { colors: VehicleColor[] }) {
  const [selected, setSelected] = useState(0);
  const color = colors[selected];

  return <div>
    <div className="vehicle-studio relative aspect-[16/9] min-h-[280px] w-full overflow-hidden border border-white/10 sm:min-h-[380px]">
      <div className="absolute inset-x-[14%] bottom-[12%] h-[16%] rounded-[50%] bg-black/55 blur-2xl" />
      <Image key={color.image} src={color.image!} alt={`Jetour T2 in ${color.name}`} fill sizes="(max-width: 1023px) 100vw, 68vw" className="scale-[1.12] object-contain object-center motion-safe:animate-[studio-in_.35s_ease-out] sm:scale-[1.2]" />
    </div>
    <div className="mt-6 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end">
      <div>
        <p className="text-[10px] tracking-[.16em] text-white/40 uppercase">Selected paint</p>
        <p aria-live="polite" className="mt-2 text-xl font-semibold">{color.name}</p>
        <p className="mt-1 text-xs text-jetour-accent">Approved imagery available</p>
      </div>
      <div role="radiogroup" aria-label="Vehicle color" className="flex flex-wrap gap-x-5 gap-y-3">
        {colors.map((item, index) => <button key={item.name} role="radio" aria-checked={index === selected} disabled={!item.available} onClick={() => setSelected(index)} aria-label={`${item.name}${item.available ? "" : " — image unavailable"}`} title={item.available ? item.name : `${item.name} — image unavailable`} className="group flex min-h-12 items-center gap-3 disabled:cursor-not-allowed disabled:opacity-35">
          <span style={{ backgroundColor: item.swatch }} className={`size-7 rounded-full border-4 ${index === selected ? "ring-2 ring-jetour-accent ring-offset-4 ring-offset-[#0d0e0f]" : "border-white/25"}`} />
          <span className="text-xs">{item.name}</span>
        </button>)}
      </div>
    </div>
    <p className="mt-3 text-xs text-white/38">Unavailable finishes activate when approved local paint imagery is added.</p>
  </div>;
}
