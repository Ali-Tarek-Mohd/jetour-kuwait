import { Container } from "@/components/ui/container";
import { vehicles } from "@/data/vehicles";
import { ModelCard } from "@/components/home/model-card";

export function RelatedModels({ slugs }: { slugs: string[] }) { const related = vehicles.filter((vehicle) => slugs.includes(vehicle.slug)); if (!related.length) return null; return <section className="bg-jetour-black py-20 lg:py-24"><Container><p className="eyebrow">Continue exploring</p><h2 className="section-title">Related models</h2><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:max-w-4xl">{related.map((vehicle, index) => <ModelCard key={vehicle.slug} vehicle={vehicle} index={index} />)}</div></Container></section>; }
