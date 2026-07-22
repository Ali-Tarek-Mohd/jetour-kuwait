import { Container } from "@/components/ui/container";
import type { VehiclePage } from "@/types/vehicle";
import { ModelMedia } from "./model-media";

export function ModelOverview({ overview }: { overview: VehiclePage["overview"] }) { return <section id="overview" className="scroll-mt-36 bg-jetour-black py-20 lg:py-28"><Container><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="eyebrow">Overview</p><h2 className="section-title">{overview.heading}</h2><p className="mt-6 max-w-lg leading-7 text-white/58">{overview.description}</p>{overview.statement ? <blockquote className="mt-9 border-l border-jetour-accent pl-5 text-xl leading-8 text-white/82">{overview.statement}</blockquote> : null}</div><ModelMedia media={overview.media} sizes="(max-width: 1023px) 100vw, 58vw" className="min-h-[380px] lg:min-h-[520px]" /></div></Container></section>; }
