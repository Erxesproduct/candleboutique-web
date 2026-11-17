import type { Metadata } from "next";
import Link from "next/link";
import { CandleRow } from "@/components/candle-row";
import { Flame } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { collections, groups, inCollection, soldOut, type Product } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Дэлгүүр",
  description: "Candle Boutique-ийн бүх лаа: Minimal, Basic, Memories, Marble цуглуулга, Lauren Dickinson Clarke, Amoln брэнд, refill, лааны хэрэгсэл.",
  alternates: { canonical: "/shop" },
};

type Props = { searchParams: Promise<{ c?: string }> };

/** In stock first, keeping the collection's own order. */
const shelf = (list: Product[]) => [...list].sort((a, b) => Number(soldOut(a)) - Number(soldOut(b)));

export default async function Shop({ searchParams }: Props) {
  const { c } = await searchParams;
  const group = groups.find((g) => g.id === c);
  const single = collections.find((x) => x.id === c);
  const activeGroup = group?.id ?? single?.group ?? null;
  const shown = single ? [single] : collections.filter((x) => x.count > 0 && (!group || x.group === group.id));
  const total = shown.reduce((n, x) => n + x.count, 0);

  return (
    <div className="candlelit -mb-24 pb-24">
      {/* candlelit header: a dark room, a few lit candles on a ledge */}
      <section className="relative overflow-hidden bg-night text-cream">
        <div className="glow-pulse pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgb(242_180_92/0.32),rgb(242_180_92/0.08)_60%,transparent)]" aria-hidden />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgb(165_85_42/0.35),transparent)]" aria-hidden />
        <div className="wrap relative grid items-end gap-4 pt-12 md:grid-cols-[1fr_auto] md:pt-16">
          <div className="pb-10 md:pb-14">
            <p className="eyebrow flex items-center gap-2 text-glow">
              <Flame size={13} /> {single ? (groups.find((g) => g.id === single.group)?.name ?? "Дэлгүүр") : "Дэлгүүр"}
            </p>
            <h1 className="serif mt-4 text-5xl leading-tight md:text-6xl">{single?.name ?? group?.name ?? "Бүх лаа"}</h1>
            <p className="mt-3 max-w-2xl text-cream/70">{single?.blurb ?? group?.blurb ?? "Гар аргаар цутгасан лаа, албан ёсны брэндүүд, refill болон хэрэгсэл."}</p>
            <p className="tnum mt-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3.5 py-1.5 text-[13.5px] text-cream/80 ring-1 ring-glow/30">
              <span className="h-1.5 w-1.5 rounded-full bg-glow" aria-hidden /> {total} бараа
            </p>
          </div>
          <div className="hidden self-end md:block">
            <CandleRow set="band" />
            <div className="h-2.5 rounded-full bg-gradient-to-b from-[#5a4334] to-[#3a2c24]" aria-hidden />
          </div>
        </div>
      </section>

      <div className="wrap">
        <nav aria-label="Ангилал" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto border-b border-glow/30 px-4 py-5 md:mx-0 md:flex-wrap md:px-0">
          <Pill href="/shop" active={!c}>
            Бүгд
          </Pill>
          {groups.map((g) => (
            <Pill key={g.id} href={`/shop?c=${g.id}`} active={activeGroup === g.id && !single}>
              {g.name}
            </Pill>
          ))}
          <span className="mx-1 w-px shrink-0 bg-sand" aria-hidden />
          {collections
            .filter((x) => x.count > 0 && (!activeGroup || x.group === activeGroup))
            .map((x) => (
              <Pill key={x.id} href={`/shop?c=${x.id}`} active={single?.id === x.id} small>
                {x.name.replace(/ Collection$/, "").replace(/^The /, "")}
              </Pill>
            ))}
        </nav>

        <div className="mt-10 space-y-10">
          {shown.map((x) => (
            <section
              key={x.id}
              id={x.id}
              aria-labelledby={`h-${x.id}`}
              className="relative scroll-mt-40 overflow-hidden rounded-[30px] bg-wax/75 p-4 shadow-[0_24px_60px_-40px_rgb(120_70_20/0.55)] ring-1 ring-glow/35 backdrop-blur-[2px] sm:p-6 md:p-9"
            >
              <div className="halo pointer-events-none absolute -top-28 -right-28 h-64 w-64 opacity-70" aria-hidden />
              {!single && (
                <div className="relative mb-8 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow flex items-center gap-2 text-[11px] text-ember">
                      <Flame size={12} still /> {groups.find((g) => g.id === x.group)?.name}
                      {x.origin ? ` · ${x.origin}` : ""}
                    </p>
                    <h2 id={`h-${x.id}`} className="serif mt-2 text-3xl md:text-[2.2rem]">
                      <Link href={`/shop?c=${x.id}`} className="hover:text-ember">
                        {x.name}
                      </Link>
                    </h2>
                  </div>
                  <p className="max-w-md text-[14.5px] leading-relaxed text-ink-2">{x.blurb}</p>
                  <span className="h-px w-full bg-gradient-to-r from-glow via-glow/40 to-transparent" aria-hidden />
                </div>
              )}
              {single && <h2 id={`h-${x.id}`} className="sr-only">{x.name}</h2>}
              <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
                {shelf(inCollection(x.id)).map((p, i) => (
                  <ProductCard key={p.slug} p={p} priority={i < 2 && x === shown[0]} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({ href, active, small, children }: { href: string; active: boolean; small?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-full px-4 py-2 font-medium transition ${small ? "text-[13.5px]" : "text-[14.5px]"} ${active ? "bg-ink text-wax" : "bg-linen text-ink-2 hover:bg-sand"}`}
    >
      {children}
    </Link>
  );
}
