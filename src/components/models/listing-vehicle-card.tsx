import Link from "next/link";
import type { ModelCatalogueEntry } from "@/types/vehicle";
import { CatalogueVehicleStudio } from "./catalogue-vehicle-studio";

const categoryThemes: Record<string, string> = {
  "Adventure SUV": "bg-[radial-gradient(circle_at_55%_42%,rgba(183,135,78,.22),transparent_40%),linear-gradient(145deg,#29231d,#101214_72%)]",
  "Urban SUV": "bg-[radial-gradient(circle_at_55%_40%,rgba(91,127,148,.2),transparent_40%),linear-gradient(145deg,#1d272c,#0f1214_72%)]",
  "Family SUV": "bg-[radial-gradient(circle_at_55%_40%,rgba(143,123,100,.2),transparent_42%),linear-gradient(145deg,#292621,#111315_72%)]",
  "Premium SUV": "bg-[radial-gradient(circle_at_55%_40%,rgba(126,135,141,.2),transparent_40%),linear-gradient(145deg,#24292d,#0e1012_72%)]",
};

export function ListingVehicleCard({ vehicle, index }: { vehicle: ModelCatalogueEntry; index: number }) {
  const theme = vehicle.category ? categoryThemes[vehicle.category] : "bg-[linear-gradient(145deg,#24272a,#101214)]";
  const hasStudio = vehicle.detailStatus === "complete" && vehicle.colors.some((color) => color.available && color.image);

  return <article className="group flex w-full min-w-0 flex-col overflow-hidden border border-white/10 bg-[#0d1012] transition-colors duration-300 hover:border-white/28 focus-within:border-white/35">
    <div className="flex items-center justify-between px-6 pb-2 pt-6"><div><p className="text-3xl font-semibold tracking-[-.04em] uppercase">{vehicle.name}</p>{vehicle.category ? <p className="mt-1 text-[10px] tracking-[.14em] text-white/45 uppercase">{vehicle.category}</p> : null}</div><span aria-hidden="true" className="text-[10px] tracking-[.16em] text-white/25">{String(index + 1).padStart(2, "0")}</span></div>

    {hasStudio ? <div className="px-2"><CatalogueVehicleStudio vehicle={vehicle} /></div> : <div className={`relative mx-2 aspect-[16/10] overflow-hidden ${theme}`}>
      <span aria-hidden="true" className="absolute -right-2 top-3 text-[clamp(5rem,10vw,8rem)] leading-none font-semibold tracking-[-.08em] text-white/[.04]">{vehicle.name}</span>
      <div aria-hidden="true" className="absolute inset-x-[11%] top-[29%] h-[40%] border-y border-white/[.065]" />
      <div aria-hidden="true" className="absolute inset-x-[12%] top-[38%] h-[31%] border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.01))] [clip-path:polygon(3%_62%,14%_40%,34%_23%,69%_24%,86%_40%,98%_62%,92%_76%,8%_76%)]" />
      <div aria-hidden="true" className="absolute inset-x-[20%] top-[64%] h-px bg-white/11" />
      <p className="absolute inset-x-5 bottom-5 text-center text-[9px] tracking-[.18em] text-white/42 uppercase">Image coming soon</p>
    </div>}

    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      <p className="text-center text-sm text-white/58">{vehicle.availability === "available" ? "Model details available" : "Full model details coming soon"}</p>
      {vehicle.detailStatus === "complete" ? <div className="relative mt-auto min-h-[76px] pt-5"><span aria-hidden="true" className="absolute inset-x-0 top-7 hidden min-h-12 items-center justify-center text-[10px] tracking-[.14em] text-white/32 uppercase transition-opacity lg:flex lg:group-hover:opacity-0 lg:group-focus-within:opacity-0">Explore options</span><div className="grid grid-cols-2 border-y border-white/12 lg:translate-y-2 lg:opacity-0 lg:transition lg:duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
          <Link href={`/models/${vehicle.slug}`} className="catalogue-action catalogue-action--discover flex min-h-13 items-center justify-center border-r border-white/12 px-3 text-xs font-semibold tracking-[.09em] uppercase">Discover</Link>
          <Link href={`/book-test-drive?model=${vehicle.slug}`} className="catalogue-action catalogue-action--test-drive flex min-h-13 items-center justify-center px-3 text-center text-xs font-semibold tracking-[.09em] uppercase">Book Test Drive</Link>
        </div>
      </div> : <div className="mt-auto min-h-[76px] pt-5"><span aria-disabled="true" className="flex min-h-13 items-center justify-center border-y border-white/10 text-[10px] font-semibold tracking-[.12em] text-white/35 uppercase">Details coming soon</span></div>}
    </div>
  </article>;
}
