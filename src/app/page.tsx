import Image from "next/image";
import Link from "next/link";
import { HeroSlider, type Slide } from "@/components/hero-slider";
import { ArrowIcon, ClockIcon, Flame, LeafIcon, PinIcon, StarIcon, TruckIcon } from "@/components/icons";
import { NotesPyramid } from "@/components/notes";
import { ProductCard } from "@/components/product-card";
import { business } from "@/content/business";
import { banners, collections, faq, fromPrice, getCollection, getProduct, inCollection, onSale, posts, products, soldOut } from "@/lib/catalog";
import { formatDate, formatPrice } from "@/lib/format";

const FACTS = ["Шар буурцагны тос", "Цэвэр хөвөн гол", "5–8% анхилуун үнэр", "Гар аргаар цутгасан", "Шилэн, керамик сав", "2020 оноос"];

export default function Home() {
  const banner = banners[0];
  const own = collections.filter((c) => c.group === "own" && c.count > 0);
  const sale = products.filter((p) => onSale(p) && !soldOut(p)).slice(0, 8);
  const spotlight = getProduct("evening-in-paris")!;
  const ldc = inCollection("ldc");
  const amoln = inCollection("amoln");
  const care = faq.filter((f) => !/үүссэн/.test(f.q));

  // hero slides: the owner's banner first, then own and brand candles (one photo each)
  const slide = (slug: string): Slide => {
    const p = getProduct(slug)!;
    const c = getCollection(p.collection)!;
    return {
      src: p.images[0].src,
      alt: p.name,
      label: c.group === "brand" ? `${c.name} · ${c.origin}` : c.name,
      product: { slug: p.slug, name: p.name, thumb: p.images[0].thumb.src, price: p.price, collection: c.name },
    };
  };
  const slides: Slide[] = [
    ...(banner ? [{ src: banner.image.src, alt: "Candle Boutique лаа модон ширээн дээр", label: "Limited Edition", product: { slug: spotlight.slug, name: spotlight.name, thumb: spotlight.images[0].thumb.src, price: spotlight.price, collection: "Memories Collection" } }] : []),
    ...["provocateur", "evening-in-paris", "sisu-bouquet", "dark-rose-amber", "prima-donna", "minimal-green", "kassett", "matte-black-intense", "rose"].map(slide),
  ];

  return (
    <>
      {/* hero: the owner's own photo from the Zochil home banner, framed as an arch */}
      <section className="grain overflow-hidden">
        <div className="wrap grid items-center gap-10 pt-8 pb-14 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pt-14 md:pb-20">
          <div className="rise order-2 md:order-1">
            <p className="eyebrow flex items-center gap-2 text-ember">
              <Flame size={14} /> Улаанбаатар · {business.since} оноос
            </p>
            <h1 className="serif mt-5 text-[2.7rem] leading-[1.05] font-medium sm:text-6xl lg:text-[4.6rem]">
              Хайраар <em className="text-ember">урласан</em>
              <br />
              лаа
            </h1>
            <p className="mt-6 max-w-lg text-[17.5px] leading-relaxed text-ink-2">
              Тосоо хайлуулж, хүссэн үнэрээ шингээн, гар аргаар цутгасан лаа. Дээр нь Lauren Dickinson Clarke, Amoln брэндийн албан ёсны борлуулагч.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn btn-ember">
                Лаа сонгох <ArrowIcon size={18} />
              </Link>
              <Link href="#collections" className="btn btn-line">
                Цуглуулгууд
              </Link>
            </div>
            <ul className="mt-10 grid max-w-xl grid-cols-3 gap-2.5 sm:gap-4" aria-label="Товч мэдээлэл">
              {[
                { icon: <Flame size={16} still />, label: "Өөрийн цуглуулга", value: String(own.length), note: "гар аргаар" },
                { icon: <StarIcon size={18} />, label: "Албан ёсны брэнд", value: "2", note: "Англи, Швед" },
                { icon: <TruckIcon size={18} />, label: "Хүргэлт", value: "24 цаг", note: "Улаанбаатарт" },
              ].map((s) => (
                <li
                  key={s.label}
                  className="relative flex flex-col rounded-2xl border-2 border-glow bg-gradient-to-b from-cream to-wax px-3 pt-3 pb-3.5 shadow-[0_14px_34px_-18px_rgb(214_150_60/0.9)] sm:px-4 sm:pt-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-glow/35 text-ember ring-1 ring-glow">{s.icon}</span>
                  <span className="serif mt-3 text-[1.7rem] leading-none text-ink sm:text-[2.1rem]">{s.value}</span>
                  <span className="mt-2 text-[12.5px] leading-tight font-semibold text-ink-2 sm:text-[13.5px]">{s.label}</span>
                  <span className="mt-0.5 text-[11.5px] text-mute">{s.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <HeroSlider slides={slides} />
          </div>
        </div>
      </section>

      {/* what the candles are made of */}
      <div className="border-y border-sand bg-linen">
        <ul className="no-scrollbar wrap flex gap-8 overflow-x-auto py-4 text-[14px] whitespace-nowrap text-ink-2 md:justify-between">
          {FACTS.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" aria-hidden /> {f}
            </li>
          ))}
        </ul>
      </div>

      {/* own collections */}
      <section id="collections" className="wrap scroll-mt-28 pt-20">
        <SectionHead eyebrow="Candle Boutique лаа" title="Цуглуулгууд" more={{ href: "/shop?c=own", label: "Бүгдийг үзэх" }} />
        <div className="no-scrollbar -mx-4 mt-9 flex snap-x gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 lg:grid-cols-7 lg:gap-4">
          {own.map((c) => {
            const list = inCollection(c.id);
            const cover = list[0].images[0];
            return (
              <Link key={c.id} href={`/shop?c=${c.id}`} className="group w-[42vw] max-w-[190px] shrink-0 snap-start md:w-auto md:max-w-none">
                <span className="lift frame relative block aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl">
                  <Image src={cover.thumb.src} alt="" fill sizes="(min-width: 1024px) 14vw, (min-width: 768px) 24vw, 42vw" className="object-cover" />
                </span>
                <span className="serif mt-3 block text-[1.08rem] leading-tight group-hover:text-ember">{c.name.replace(/ Collection$/, "").replace(/^The /, "")}</span>
                <span className="tnum mt-0.5 block text-[13px] text-mute">
                  {c.count} лаа · {formatPrice(fromPrice(list))}-с
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* on sale */}
      {sale.length > 0 && (
        <section className="wrap pt-24">
          <SectionHead eyebrow="Хямдралтай" title="Одоо 30% хямд" more={{ href: "/shop", label: "Дэлгүүр" }} />
          <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {sale.map((p, i) => (
              <ProductCard key={p.slug} p={p} priority={i < 2} />
            ))}
          </div>
        </section>
      )}

      {/* scent notes explained on a real candle */}
      <section className="mt-24 bg-linen">
        <div className="wrap grid items-center gap-12 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow text-ember">Үнэрийн гурван давхарга</p>
            <h2 className="serif mt-4 text-4xl leading-tight md:text-5xl">Лаа бүр асахдаа гурван удаа өөрчлөгддөг</h2>
            <p className="mt-5 max-w-md text-ink-2">
              Дээд үнэр нь лааг асаасан даруйд, дунд үнэр нь тос жигд хайлах үед, суурь үнэр нь унтарсны дараа ч өрөөнд үлддэг. Лаа бүрийн хуудсанд гурван давхаргыг нь бичсэн.
            </p>
            <Link href={`/p/${spotlight.slug}`} className="mt-7 inline-flex items-center gap-4 rounded-2xl bg-wax p-3 pr-5 ring-1 ring-sand transition hover:ring-ember">
              <span className="frame relative h-20 w-20 overflow-hidden rounded-xl">
                <Image src={spotlight.images[0].thumb.src} alt="" fill sizes="80px" className="object-cover" />
              </span>
              <span>
                <span className="serif block text-xl">{spotlight.name}</span>
                <span className="block text-[13.5px] text-mute">«{spotlight.scent}» · 200 гр · 48 цаг</span>
              </span>
              <ArrowIcon size={18} className="ml-2 text-ember" />
            </Link>
          </div>
          {spotlight.notes && <NotesPyramid notes={spotlight.notes} />}
        </div>
      </section>

      {/* official brands */}
      <section className="bg-night text-cream">
        <div className="wrap py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-glow">Албан ёсны борлуулагч</p>
              <h2 className="serif mt-3 text-4xl md:text-5xl">Дэлхийн брэндүүд, албан ёсны эрхтэйгээр</h2>
            </div>
            <Link href="/shop?c=brand" className="btn btn-line text-cream">
              Брэндүүд <ArrowIcon size={18} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { c: collections.find((x) => x.id === "ldc")!, list: ldc },
              { c: collections.find((x) => x.id === "amoln")!, list: amoln },
            ].map(({ c, list }) => (
              <Link key={c.id} href={`/shop?c=${c.id}`} className="group overflow-hidden rounded-[26px] bg-night-2 ring-1 ring-white/8">
                <div className="grid grid-cols-2 gap-1 bg-[#efedf3]">
                  {list.slice(0, 2).map((p) => (
                    <span key={p.slug} className="lift relative aspect-square overflow-hidden">
                      <Image src={p.images[0].thumb.src} alt={p.name} fill sizes="(min-width: 768px) 24vw, 46vw" className="object-cover" />
                    </span>
                  ))}
                </div>
                <div className="p-6">
                  <p className="eyebrow text-[11px] text-glow">{c.origin}</p>
                  <h3 className="serif mt-2 text-2xl group-hover:text-glow">{c.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-cream/70">{c.blurb}</p>
                  <p className="tnum mt-4 text-[14px] text-cream/60">
                    {c.count} лаа · {formatPrice(fromPrice(list))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* journal */}
      <section className="wrap pt-24">
        <SectionHead eyebrow="Тэмдэглэл" title="Лаа, үнэр, гэр" more={{ href: "/journal", label: "Бүх нийтлэл" }} />
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
              <span className="lift frame relative block aspect-[4/3] overflow-hidden rounded-[22px]">
                {p.cover && <Image src={p.cover.src} alt="" fill sizes="(min-width: 768px) 31vw, 92vw" className="object-cover" />}
              </span>
              <span className="tnum mt-4 block text-[13px] text-mute">{formatDate(p.date)}</span>
              <span className="serif mt-1 block text-xl leading-snug group-hover:text-ember">{p.title}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* care + visit */}
      <section className="wrap grid gap-6 pt-24 md:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[26px] bg-linen p-7 md:p-10">
          <p className="eyebrow text-ember">Лаа арчлах</p>
          <h2 className="serif mt-3 text-3xl md:text-4xl">Лаагаа удаан, жигд асаах</h2>
          <ol className="mt-7 space-y-6">
            {care.map((f, i) => (
              <li key={f.q} className="flex gap-4">
                <span className="serif grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wax text-lg text-ember ring-1 ring-sand">{i + 1}</span>
                <div>
                  <p className="font-semibold">{sentence(f.q)}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-col justify-between rounded-[26px] bg-ember p-7 text-white md:p-10">
          <div>
            <p className="eyebrow text-cream/80">Ирж үнэрлээрэй</p>
            <h2 className="serif mt-3 text-3xl md:text-4xl">{business.store.name}</h2>
            <p className="mt-4 flex gap-2.5 text-[15.5px] leading-relaxed text-white/90">
              <PinIcon size={20} className="mt-1 shrink-0" /> {business.store.address}
            </p>
          </div>
          <div className="mt-8 space-y-3 text-[15px]">
            <p className="flex items-center gap-2.5 text-white/85">
              <LeafIcon size={18} /> Шар буурцагны тос, цэвэр хөвөн гол
            </p>
            <p className="flex items-center gap-2.5 text-white/85">
              <ClockIcon size={18} /> Хүргэлт 24 цагт, {formatPrice(business.delivery[0].fee)}
            </p>
            <a href={`tel:${business.store.phone.tel}`} className="btn mt-3 bg-wax text-ink hover:bg-cream">
              Утас {business.store.phone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/** «ШИНЭ ЛААГ ...» → «Шинэ лааг ...» (the FAQ titles are all caps on Zochil). */
function sentence(s: string) {
  const t = s.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function SectionHead({ eyebrow, title, more }: { eyebrow: string; title: string; more?: { href: string; label: string } }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow text-ember">{eyebrow}</p>
        <h2 className="serif mt-3 text-4xl leading-tight md:text-5xl">{title}</h2>
      </div>
      {more && (
        <Link href={more.href} className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-ember">
          {more.label} <ArrowIcon size={18} className="transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
