import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="wrap pt-10 md:pt-14">
      <p className="eyebrow text-ember">{single ? (groups.find((g) => g.id === single.group)?.name ?? "Дэлгүүр") : "Дэлгүүр"}</p>
      <h1 className="serif mt-3 text-5xl leading-tight md:text-6xl">{single?.name ?? group?.name ?? "Бүх лаа"}</h1>
      <p className="mt-3 max-w-2xl text-ink-2">{single?.blurb ?? group?.blurb ?? "Гар аргаар цутгасан лаа, албан ёсны брэндүүд, refill болон хэрэгсэл."}</p>

      <nav aria-label="Ангилал" className="no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto border-b border-sand px-4 pb-4 md:mx-0 md:flex-wrap md:px-0">
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
      <p className="tnum mt-4 text-[14px] text-mute">{total} бараа</p>

      <div className="mt-6 space-y-16">
        {shown.map((x) => (
          <section key={x.id} id={x.id} aria-labelledby={`h-${x.id}`} className="scroll-mt-32">
            {!single && (
              <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2 border-b border-sand/70 pb-3">
                <h2 id={`h-${x.id}`} className="serif text-3xl">
                  <Link href={`/shop?c=${x.id}`} className="hover:text-ember">
                    {x.name}
                  </Link>
                </h2>
                <p className="max-w-xl text-[14.5px] text-ink-2">{x.blurb}</p>
              </div>
            )}
            {single && <h2 id={`h-${x.id}`} className="sr-only">{x.name}</h2>}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
              {shelf(inCollection(x.id)).map((p, i) => (
                <ProductCard key={p.slug} p={p} priority={i < 2 && x === shown[0]} />
              ))}
            </div>
          </section>
        ))}
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
