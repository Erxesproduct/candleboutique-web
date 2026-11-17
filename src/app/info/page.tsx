import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CandleRow } from "@/components/candle-row";
import { ArrowIcon, ClockIcon, Flame, LeafIcon, MailIcon, PhoneIcon, PinIcon, StarIcon, TruckIcon } from "@/components/icons";
import { Embers, Reveal } from "@/components/reveal";
import { business } from "@/content/business";
import { about, aboutImage, collections, faq, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Бидний тухай",
  description: "Candle Boutique-ийн түүх, хүргэлт ба төлбөрийн нөхцөл, лаа арчлах заавар, холбоо барих.",
  alternates: { canonical: "/info" },
};

const sentence = (s: string) => {
  const t = s.toLowerCase();
  return t.charAt(0).toUpperCase() + t.slice(1);
};

/** What the candles are made of, in the shop's own words (About page and product texts). */
const VALUES = [
  { icon: <LeafIcon size={22} />, title: "Байгальд ээлтэй сав", text: "Зөвхөн байгальд ээлтэй шилэн савлагаа ашигладаг.", bg: "#e7ecdf", fg: "#4f5d48", ring: "#6c7c64" },
  { icon: <Flame size={20} still />, title: "Цэвэр хөвөн гол", text: "Ямар нэгэн синтетикийн хольцгүй цэвэр хөвөнгөөр хийсэн гол.", bg: "#fbecd2", fg: "#8a5a1c", ring: "#f2c27b" },
  { icon: <StarIcon size={20} />, title: "Шар буурцагны тос", text: "Цэвэр шар буурцагны тос, 5–8% анхилуун үнэр, эфирийн тос.", bg: "#f6e2d6", fg: "#8a4520", ring: "#a5552a" },
  { icon: <ClockIcon size={20} />, title: "Гар аргаар, хайраар", text: "Тосоо хайлуулж, үнэрээ шингээн лаа бүрийг гараар цутгадаг.", bg: "#efe6f0", fg: "#6a4a6e", ring: "#a184a5" },
];

export default function Info() {
  const own = collections.filter((c) => c.group === "own").length;
  const [intro, ...story] = about.mn;
  return (
    <div>
      {/* hero: dark room, candles floating, embers rising */}
      <section id="about" className="relative scroll-mt-32 overflow-hidden bg-night text-cream">
        <Embers count={18} />
        <div className="glow-pulse pointer-events-none absolute -top-40 -left-20 h-[560px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgb(242_180_92/0.3),rgb(242_180_92/0.06)_60%,transparent)]" aria-hidden />
        <div className="wrap relative grid items-end gap-10 pt-14 md:grid-cols-[1.2fr_1fr] md:pt-20">
          <div className="pb-14 md:pb-20">
            <p className="eyebrow flex items-center gap-2 text-glow">
              <Flame size={13} /> Бидний түүх · {business.since} оноос
            </p>
            <h1 className="serif rise mt-5 text-5xl leading-[1.04] md:text-7xl">
              Хүүхэд насны <em className="text-glow">мөрөөдөл</em> гэрэл болсон нь
            </h1>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-cream/75">{intro}</p>
          </div>
          <div className="floaty hidden pb-0 md:block">
            <CandleRow set="band" />
            <div className="h-2.5 rounded-full bg-gradient-to-b from-[#5a4334] to-[#3a2c24]" aria-hidden />
          </div>
        </div>
      </section>

      {/* numbers on a gold strip */}
      <div className="bg-[linear-gradient(90deg,#f2c27b,#f6d39a,#f2c27b)]">
        <ul className="wrap grid grid-cols-2 gap-y-4 py-6 text-ink md:grid-cols-4">
          {[
            [String(business.since), "онд үүсгэн байгуулсан"],
            [String(own), "өөрийн цуглуулга"],
            ["2", "албан ёсны брэнд"],
            [String(products.length), "төрлийн лаа, хэрэгсэл"],
          ].map(([n, l], i) => (
            <Reveal key={l} as="li" delay={i * 100} className="flex items-baseline gap-2.5">
              <span className="serif text-4xl md:text-5xl">{n}</span>
              <span className="text-[14px] font-semibold text-ink-2">{l}</span>
            </Reveal>
          ))}
        </ul>
      </div>

      {/* story with the photo in a gold arch */}
      <section className="wrap mt-20 grid items-start gap-12 md:grid-cols-[1fr_1.15fr]">
        <Reveal className="md:sticky md:top-32">
          {aboutImage && (
            <div className="relative mx-auto max-w-md">
              <div className="halo breathe pointer-events-none absolute -inset-10 -z-10" aria-hidden />
              <div className="frame relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] ring-4 ring-glow/70 ring-offset-4 ring-offset-wax">
                <Image src={aboutImage.src} alt="Candle Boutique" fill sizes="(min-width: 768px) 40vw, 92vw" className="kenburns object-cover" />
              </div>
              <span className="floaty absolute -right-2 -bottom-5 rounded-2xl bg-ember px-4 py-3 text-white shadow-xl md:-right-6">
                <span className="serif block text-2xl leading-none">{business.since}</span>
                <span className="text-[12px] text-white/85">оноос хойш</span>
              </span>
            </div>
          )}
        </Reveal>
        <div className="prose-candle text-[17.5px]">
          {story.map((l, i) => (
            <Reveal key={l} delay={i * 80}>
              <p>{l}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="serif mt-8! text-2xl text-ember! italic">Хайраар урласан, Candle Boutique</p>
          </Reveal>
        </div>
      </section>

      {/* pull quote */}
      <Reveal className="wrap mt-20">
        <figure className="relative overflow-hidden rounded-[34px] bg-[radial-gradient(120%_140%_at_0%_0%,#fff4dc_0%,#f6ddb0_45%,#eec587_100%)] px-6 py-14 text-center md:px-20 md:py-20">
          <span className="serif pointer-events-none absolute -top-10 left-4 text-[12rem] leading-none text-ember/15 md:left-10" aria-hidden>
            “
          </span>
          <blockquote className="serif relative text-3xl leading-snug text-ink md:text-[2.7rem]">Үнэрлэхүй мэдрэмж хүнд маш гүн гүнзгий дурсамж бий болгодог.</blockquote>
          <figcaption className="relative mt-6 text-[14.5px] font-semibold text-ink-2">Тиймээс бид олон төрлийн цуглуулга гаргахыг зорин ажилладаг</figcaption>
        </figure>
      </Reveal>

      {/* values in four colours */}
      <section className="wrap mt-20">
        <Reveal>
          <p className="eyebrow text-ember">Бидний лаа</p>
          <h2 className="serif mt-3 text-4xl md:text-5xl">Юунаас бүтдэг вэ</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 110}>
              <div className="group h-full rounded-[26px] p-6 transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-34px_rgb(60_30_10/0.6)]" style={{ background: v.bg, color: v.fg }}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 ring-2 transition group-hover:rotate-6" style={{ ["--tw-ring-color" as string]: v.ring }}>
                  {v.icon}
                </span>
                <h3 className="serif mt-5 text-2xl text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <details className="mt-8 rounded-2xl bg-linen p-5">
            <summary className="cursor-pointer font-semibold text-ink">Our story in English</summary>
            <div className="prose-candle">
              {about.en.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="serif text-ink! italic">Lovingly crafted by, Candle Boutique</p>
            </div>
          </details>
        </Reveal>
      </section>

      {/* delivery & payment */}
      <section id="delivery" className="relative mt-24 scroll-mt-32 overflow-hidden bg-sage text-white">
        <div className="pointer-events-none absolute -right-24 -bottom-32 h-80 w-80 rounded-full bg-white/10" aria-hidden />
        <div className="wrap relative py-20">
          <Reveal>
            <p className="eyebrow text-[#e3ead9]">Хүргэлт, төлбөр</p>
            <h2 className="serif mt-3 text-4xl md:text-5xl">Захиалгаас гэр хүртэл</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {business.delivery.map((d, i) => (
              <Reveal key={d.id} delay={i * 120}>
                <div className="h-full rounded-[24px] bg-wax p-6 text-ink shadow-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage/15 text-sage">
                    <TruckIcon size={20} />
                  </span>
                  <p className="serif mt-4 text-2xl">{d.name}</p>
                  <p className="tnum mt-1 text-xl font-semibold text-ember">{formatPrice(d.fee)}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{d.id === "city" ? business.rules.delivery : business.rules.countryside}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={240}>
              <div className="h-full rounded-[24px] bg-night p-6 text-cream shadow-lg">
                <span className="rounded-md bg-[#e6332a] px-2 py-1 text-xs font-black text-white">QPay</span>
                <p className="mt-4 text-[15px] leading-relaxed text-cream/80">{business.rules.payment}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-cream/80">{business.rules.ebarimt}</p>
              </div>
            </Reveal>
          </div>
          <p className="mt-6 text-[14.5px] text-white/75">{business.rules.terms}</p>
        </div>
      </section>

      {/* care as an accordion */}
      <section id="care" className="wrap mt-24 scroll-mt-32">
        <Reveal>
          <p className="eyebrow text-ember">Лаа арчлах</p>
          <h2 className="serif mt-3 text-4xl md:text-5xl">Түгээмэл асуулт</h2>
        </Reveal>
        <div className="mt-10 space-y-3">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={i * 90}>
              <details className="group rounded-[22px] bg-linen ring-1 ring-sand transition open:bg-cream open:ring-glow" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 md:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-wax ring-1 ring-glow">
                    <Flame size={16} still />
                  </span>
                  <span className="serif flex-1 text-xl leading-snug">{sentence(f.q)}</span>
                  <span className="text-2xl text-ember transition duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="px-5 pb-6 text-[15.5px] leading-relaxed text-ink-2 md:pl-[5.5rem]">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* contact */}
      <section id="contact" className="wrap mt-24 scroll-mt-32">
        <Reveal>
          <div className="relative grid gap-8 overflow-hidden rounded-[32px] bg-ember p-8 text-white md:grid-cols-2 md:p-12">
            <Embers count={10} />
            <div className="relative">
              <p className="eyebrow text-cream/80">Холбоо барих</p>
              <h2 className="serif mt-3 text-4xl">Асуух зүйл байна уу?</h2>
              <p className="mt-3 text-white/85">Захиалга, бэлэг, байгууллагын захиалгаар утсаар эсвэл Facebook-ээр холбогдоорой.</p>
              <Link href="/shop" className="btn mt-6 bg-wax text-ink hover:bg-cream">
                Лаа сонгох <ArrowIcon size={18} />
              </Link>
            </div>
            <ul className="relative space-y-4 text-[16px]">
              <li>
                <a href={`tel:${business.phone.tel}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 hover:bg-white/15">
                  <PhoneIcon size={20} /> {business.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 break-all hover:bg-white/15">
                  <MailIcon size={20} /> {business.email}
                </a>
              </li>
              <li>
                <a href={business.store.mapUrl} target="_blank" rel="noreferrer" className="flex gap-3 rounded-2xl bg-white/10 p-4 hover:bg-white/15">
                  <PinIcon size={20} className="mt-0.5 shrink-0" />
                  <span>
                    {business.store.name}: {business.store.address}. Утас {business.store.phone.display}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
