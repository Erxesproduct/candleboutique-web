"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo } from "@/lib/catalog";

export function Gallery({ images, name }: { images: Photo[]; name: string }) {
  const [i, setI] = useState(0);
  const img = images[i];
  return (
    <div className="md:sticky md:top-32">
      <div className="frame relative aspect-square overflow-hidden rounded-t-[999px] rounded-b-[28px] md:aspect-[4/5]">
        <Image key={img.src} src={img.src} alt={i ? `${name}, зураг ${i + 1}` : name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="rise object-cover" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3" role="tablist" aria-label="Зургууд">
          {images.map((m, k) => (
            <button
              key={m.src}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-label={`Зураг ${k + 1}`}
              onClick={() => setI(k)}
              className="frame relative h-20 w-20 overflow-hidden rounded-2xl opacity-60 ring-1 ring-sand transition hover:opacity-100 aria-selected:opacity-100 aria-selected:ring-2 aria-selected:ring-ember"
            >
              <Image src={m.thumb.src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
