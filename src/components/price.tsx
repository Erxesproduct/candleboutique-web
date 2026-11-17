import { discount, onSale, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

export function Price({ p, large }: { p: Pick<Product, "price" | "compareAt">; large?: boolean }) {
  return (
    <span className={`tnum inline-flex flex-wrap items-baseline gap-x-2 ${large ? "text-2xl" : "text-[15.5px]"}`}>
      <span className={`font-semibold ${onSale(p) ? "text-ember" : "text-ink"}`}>{formatPrice(p.price)}</span>
      {onSale(p) && (
        <>
          <s className={`text-mute ${large ? "text-base" : "text-[13px]"}`}>{formatPrice(p.compareAt!)}</s>
          {large && <span className="rounded-full bg-ember/10 px-2 py-0.5 text-[13px] font-semibold text-ember">−{discount(p)}%</span>}
        </>
      )}
    </span>
  );
}
