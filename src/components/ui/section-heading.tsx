import { cn } from "@/lib/cn";
export function SectionHeading({eyebrow,title,intro,className}:{eyebrow:string;title:string;intro?:string;className?:string}){return <div className={cn("max-w-2xl",className)}><p className="eyebrow">{eyebrow}</p><h2 className="section-title">{title}</h2>{intro&&<p className="mt-5 max-w-xl leading-7 text-white/58">{intro}</p>}</div>}
