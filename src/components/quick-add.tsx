"use client";

import { useState } from "react";
import { cart, maxQty } from "@/lib/cart";
import { CheckIcon, PlusIcon } from "./icons";

/** Round «+» on a product card: adds one to the cart, shows a tick for a moment. */
export function QuickAdd({ slug, name }: { slug: string; name: string }) {
  const [added, setAdded] = useState(false);
  if (maxQty(slug) <= 0) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        cart.add(slug);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className="grid h-11 w-11 place-items-center rounded-full bg-wax/95 text-ink shadow-md ring-1 ring-sand backdrop-blur transition hover:bg-ember hover:text-white"
      aria-label={`${name}: сагсанд нэмэх`}
    >
      {added ? <CheckIcon size={20} /> : <PlusIcon size={20} />}
      <span className="sr-only" aria-live="polite">
        {added ? "Сагсанд нэмэгдлээ" : ""}
      </span>
    </button>
  );
}
