import Image from "next/image";
import Link from "next/link";
import { business } from "@/content/business";
import { CartLink } from "./cart-link";

const NAV = [
  { href: "/shop", label: "Дэлгүүр" },
  { href: "/shop?c=own", label: "Манай лаа" },
  { href: "/shop?c=brand", label: "Брэндүүд" },
  { href: "/journal", label: "Тэмдэглэл" },
  { href: "/info", label: "Бидний тухай" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand/70 bg-wax/90 backdrop-blur-md">
      <div className="bg-night text-center text-[12.5px] tracking-wide text-cream/85">
        <p className="wrap py-1.5">
          Улаанбаатарт 24 цагийн дотор хүргэнэ · <a href={`tel:${business.phone.tel}`} className="font-semibold text-glow hover:underline">{business.phone.display}</a>
        </p>
      </div>
      <div className="wrap flex h-16 items-center gap-4 md:h-[74px]">
        <Link href="/" className="shrink-0" aria-label={`${business.name}, нүүр хуудас`}>
          <Image src="/brand/logo.png" alt={business.name} width={847} height={200} priority className="h-9 w-auto md:h-11" />
        </Link>
        <nav aria-label="Үндсэн цэс" className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-4 py-2 text-[15px] font-medium text-ink-2 transition hover:bg-linen hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto lg:ml-2">
          <CartLink />
        </div>
      </div>
      <nav aria-label="Үндсэн цэс" className="no-scrollbar -mt-1 flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className="shrink-0 rounded-full bg-linen px-3.5 py-1.5 text-[13.5px] font-medium text-ink-2">
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
