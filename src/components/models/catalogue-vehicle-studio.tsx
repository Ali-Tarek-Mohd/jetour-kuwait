"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { ModelCatalogueEntry, VehicleColor } from "@/types/vehicle";

function studioBackground(color: VehicleColor) {
  const studio = color.studioBackground;
  if (!studio) return color.background ?? "linear-gradient(145deg,#24272a,#101214)";

  return [
    `radial-gradient(ellipse at 50% 103%, ${studio.floorGlow ?? studio.centralGlow} 0%, transparent 42%)`,
    `radial-gradient(ellipse at 50% 43%, ${studio.centralGlow} 0%, transparent 48%)`,
    `radial-gradient(ellipse at 50% -8%, ${studio.highlight} 0%, transparent 39%)`,
    `radial-gradient(ellipse at 50% 48%, transparent 38%, rgba(0,0,0,${studio.vignetteStrength ?? .68}) 100%)`,
    `linear-gradient(${studio.base},${studio.base})`,
  ].join(",");
}

export function CatalogueVehicleStudio({ vehicle }: { vehicle: ModelCatalogueEntry }) {
  const initialIndex = Math.max(0, vehicle.colors.findIndex((color) => color.available && color.image));
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [pendingReady, setPendingReady] = useState(false);
  const [hasSelectedColor, setHasSelectedColor] = useState(false);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = vehicle.colors[currentIndex];
  const selectedIndex = pendingIndex ?? currentIndex;
  const selected = vehicle.colors[selectedIndex] ?? current;
  const pending = pendingIndex === null ? undefined : vehicle.colors[pendingIndex];

  const selectColor = (index: number) => {
    const color = vehicle.colors[index];
    setHasSelectedColor(true);
    if (!color?.available || !color.image || index === selectedIndex) return;
    setPendingReady(false);
    setPendingIndex(index);
  };

  const moveAvailable = (from: number, direction: 1 | -1) => {
    const available = vehicle.colors.map((color, index) => color.available && color.image ? index : -1).filter((index) => index >= 0);
    const position = available.indexOf(from);
    if (position < 0 || available.length < 2) return;
    const next = available[(position + direction + available.length) % available.length];
    selectColor(next);
    swatchRefs.current[next]?.focus();
  };

  if (!current?.image) return null;

  return <>
    <div className="catalogue-studio-backdrop" data-color-selected={hasSelectedColor ? "true" : "false"} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: studioBackground(current) }} />
      {pending ? <div key={pending.name} className="catalogue-studio-backdrop__paint absolute inset-0" style={{ background: studioBackground(pending) }} /> : null}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,.08)_0%,transparent_42%,rgba(0,0,0,.34)_100%)]" />
    </div>
    <div className="relative z-10 aspect-[16/10] overflow-hidden">
      <span aria-hidden="true" className="absolute -right-2 top-3 text-[clamp(5rem,10vw,8rem)] leading-none font-semibold tracking-[-.08em] text-white/[.04]">{vehicle.name}</span>
      <div className="absolute inset-x-[15%] bottom-[13%] h-[9%] rounded-[50%] bg-black/38" />
      <Image src={current.image} alt={current.alt ?? `${vehicle.name} in ${current.name}`} fill sizes="(max-width: 639px) 92vw, (max-width: 1199px) 48vw, 31vw" style={{ transform: `scale(${vehicle.catalogueImageScale ?? 1.38})`, transformOrigin: vehicle.catalogueImageTransformOrigin ?? "center" }} className="object-contain object-center" />
      {pending?.image ? <Image src={pending.image} alt={pending.alt ?? `${vehicle.name} in ${pending.name}`} fill sizes="(max-width: 639px) 92vw, (max-width: 1199px) 48vw, 31vw" style={{ transform: `scale(${vehicle.catalogueImageScale ?? 1.38})`, transformOrigin: vehicle.catalogueImageTransformOrigin ?? "center" }} onLoad={() => setPendingReady(true)} onTransitionEnd={() => { if (pendingReady && pendingIndex !== null) { setCurrentIndex(pendingIndex); setPendingIndex(null); setPendingReady(false); } }} className={`object-contain object-center transition-opacity duration-300 ${pendingReady ? "opacity-100" : "opacity-0"}`} /> : null}
    </div>
    <div className="relative z-10 mt-4 flex min-h-12 flex-wrap items-center justify-center gap-3 lg:translate-y-1 lg:opacity-0 lg:transition lg:duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100" role="group" aria-label={`${vehicle.name} paint colors`}>
      {vehicle.colors.map((color: VehicleColor, index) => <button key={color.name} ref={(node) => { swatchRefs.current[index] = node; }} type="button" aria-pressed={selectedIndex === index} disabled={!color.available || !color.image} aria-label={color.available && color.image ? `${vehicle.colorControlVerb ?? "Show"} ${vehicle.name} in ${color.name}` : `${color.name} image unavailable`} onClick={() => selectColor(index)} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); moveAvailable(index, 1); } if (event.key === "ArrowLeft") { event.preventDefault(); moveAvailable(index, -1); } }} className="group/swatch grid min-h-11 min-w-11 place-items-center disabled:cursor-not-allowed disabled:opacity-30"><span style={{ backgroundColor: color.swatch }} className={`size-6 rounded-full border-[3px] transition ${selectedIndex === index ? "ring-2 ring-jetour-accent ring-offset-3 ring-offset-[#111315]" : "border-white/25 group-hover/swatch:border-white/60"}`} /></button>)}
      <span aria-live="polite" className="ml-1 text-xs text-white/65">{selected.name}</span>
    </div>
  </>;
}
