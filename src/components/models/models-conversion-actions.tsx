import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";

const actionBase = "group inline-flex min-h-13 items-center justify-between gap-5 border px-5 py-3.5 text-xs font-semibold tracking-[.08em] uppercase transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-jetour-accent";

export function ModelsConversionActions() {
  return <div className="w-full lg:max-w-[34rem]">
    <p className="text-[10px] font-semibold tracking-[.2em] text-white/48 uppercase">Start your journey</p>
    <div className="mt-4 h-px bg-white/16" />
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <Link href="/book-test-drive" className={`${actionBase} border-jetour-accent bg-jetour-accent text-black hover:border-[#e3c58f] hover:bg-[#e3c58f]`}>
        <span>Book a Test Drive</span>
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      </Link>
      <Link href="/#contact" className={`${actionBase} border-white/32 bg-black/15 text-white hover:border-white/70 hover:bg-white/[.045]`}>
        <span>Contact Sales</span>
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
      </Link>
    </div>
    <Link href="/models/t2" className="group mt-4 inline-flex min-h-11 items-center gap-3 text-xs font-semibold tracking-[.1em] text-white/74 uppercase transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jetour-accent">
      <span className="relative pb-1 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-50 after:bg-jetour-accent after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100">Explore T2</span>
      <HugeiconsIcon icon={ArrowRight01Icon} size={17} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
    </Link>
  </div>;
}
