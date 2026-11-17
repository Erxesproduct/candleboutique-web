"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";

export type Slide = {
  src: string;
  alt: string;
  /** Label over the photo (collection / brand). */
  label: string;
  product: { slug: string; name: string; thumb: string; price: number; collection: string } | null;
};

/** Each candle stays 6.5 s, then cross-fades for 2 s. No controls: it runs by itself. */
const EVERY = 6500;

/** The hero arch: the owner's banner, then own and brand candles, slowly cross-fading with a gentle zoom. */
export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), EVERY);
    return () => clearTimeout(t);
  }, [i, slides.length]);

  const card = slides[i].product;

  return (
    <div className="relative">
      <div className="halo breathe pointer-events-none absolute -inset-10 -z-10" aria-hidden />
      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-linen shadow-[0_30px_80px_-30px_rgb(90_50_20/0.45)] ring-1 ring-glow/40"
        role="region"
        aria-roledescription="carousel"
        aria-label="Онцлох лаанууд"
      >
        {slides.map((s, k) => (
          <div key={s.src} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${k === i ? "opacity-100" : "opacity-0"}`} aria-hidden={k !== i}>
            <Image src={s.src} alt={s.alt} fill priority={k === 0} sizes="(min-width: 768px) 46vw, 92vw" className={`object-cover ${k === i ? "kenburns" : ""}`} />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night/60 via-night/15 to-transparent" />
        <p key={slides[i].label} className="serif rise absolute right-6 bottom-6 text-right text-lg text-cream italic drop-shadow">
          {slides[i].label}
        </p>
      </div>

      {/* how long until the next candle: a thin line that fills, not a control */}
      <div className="mx-auto mt-5 flex max-w-[220px] items-center gap-3" aria-hidden>
        <span className="tnum serif text-[13px] text-mute">{String(i + 1).padStart(2, "0")}</span>
        <span className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-sand">
          <span key={i} className="slide-progress absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-glow to-ember" style={{ animationDuration: `${EVERY}ms` }} />
        </span>
        <span className="tnum serif text-[13px] text-mute">{String(slides.length).padStart(2, "0")}</span>
      </div>

      {card && (
        <Link
          key={card.slug}
          href={`/p/${card.slug}`}
          className="rise absolute bottom-16 left-0 flex max-w-[78%] items-center gap-3 rounded-2xl bg-wax/95 p-2.5 pr-4 shadow-xl ring-1 ring-glow/60 backdrop-blur sm:left-4 md:-left-8"
        >
          <span className="frame relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <Image src={card.thumb} alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11.5px] text-mute">{card.collection}</span>
            <span className="serif block truncate leading-tight">{card.name}</span>
            <span className="tnum text-[13.5px] font-semibold text-ember">{formatPrice(card.price)}</span>
          </span>
        </Link>
      )}
    </div>
  );
}
