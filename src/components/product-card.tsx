import Image from "next/image";
import Link from "next/link";
import { discount, getCollection, onSale, soldOut, type Product } from "@/lib/catalog";
import { Price } from "./price";
import { QuickAdd } from "./quick-add";

export function ProductCard({ p, priority, sizes = "(min-width: 1024px) 24vw, 46vw" }: { p: Product; priority?: boolean; sizes?: string }) {
  const c = getCollection(p.collection);
  const second = p.images[1];
  return (
    <article className="group relative">
      <Link href={`/p/${p.slug}`} className="lift frame relative block aspect-[4/5] overflow-hidden rounded-[22px]">
        <Image src={p.images[0].thumb.src} alt={p.name} fill priority={priority} sizes={sizes} className={`object-cover ${soldOut(p) ? "opacity-60 grayscale-[.4]" : ""} ${second ? "transition-opacity duration-700 group-hover:opacity-0" : ""}`} />
        {second && <Image src={second.thumb.src} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />}
        <span className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
          {soldOut(p) ? (
            <span className="rounded-full bg-ink/80 px-2.5 py-1 text-[11.5px] font-semibold text-wax">Дууссан</span>
          ) : (
            onSale(p) && <span className="tnum rounded-full bg-ember px-2.5 py-1 text-[11.5px] font-semibold text-white">−{discount(p)}%</span>
          )}
          {c?.group === "brand" && <span className="rounded-full bg-wax/90 px-2.5 py-1 text-[11.5px] font-semibold text-ink">{c.origin}</span>}
        </span>
      </Link>
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow truncate text-[10.5px] text-mute">{c?.name}</p>
          <h3 className="serif mt-1 text-[1.15rem] leading-snug">
            <Link href={`/p/${p.slug}`} className="hover:text-ember">
              {p.name}
            </Link>
          </h3>
          {(p.scent || p.subtitle) && <p className="mt-0.5 line-clamp-1 text-[13.5px] text-ink-2">{p.subtitle ?? p.scent}</p>}
          <div className="mt-1.5">
            <Price p={p} />
          </div>
        </div>
        <div className="shrink-0 pt-1">
          <QuickAdd slug={p.slug} name={p.name} />
        </div>
      </div>
    </article>
  );
}
