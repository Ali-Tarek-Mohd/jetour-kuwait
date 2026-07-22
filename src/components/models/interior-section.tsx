import { Container } from "@/components/ui/container";
import type { VehiclePage } from "@/types/vehicle";
import { ModelMedia } from "./model-media";

export function InteriorSection({ interior }: { interior: VehiclePage["interior"] }) { return <section id="interior" className="scroll-mt-36 bg-[#090b0d] py-20 lg:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><p className="eyebrow">Interior</p><h2 className="section-title">{interior.heading}</h2><p className="mt-6 leading-7 text-white/58">{interior.description}</p><ul className="mt-8 space-y-3">{interior.highlights.map((highlight) => <li key={highlight} className="border-l border-jetour-accent pl-4 text-sm text-white/70">{highlight}</li>)}</ul></div><ModelMedia media={interior.media} sizes="(max-width: 1023px) 100vw, 64vw" className="min-h-[420px] lg:min-h-[560px]" /></div></Container></section>; }
