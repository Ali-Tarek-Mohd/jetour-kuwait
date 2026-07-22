import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";

export default function ModelNotFound() { return <main className="min-h-screen bg-jetour-black text-white"><SiteHeader /><section className="flex min-h-[70vh] items-center pt-[76px]"><Container><p className="eyebrow">Model unavailable</p><h1 className="section-title max-w-3xl">This journey is not ready yet</h1><p className="mt-6 max-w-xl leading-7 text-white/55">The requested model page is unavailable or its Kuwait information is still being prepared.</p><Link href="/models" className="mt-8 inline-flex min-h-12 items-center border border-white/30 px-6 text-xs font-semibold tracking-[.09em] uppercase hover:bg-white hover:text-black">Return to all models</Link></Container></section><SiteFooter /></main>; }
