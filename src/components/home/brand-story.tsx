import { HugeiconsIcon } from "@hugeicons/react";
import AdventureIcon from "@hugeicons/core-free-icons/AdventureIcon";
import AiInnovation01Icon from "@hugeicons/core-free-icons/AiInnovation01Icon";
import CustomerSupportIcon from "@hugeicons/core-free-icons/CustomerSupportIcon";
import { Container } from "@/components/ui/container";

const pillars = [
  { title: "Adventure capability", text: "Confidence engineered for roads that invite you to keep going.", icon: AdventureIcon },
  { title: "Intelligent technology", text: "Purposeful systems that make every journey feel more intuitive.", icon: AiInnovation01Icon },
  { title: "Ownership support", text: "Considered care designed to support the journey after delivery.", icon: CustomerSupportIcon },
];

export function BrandStory() {
  return <section id="discover" className="border-t border-white/10 bg-[#0b0d0f] py-20 lg:py-24">
    <Container>
      <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-stretch">
        <div className="flex flex-col justify-between">
          <div><p className="eyebrow">Discover Jetour</p><h2 className="section-title max-w-2xl">Built for more of life</h2><p className="mt-5 max-w-xl leading-7 text-white/58">Bold design, useful intelligence and dependable support come together for journeys without narrow boundaries.</p></div>
          <div id="ownership" className="mt-12 grid border-t border-white/10 md:grid-cols-3">
            {pillars.map((pillar) => <article key={pillar.title} className="border-b border-white/10 py-6 md:border-r md:border-b-0 md:px-5 md:first:pl-0 md:last:border-r-0">
              <HugeiconsIcon icon={pillar.icon} size={25} className="text-jetour-accent" />
              <h3 className="mt-4 text-sm font-semibold uppercase">{pillar.title}</h3>
              <p className="mt-3 text-xs leading-6 text-white/48">{pillar.text}</p>
            </article>)}
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#24211c,#0d1012_65%)]">
          <div className="jetour-grid absolute inset-0 opacity-35" /><div className="absolute inset-x-[12%] top-[28%] h-[42%] border border-white/10 bg-white/[.025] [clip-path:polygon(0_72%,18%_40%,43%_24%,70%_38%,100%_10%,100%_100%,0_100%)]" />
          <div className="absolute inset-x-7 bottom-7 border-t border-white/15 pt-4"><p className="text-[10px] tracking-[.18em] text-white/40 uppercase">Approved brand media placeholder</p></div>
        </div>
      </div>
    </Container>
  </section>;
}
