import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyBox } from "@/components/buy-box";
import { Gallery } from "@/components/gallery";
import { Flame, TruckIcon } from "@/components/icons";
import { NotesPyramid } from "@/components/notes";
import { Price } from "@/components/price";
import { ProductCard } from "@/components/product-card";
import { business } from "@/content/business";
import { faq, getCollection, getProduct, inCollection, products, soldOut, sku, summary } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { absoluteUrl } from "@/lib/site-url";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  const img = p.images[0];
  return {
    title: p.name,
    description: summary(p) || `${p.name}: ${formatPrice(p.price)}`,
    alternates: { canonical: `/p/${p.slug}` },
    openGraph: { title: p.name, images: [{ url: img.src, width: img.w, height: img.h }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCollection(p.collection)!;
  const siblings = inCollection(p.collection).filter((x) => x.slug !== p.slug);
  const more = siblings.length >= 2 ? siblings : [...siblings, ...products.filter((x) => x.collection !== p.collection && !soldOut(x) && x.featured)].slice(0, 4);
  const fits = p.fits.map((s) => getProduct(s)).filter((x) => !!x);
  const isCandle = c.group !== "extra";

  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: sku(p),
    image: p.images.map((m) => absoluteUrl(m.src)),
    description: summary(p),
    brand: { "@type": "Brand", name: c.group === "brand" ? c.name : business.name },
    offers: {
      "@type": "Offer",
      price: p.price,
      priceCurrency: "MNT",
      availability: soldOut(p) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: absoluteUrl(`/p/${p.slug}`),
    },
  };

  return (
    <div className="wrap pt-6 md:pt-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <nav aria-label="Зам" className="text-[13.5px] text-mute">
        <Link href="/shop" className="hover:text-ember">
          Дэлгүүр
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?c=${c.id}`} className="hover:text-ember">
          {c.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
        <Gallery images={p.images} name={p.name} />

        <div>
          <p className="eyebrow text-ember">{c.name}{c.origin ? ` · ${c.origin}` : ""}</p>
          <h1 className="serif mt-3 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          {p.subtitle && <p className="mt-2 text-lg text-ink-2">{p.subtitle}</p>}
          {p.scent && (
            <p className="serif mt-3 text-xl text-ink-2 italic">
              «{p.scent}»
            </p>
          )}
          <div className="mt-6 flex items-center gap-4">
            <Price p={p} large />
            {p.stock != null && p.stock > 0 && p.stock <= 8 && <span className="text-[13.5px] text-sage">{p.stock} үлдсэн</span>}
          </div>

          <div className="mt-7">
            <BuyBox slug={p.slug} />
          </div>

          <p className="mt-5 flex items-start gap-2.5 text-[14.5px] text-ink-2">
            <TruckIcon size={19} className="mt-0.5 shrink-0 text-ember" />
            <span>
              Улаанбаатарт {formatPrice(business.delivery[0].fee)}, захиалга баталгаажсанаас хойш 24 цагт. Төлбөр 100% урьдчилан, QPay-ээр.
            </span>
          </p>

          {p.specs.length > 0 && (
            <dl className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-sand ring-1 ring-sand">
              {p.specs.map((s, i) => (
                <div key={s.label} className={`bg-wax px-4 py-3 ${i === p.specs.length - 1 && i % 2 === 0 ? "col-span-2" : ""}`}>
                  <dt className="text-[12px] text-mute">{s.label}</dt>
                  <dd className="mt-0.5 font-semibold">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.notes && (
            <section className="mt-9 rounded-[26px] bg-linen p-5 md:p-7">
              <h2 className="eyebrow flex items-center gap-2 text-ink-2">
                <Flame size={13} /> Үнэрийн давхарга
              </h2>
              <div className="mt-5">
                <NotesPyramid notes={p.notes} />
              </div>
            </section>
          )}

          {p.variants.length > 0 && (
            <section className="mt-9">
              <h2 className="serif text-2xl">{p.variants.length} үнэрийн сонголт</h2>
              <p className="mt-1 text-[14.5px] text-mute">Үнэрээ захиалгын тайлбарт бичнэ үү.</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {p.variants.map((v) => (
                  <li key={v.name} className="rounded-2xl bg-linen p-4">
                    <p className="serif text-lg">{v.name}</p>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">
                      {[...v.notes.top, ...v.notes.heart, ...v.notes.base].join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {p.story.length > 0 && (
            <section className="prose-candle mt-9">
              {p.story.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </section>
          )}

          {fits.length > 0 && (
            <section className="mt-9">
              <h2 className="serif text-2xl">Аль лаанд тохирох вэ</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {fits.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/p/${f.slug}`} className="inline-block rounded-full bg-linen px-4 py-2 text-[14.5px] hover:bg-sand">
                      {f.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {isCandle && (
            <details className="group mt-9 border-t border-sand pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                Лаагаа хэрхэн асаах вэ
                <span className="text-xl text-ember transition group-open:rotate-45">+</span>
              </summary>
              <ul className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-2">
                {faq
                  .filter((f) => !/үүссэн/.test(f.q))
                  .map((f) => (
                    <li key={f.q}>{f.a}</li>
                  ))}
              </ul>
            </details>
          )}
        </div>
      </div>

      {more.length > 0 && (
        <section className="pt-24">
          <h2 className="serif text-3xl md:text-4xl">{siblings.length >= 2 ? `${c.name}: бусад` : "Танд таалагдаж магадгүй"}</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {more.slice(0, 4).map((x) => (
              <ProductCard key={x.slug} p={x} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
