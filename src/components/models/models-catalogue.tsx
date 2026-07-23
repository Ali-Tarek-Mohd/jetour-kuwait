"use client";

import { useMemo, useState } from "react";
import type { ModelCatalogueEntry, ModelCategory } from "@/types/vehicle";
import { ListingVehicleCard } from "./listing-vehicle-card";

const allModels = "All Models";

export function ModelsCatalogue({ models, categories }: { models: ModelCatalogueEntry[]; categories: ModelCategory[] }) {
  const [selected, setSelected] = useState(allModels);
  const visibleModels = useMemo(() => selected === allModels ? models : models.filter((model) => model.category === selected), [selected, models]);
  const filters = [allModels, ...categories];

  return <>
    <div className="sticky top-[76px] z-30 border-b border-white/10 bg-[#080a0c]/96">
      <div role="group" aria-label="Filter models by category" className="mx-auto flex w-full max-w-[1440px] justify-start gap-5 overflow-x-auto px-5 sm:gap-7 sm:px-8 md:justify-center lg:gap-9 lg:px-12 xl:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((filter) => { const active = selected === filter; return <button key={filter} type="button" aria-pressed={active} onClick={() => setSelected(filter)} className={`group/filter relative flex min-h-14 shrink-0 items-center px-1 text-[11px] font-semibold tracking-[.08em] whitespace-nowrap uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-jetour-accent ${active ? "text-white" : "text-white/52 hover:text-white/82"}`}><span>{filter}</span><span aria-hidden="true" className={`absolute inset-x-1 bottom-0 h-px origin-center bg-jetour-accent transition-transform ${active ? "scale-x-100" : "scale-x-0 group-hover/filter:scale-x-50"}`} /></button>; })}
      </div>
    </div>
    <p aria-live="polite" className="sr-only">Showing {visibleModels.length} {visibleModels.length === 1 ? "model" : "models"} in {selected}</p>
    <div className="mx-auto w-full max-w-[1440px] px-5 pt-12 sm:px-8 lg:px-12 xl:px-16">{visibleModels.length ? <div className="flex min-h-[560px] flex-wrap justify-center gap-5">{visibleModels.map((model) => <div key={model.slug} className="flex w-full sm:w-[calc(50%-0.625rem)] xl:w-[calc(33.333%-0.875rem)]"><ListingVehicleCard vehicle={model} index={models.findIndex((item) => item.slug === model.slug)} /></div>)}</div> : <div className="flex min-h-[360px] items-center border border-white/10 bg-white/[.02] p-8"><div><h2 className="text-2xl font-semibold uppercase">More journeys are coming</h2><p className="mt-4 max-w-lg text-sm leading-7 text-white/55">No model records are currently available in this category. Explore another category to continue.</p></div></div>}</div>
  </>;
}
