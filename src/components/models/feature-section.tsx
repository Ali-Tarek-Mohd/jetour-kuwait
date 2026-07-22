import { HugeiconsIcon } from "@hugeicons/react";
import AdventureIcon from "@hugeicons/core-free-icons/AdventureIcon";
import AiInnovation01Icon from "@hugeicons/core-free-icons/AiInnovation01Icon";
import Shield01Icon from "@hugeicons/core-free-icons/Shield01Icon";
import Sofa01Icon from "@hugeicons/core-free-icons/Sofa01Icon";
import { Container } from "@/components/ui/container";
import type { VehicleFeatureGroup, VehicleHighlight } from "@/types/vehicle";

const icons: Record<VehicleHighlight["icon"], typeof AdventureIcon> = { adventure: AdventureIcon, technology: AiInnovation01Icon, safety: Shield01Icon, comfort: Sofa01Icon };
export function FeatureSection({ groups }: { groups: VehicleFeatureGroup[] }) { return <section className="border-y border-white/10 bg-jetour-surface"><Container>{groups.map((group, index) => <article key={group.id} id={group.id} className={`scroll-mt-36 grid gap-8 py-14 lg:grid-cols-[.55fr_1.45fr] lg:py-20 ${index ? "border-t border-white/10" : ""}`}><div><p className="text-[10px] tracking-[.17em] text-jetour-accent uppercase">0{index + 1}</p><h2 className="mt-3 text-3xl font-semibold uppercase sm:text-4xl">{group.title}</h2><p className="mt-4 max-w-sm text-sm leading-7 text-white/50">{group.introduction}</p></div><div className="grid gap-8 sm:grid-cols-2">{group.items.map((item) => <div key={item.title} className="border-t border-white/15 pt-5"><HugeiconsIcon icon={icons[item.icon]} size={28} className="text-jetour-accent" /><h3 className="mt-5 text-lg font-semibold">{item.title}</h3>{item.value ? <p className="mt-2 text-2xl">{item.value}</p> : null}<p className="mt-3 text-sm leading-6 text-white/50">{item.description}</p></div>)}</div></article>)}</Container></section>; }
