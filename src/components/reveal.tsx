"use client";

import { useEffect, useRef } from "react";

/**
 * Fades its children up when they scroll into view. Only elements that start below the fold are hidden
 * (class added after mount), so without JS, or above the fold, nothing ever disappears.
 */
export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: { children: React.ReactNode; delay?: number; className?: string; as?: "div" | "li" | "section" | "article" }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.classList.add("reveal-armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref as never} className={className} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

/** Embers drifting up from the bottom of a dark header. Positions are fixed so server and client match. */
export function Embers({ count = 14 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: count }, (_, k) => (
        <span
          key={k}
          className="ember-dot"
          style={
            {
              left: `${(k * 37 + 11) % 100}%`,
              "--d": `${(k * 0.73) % 6}s`,
              "--t": `${6 + ((k * 1.3) % 4)}s`,
              "--dx": `${((k % 5) - 2) * 18}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Thin ember line across the top that fills as the reader scrolls through the article. */
export function ReadProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div ref={ref} className="read-progress fixed inset-x-0 top-0 z-50 h-[3px] scale-x-0 bg-gradient-to-r from-glow via-ember to-ember" aria-hidden />;
}
