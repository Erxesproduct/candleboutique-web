"use client";

import Link from "next/link";
import { cartCount, useCart } from "@/lib/cart";
import { BagIcon } from "./icons";

export function CartLink() {
  const n = cartCount(useCart());
  return (
    <Link href="/cart" className="relative grid h-11 w-11 place-items-center rounded-full transition hover:bg-linen" aria-label={n ? `Сагс, ${n} бараа` : "Сагс"}>
      <BagIcon size={22} />
      {n > 0 && <span className="tnum absolute top-1 right-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-white">{n}</span>}
    </Link>
  );
}
