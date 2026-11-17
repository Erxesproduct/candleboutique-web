import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { lede, posts } from "@/lib/catalog";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Тэмдэглэл",
  description: "Лааг гэртээ хаана байрлуулах, хуримын чимэглэл, Lauren Dickinson Clarke, Amoln брэндийн түүх: Candle Boutique-ийн тэмдэглэл.",
  alternates: { canonical: "/journal" },
};

export default function Journal() {
  const [first, ...rest] = posts;
  return (
    <div className="wrap pt-10 md:pt-14">
      <p className="eyebrow text-ember">Тэмдэглэл</p>
      <h1 className="serif mt-3 text-5xl md:text-6xl">Лаа, үнэр, гэр</h1>

      <Link href={`/journal/${first.slug}`} className="group mt-10 grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <span className="lift frame relative block aspect-[16/11] overflow-hidden rounded-[26px]">
          {first.cover && <Image src={first.cover.src} alt="" fill priority sizes="(min-width: 768px) 55vw, 92vw" className="object-cover" />}
        </span>
        <span>
          <span className="tnum text-[13.5px] text-mute">{formatDate(first.date)}</span>
          <span className="serif mt-2 block text-3xl leading-tight group-hover:text-ember md:text-4xl">{first.title}</span>
          <span className="mt-3 line-clamp-3 block text-ink-2">{lede(first)}</span>
        </span>
      </Link>

      <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link key={p.slug} href={`/journal/${p.slug}`} className="group">
            <span className="lift frame relative block aspect-[4/3] overflow-hidden rounded-[22px]">
              {p.cover && <Image src={p.cover.src} alt="" fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="object-cover" />}
            </span>
            <span className="tnum mt-4 block text-[13px] text-mute">{formatDate(p.date)}</span>
            <span className="serif mt-1 block text-xl leading-snug group-hover:text-ember">{p.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
