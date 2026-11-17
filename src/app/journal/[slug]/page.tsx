import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import { getPost, lede, posts } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

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
  const next = posts[(posts.indexOf(p) + 1) % posts.length];
  return (
    <article className="pt-10 md:pt-14">
      <header className="wrap max-w-3xl text-center">
        <Link href="/journal" className="eyebrow text-ember hover:underline">
          Тэмдэглэл
        </Link>
        <h1 className="serif mt-4 text-4xl leading-tight md:text-5xl">{p.title}</h1>
        <p className="tnum mt-4 text-[14px] text-mute">{formatDate(p.date)}</p>
      </header>
      {p.cover && (
        <div className="wrap mt-10 max-w-5xl">
          <div className="frame relative overflow-hidden rounded-[28px]" style={{ aspectRatio: `${p.cover.w} / ${p.cover.h}`, maxHeight: "78vh" }}>
            <Image src={p.cover.src} alt="" fill priority sizes="(min-width: 1024px) 960px, 100vw" className="object-cover" />
          </div>
        </div>
      )}
      <div className="prose-candle wrap mt-6 max-w-2xl text-[17px]">
        {p.blocks.map((b, i) =>
          b.t === "img" ? (
            <Image key={i} src={b.src} alt="" width={b.w} height={b.h} sizes="(min-width: 768px) 672px, 100vw" className="mx-auto mt-8 h-auto w-full rounded-2xl" />
          ) : b.t === "h" ? (
            <h2 key={i}>{b.text}</h2>
          ) : (
            <p key={i}>{b.text}</p>
          ),
        )}
      </div>
      <div className="wrap mt-16 max-w-2xl border-t border-sand pt-8">
        <Link href={`/journal/${next.slug}`} className="group flex items-center justify-between gap-4">
          <span>
            <span className="text-[13px] text-mute">Дараагийн нийтлэл</span>
            <span className="serif block text-xl group-hover:text-ember">{next.title}</span>
          </span>
          <ArrowIcon size={22} className="shrink-0 text-ember transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
