import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { collections } from "@/lib/catalog";
import { CandleRow } from "./candle-row";
import { FacebookIcon, Flame, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-night text-cream/80">
      {/* candlelight: lit candles on a ledge, their glow washing over the footer */}
      <div className="glow-pulse pointer-events-none absolute top-0 left-1/2 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(242_180_92/0.28),rgb(242_180_92/0.08)_60%,transparent)]" aria-hidden />
      <div className="relative pt-10">
        <CandleRow />
        <div className="mx-auto h-3 max-w-2xl rounded-full bg-gradient-to-b from-[#5a4334] to-[#3a2c24] shadow-[0_10px_30px_-6px_rgb(242_180_92/0.35)]" aria-hidden />
        <p className="serif mt-6 text-center text-xl text-cream/90 italic md:text-2xl">Гэрээ дулаан гэрлээр дүүргээрэй</p>
      </div>
      <div className="wrap relative grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Image src="/brand/logo.png" alt={business.name} width={847} height={200} className="h-10 w-auto opacity-90 brightness-0 invert" />
          <p className="serif mt-5 text-xl text-cream italic">{business.tagline}</p>
          <p className="mt-2 max-w-xs text-[14.5px] leading-relaxed text-cream/65">{business.description}</p>
          <div className="mt-5 flex gap-2">
            <a href={business.facebook} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/8 hover:bg-white/15" aria-label="Facebook">
              <FacebookIcon size={18} />
            </a>
            <a href={business.instagram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/8 hover:bg-white/15" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>
        <div>
          <p className="eyebrow text-glow">Цуглуулга</p>
          <ul className="mt-4 space-y-2 text-[14.5px]">
            {collections.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?c=${c.id}`} className="hover:text-glow">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-glow">Мэдээлэл</p>
          <ul className="mt-4 space-y-2 text-[14.5px]">
            <li><Link href="/info#about" className="hover:text-glow">Бидний түүх</Link></li>
            <li><Link href="/info#delivery" className="hover:text-glow">Хүргэлт, төлбөр</Link></li>
            <li><Link href="/info#care" className="hover:text-glow">Лаа арчлах</Link></li>
            <li><Link href="/journal" className="hover:text-glow">Тэмдэглэл</Link></li>
            <li><Link href="/cart" className="hover:text-glow">Сагс</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-glow">Холбоо барих</p>
          <ul className="mt-4 space-y-3 text-[14.5px]">
            <li>
              <a href={`tel:${business.phone.tel}`} className="flex gap-2.5 hover:text-glow">
                <PhoneIcon size={18} className="mt-0.5 shrink-0" /> {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex gap-2.5 break-all hover:text-glow">
                <MailIcon size={18} className="mt-0.5 shrink-0" /> {business.email}
              </a>
            </li>
            <li>
              <a href={business.store.mapUrl} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-glow">
                <PinIcon size={18} className="mt-0.5 shrink-0" />
                <span>
                  {business.store.name}: {business.store.address}, утас {business.store.phone.display}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5 text-[13px] text-cream/50">
          <p>© {new Date().getFullYear()} {business.name}, Улаанбаатар</p>
          <p className="flex items-center gap-1">
            <Flame size={12} still /> {business.since} оноос гар аргаар
          </p>
        </div>
      </div>
    </footer>
  );
}
