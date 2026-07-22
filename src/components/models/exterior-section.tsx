import { Container } from "@/components/ui/container";
import type { VehiclePage } from "@/types/vehicle";
import { ModelMedia } from "./model-media";

export function ExteriorSection({ exterior }: { exterior: VehiclePage["exterior"] }) { return <section id="exterior" className="scroll-mt-36 border-y border-white/10 bg-[#15130f] py-20 lg:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-center"><ModelMedia media={exterior.media} sizes="(max-width: 1023px) 100vw, 62vw" className="min-h-[400px] lg:min-h-[560px]" /><div><p className="eyebrow">Exterior design</p><h2 className="section-title">{exterior.heading}</h2><p className="mt-6 leading-7 text-white/58">{exterior.description}</p><ul className="mt-8 border-t border-white/12">{exterior.highlights.map((highlight) => <li key={highlight} className="border-b border-white/12 py-4 text-sm text-white/72">{highlight}</li>)}</ul></div></div></Container></section>; }
