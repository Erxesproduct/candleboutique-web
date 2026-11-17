import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ClockIcon, Flame } from "@/components/icons";
import { Embers, Reveal } from "@/components/reveal";
import { lede, posts } from "@/lib/catalog";
import { formatDate } from "@/lib/format";
import { readMinutes, topicOf, TOPICS, type TopicId } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Тэмдэглэл",
  description: "Лааг гэртээ хаана байрлуулах, хуримын чимэглэл, Lauren Dickinson Clarke, Amoln брэндийн түүх: Candle Boutique-ийн тэмдэглэл.",
  alternates: { canonical: "/journal" },
};

type Props = { searchParams: Promise<{ t?: string }> };

export default async function Journal({ searchParams }: Props) {
  const { t } = await searchParams;
  const active = t && t in TOPICS ? (t as TopicId) : null;
  const list = active ? posts.filter((p) => topicOf(p).id === active) : posts;
  const [first, ...rest] = list;
  const counts = Object.fromEntries(Object.keys(TOPICS).map((k) => [k, posts.filter((p) => topicOf(p).id === k).length]));

  return (
    <div className="-mb-24 bg-[linear-gradient(180deg,#fbf7f0_0%,#f6ead8_45%,#fbf7f0_100%)] pb-24">
      {/* header: dark room, rising embers */}
      <section className="relative overflow-hidden bg-night text-cream">
        <Embers count={16} />
        <div className="glow-pulse pointer-events-none absolute -top-48 left-1/3 h-[520px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(242_180_92/0.3),rgb(242_180_92/0.06)_60%,transparent)]" aria-hidden />
        <div className="wrap relative py-14 md:py-20">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="eyebrow flex items-center gap-2 text-glow">
                <Flame size={13} /> Тэмдэглэл
              </p>
              <h1 className="serif mt-4 text-5xl leading-[1.05] md:text-7xl">
                Лаа, үнэр, <em className="text-glow">гэр</em>
              </h1>
              <p className="mt-4 max-w-xl text-cream/70">Лааг гэртээ хаана байрлуулах, хуримын чимэглэл, бидний борлуулдаг брэндүүдийн түүх.</p>
            </div>
            <div className="floaty hidden shrink-0 md:block">
              <Flame size={64} />
            </div>
          </div>
          <nav aria-label="Сэдэв" className="no-scrollbar -mx-4 mt-9 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            <Link href="/journal" aria-current={!active ? "page" : undefined} className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold ring-1 transition ${!active ? "bg-glow text-ink ring-glow" : "text-cream/80 ring-white/20 hover:bg-white/10"}`}>
              Бүгд · {posts.length}
            </Link>
            {(Object.keys(TOPICS) as TopicId[]).map((k) => (
              <Link
                key={k}
                href={`/journal?t=${k}`}
                aria-current={active === k ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14px] font-semibold ring-1 transition ${active === k ? "bg-glow text-ink ring-glow" : "text-cream/80 ring-white/20 hover:bg-white/10"}`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: TOPICS[k].chip }} aria-hidden />
                {TOPICS[k].name} · {counts[k]}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="wrap">
        {/* featured: photo with the title laid over a warm gradient */}
        {first && (
          <Reveal className="-mt-2 pt-10">
            <Link href={`/journal/${first.slug}`} className="group relative block overflow-hidden rounded-[32px] bg-night shadow-[0_40px_80px_-40px_rgb(90_50_20/0.7)]">
              <span className="relative block aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                {first.cover && <Image src={first.cover.src} alt="" fill priority sizes="(min-width: 1240px) 1180px, 100vw" className="object-cover transition duration-[1.6s] group-hover:scale-105" />}
                <span className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-transparent md:bg-gradient-to-r md:from-night/95 md:via-night/50" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-6 text-cream md:inset-y-0 md:right-auto md:flex md:max-w-xl md:flex-col md:justify-end md:p-12">
                <TopicChip id={topicOf(first).id} />
                <span className="serif mt-4 block text-3xl leading-tight md:text-5xl">{first.title}</span>
                <span className="mt-3 line-clamp-2 block text-cream/75 md:line-clamp-3">{lede(first)}</span>
                <span className="mt-5 flex items-center gap-4 text-[13.5px] text-cream/70">
                  <span className="tnum">{formatDate(first.date)}</span>
                  <span className="flex items-center gap-1.5">
                    <ClockIcon size={15} /> {readMinutes(first)} мин
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1.5 font-semibold text-glow md:ml-6">
                    Унших <ArrowIcon size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </span>
              </span>
            </Link>
          </Reveal>
        )}

        {/* the rest: cards tinted by topic, appearing as you scroll */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, k) => {
            const tp = TOPICS[topicOf(p).id];
            return (
              <Reveal key={p.slug} delay={(k % 3) * 120}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] ring-1 ring-black/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(90_50_20/0.55)]"
                  style={{ background: tp.tint }}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden">
                    {p.cover && <Image src={p.cover.src} alt="" fill sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" className="object-cover transition duration-[1.2s] group-hover:scale-[1.06]" />}
                    <span className="absolute top-4 left-4">
                      <TopicChip id={topicOf(p).id} />
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="serif block text-[1.4rem] leading-snug group-hover:text-ember">{p.title}</span>
                    <span className="mt-2 line-clamp-2 text-[14.5px] text-ink-2">{lede(p)}</span>
                    <span className="mt-auto flex items-center gap-4 pt-5 text-[13px] text-mute">
                      <span className="tnum">{formatDate(p.date)}</span>
                      <span className="flex items-center gap-1.5">
                        <ClockIcon size={14} /> {readMinutes(p)} мин
                      </span>
                      <ArrowIcon size={17} className="ml-auto text-ember transition group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-16">
          <div className="relative overflow-hidden rounded-[32px] bg-ember px-6 py-10 text-white md:px-12 md:py-14">
            <Embers count={10} />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="eyebrow text-cream/80">Уншаад сонирхол төрөв үү?</p>
                <p className="serif mt-2 text-3xl md:text-4xl">Өрөөндөө тохирох лаагаа сонгоорой</p>
              </div>
              <Link href="/shop" className="btn bg-wax text-ink hover:bg-cream">
                Дэлгүүр <ArrowIcon size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function TopicChip({ id }: { id: TopicId }) {
  const tp = TOPICS[id];
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold shadow-sm" style={{ background: tp.bg, color: tp.fg }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: tp.chip }} aria-hidden />
      {tp.name}
    </span>
  );
}
