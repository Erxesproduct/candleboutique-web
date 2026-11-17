import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon, ClockIcon, Flame } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { Embers, ReadProgress, Reveal } from "@/components/reveal";
import { getCollection, getPost, groups, inCollection, lede, posts, products, soldOut } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { readMinutes, topicOf, TOPICS } from "@/lib/topics";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: lede(p).slice(0, 170),
    alternates: { canonical: `/journal/${p.slug}` },
    openGraph: { type: "article", title: p.title, images: p.cover ? [{ url: p.cover.src, width: p.cover.w, height: p.cover.h }] : [] },
  };
}

export default async function Post({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const topic = topicOf(p);
  const tp = TOPICS[topic.id];
  const k = posts.indexOf(p);
  const next = posts[(k + 1) % posts.length];
  const nextTp = TOPICS[topicOf(next).id];

  // candles the post talks about: a brand's collection, or our own in-stock candles
  const target = topic.shop?.split("c=")[1] ?? null;
  const related = target
    ? (groups.some((g) => g.id === target) ? products.filter((x) => getCollection(x.collection)?.group === target) : inCollection(target)).filter((x) => !soldOut(x)).slice(0, 4)
    : [];

  return (
    <article>
      <ReadProgress />
      {/* header in the topic's colour, embers rising */}
      <header className="relative overflow-hidden pb-40 md:pb-56" style={{ background: tp.bg, color: tp.fg }}>
        <Embers count={12} />
        <div className="glow-pulse pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_220_160/0.25),transparent)]" aria-hidden />
        <div className="wrap relative max-w-3xl pt-14 text-center md:pt-20">
          <Link href={`/journal?t=${topic.id}`} className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[12.5px] font-semibold ring-1 ring-white/25 hover:bg-white/20">
            <Flame size={12} still /> {tp.name}
          </Link>
          <h1 className="serif rise mt-5 text-4xl leading-tight md:text-6xl">{p.title}</h1>
          <p className="mt-5 flex items-center justify-center gap-4 text-[14px] opacity-80">
            <span className="tnum">{formatDate(p.date)}</span>
            <span className="flex items-center gap-1.5">
              <ClockIcon size={15} /> {readMinutes(p)} мин унших
            </span>
          </p>
        </div>
      </header>

      {p.cover && (
        <div className="wrap relative -mt-32 max-w-5xl md:-mt-48">
          <div className="rise frame relative overflow-hidden rounded-[30px] shadow-[0_40px_90px_-40px_rgb(40_20_10/0.7)] ring-4 ring-wax" style={{ aspectRatio: `${p.cover.w} / ${p.cover.h}`, maxHeight: "78vh" }}>
            <Image src={p.cover.src} alt="" fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="prose-candle dropcap wrap mt-10 max-w-2xl text-[17.5px]">
        {p.blocks.map((b, i) =>
          b.t === "img" ? (
            <Reveal key={i} className="mt-9">
              <Image src={b.src} alt="" width={b.w} height={b.h} sizes="(min-width: 768px) 672px, 100vw" className="mx-auto h-auto w-full rounded-[22px] shadow-[0_24px_50px_-30px_rgb(60_30_10/0.6)]" />
            </Reveal>
          ) : b.t === "h" ? (
            <h2 key={i} className="flex items-baseline gap-3">
              <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 translate-y-[-2px] rounded-full" style={{ background: tp.bg }} aria-hidden />
              {b.text}
            </h2>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-20 py-16" style={{ background: tp.tint }}>
          <div className="wrap">
            <Reveal>
              <p className="eyebrow text-ember">Нийтлэлд дурдсан</p>
              <h2 className="serif mt-2 text-3xl md:text-4xl">Эдгээр лааг үзээрэй</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
              {related.map((x, i) => (
                <Reveal key={x.slug} delay={i * 100}>
                  <ProductCard p={x} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className={`wrap max-w-3xl ${related.length ? "mt-14" : "mt-20"}`}>
        <Reveal>
          <Link href={`/journal/${next.slug}`} className="group relative flex items-center gap-5 overflow-hidden rounded-[28px] p-4 pr-6 transition hover:-translate-y-1" style={{ background: nextTp.bg, color: nextTp.fg }}>
            {next.cover && (
              <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl md:h-28 md:w-36">
                <Image src={next.cover.src} alt="" fill sizes="144px" className="object-cover transition duration-700 group-hover:scale-110" />
              </span>
            )}
            <span className="min-w-0">
              <span className="text-[12.5px] opacity-75">Дараагийн нийтлэл · {nextTp.name}</span>
              <span className="serif mt-1 block text-xl leading-snug md:text-2xl">{next.title}</span>
            </span>
            <ArrowIcon size={24} className="ml-auto shrink-0 transition group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
