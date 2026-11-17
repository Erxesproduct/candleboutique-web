import type { Metadata } from "next";
import Image from "next/image";
import { Flame, MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { business } from "@/content/business";
import { about, aboutImage, faq } from "@/lib/catalog";
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

export default function Info() {
  return (
    <div className="pt-10 md:pt-14">
      <section id="about" className="wrap grid scroll-mt-32 items-start gap-12 md:grid-cols-[1fr_1.1fr]">
        <div className="md:sticky md:top-32">
          <p className="eyebrow text-ember">Бидний түүх</p>
          <h1 className="serif mt-3 text-5xl leading-tight md:text-6xl">
            Хүүхэд насны <em className="text-ember">мөрөөдөл</em>
          </h1>
          {aboutImage && (
            <div className="frame relative mt-8 aspect-[4/5] max-w-md overflow-hidden rounded-t-[999px] rounded-b-[28px]">
              <Image src={aboutImage.src} alt="Candle Boutique" fill sizes="(min-width: 768px) 40vw, 92vw" className="object-cover" />
            </div>
          )}
        </div>
        <div className="prose-candle text-[17px]">
          {about.mn.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="serif mt-6! text-2xl text-ink! italic">Хайраар урласан, Candle Boutique</p>
          <details className="mt-8 rounded-2xl bg-linen p-5">
            <summary className="cursor-pointer font-semibold text-ink">In English</summary>
            {about.en.map((l) => (
              <p key={l}>{l}</p>
            ))}
            <p className="serif text-ink! italic">Lovingly crafted by, Candle Boutique</p>
          </details>
        </div>
      </section>

      <section id="delivery" className="mt-24 scroll-mt-32 bg-linen">
        <div className="wrap py-20">
          <p className="eyebrow text-ember">Хүргэлт, төлбөр</p>
          <h2 className="serif mt-3 text-4xl md:text-5xl">Захиалгаас гэр хүртэл</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {business.delivery.map((d) => (
              <div key={d.id} className="rounded-[22px] bg-wax p-6 ring-1 ring-sand">
                <p className="serif text-2xl">{d.name}</p>
                <p className="tnum mt-1 text-xl font-semibold text-ember">{formatPrice(d.fee)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{d.id === "city" ? business.rules.delivery : business.rules.countryside}</p>
              </div>
            ))}
            <div className="rounded-[22px] bg-night p-6 text-cream">
              <p className="serif text-2xl">QPay</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{business.rules.payment}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-cream/75">{business.rules.ebarimt}</p>
            </div>
          </div>
          <p className="mt-6 text-[14.5px] text-mute">{business.rules.terms}</p>
        </div>
      </section>

      <section id="care" className="wrap mt-24 scroll-mt-32">
        <p className="eyebrow text-ember">Лаа арчлах</p>
        <h2 className="serif mt-3 text-4xl md:text-5xl">Түгээмэл асуулт</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {faq.map((f) => (
            <div key={f.q} className="rounded-[22px] p-6 ring-1 ring-sand">
              <Flame size={18} still />
              <h3 className="serif mt-3 text-xl leading-snug">{sentence(f.q)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="wrap mt-24 scroll-mt-32">
        <div className="grid gap-8 rounded-[28px] bg-ember p-8 text-white md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow text-cream/80">Холбоо барих</p>
            <h2 className="serif mt-3 text-4xl">Асуух зүйл байна уу?</h2>
            <p className="mt-3 text-white/85">Захиалга, бэлэг, байгууллагын захиалгаар утсаар эсвэл Facebook-ээр холбогдоорой.</p>
          </div>
          <ul className="space-y-4 text-[16px]">
            <li>
              <a href={`tel:${business.phone.tel}`} className="flex items-center gap-3 hover:underline">
                <PhoneIcon size={20} /> {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all hover:underline">
                <MailIcon size={20} /> {business.email}
              </a>
            </li>
            <li>
              <a href={business.store.mapUrl} target="_blank" rel="noreferrer" className="flex gap-3 hover:underline">
                <PinIcon size={20} className="mt-0.5 shrink-0" />
                <span>
                  {business.store.name}: {business.store.address}. Утас {business.store.phone.display}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
