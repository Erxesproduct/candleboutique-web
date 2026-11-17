/**
 * A row of lit pillar candles with wax drips, each flame flickering on its own rhythm and throwing a warm halo.
 * Pure SVG + CSS (no JS); motion stops under prefers-reduced-motion.
 */
type Candle = { h: number; w: number; wax: string; shade: string; delay: number; speed: number };

const SETS: Record<"footer" | "band", Candle[]> = {
  footer: [
    { h: 46, w: 26, wax: "#f3e6cf", shade: "#dcc9a8", delay: 0.4, speed: 2.3 },
    { h: 78, w: 34, wax: "#fbf3e4", shade: "#e4d3b6", delay: 0, speed: 2.8 },
    { h: 58, w: 30, wax: "#efd9b6", shade: "#d6bb8f", delay: 1.1, speed: 2.5 },
    { h: 104, w: 38, wax: "#fff6e6", shade: "#e8d6b8", delay: 0.7, speed: 3.1 },
    { h: 64, w: 30, wax: "#f6e7cc", shade: "#dfc7a1", delay: 1.6, speed: 2.6 },
    { h: 40, w: 24, wax: "#ead2ab", shade: "#cfb285", delay: 0.2, speed: 2.2 },
    { h: 86, w: 34, wax: "#fbf1df", shade: "#e3d0b0", delay: 1.3, speed: 2.9 },
  ],
  band: [
    { h: 50, w: 24, wax: "#f3e6cf", shade: "#dcc9a8", delay: 0.5, speed: 2.4 },
    { h: 84, w: 32, wax: "#fff6e6", shade: "#e8d6b8", delay: 0, speed: 2.9 },
    { h: 62, w: 28, wax: "#efd9b6", shade: "#d6bb8f", delay: 1.2, speed: 2.6 },
  ],
};

function PillarCandle({ c, id }: { c: Candle; id: string }) {
  const W = 80;
  const H = c.h + 70;
  const x = (W - c.w) / 2;
  const top = 62;
  // a few wax drips running down from the rim
  const drips = `M${x} ${top + 4} q0 -4 4 -4 h${c.w - 8} q4 0 4 4 v${c.h * 0.18} q-2.5 5 -5 0 v-${c.h * 0.08} q-3 ${c.h * 0.3} -6 0 v-${c.h * 0.04} h-${c.w * 0.3} q-2 ${c.h * 0.14} -4 0 h-${c.w * 0.2} q-2.5 ${c.h * 0.22} -5 0 Z`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-[52px] sm:w-[66px] md:w-[80px]" aria-hidden>
      <defs>
        <radialGradient id={`h-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#f6c77d" stopOpacity=".75" />
          <stop offset=".45" stopColor="#f2b45c" stopOpacity=".22" />
          <stop offset="1" stopColor="#f2b45c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`b-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor={c.shade} />
          <stop offset=".35" stopColor={c.wax} />
          <stop offset=".7" stopColor={c.wax} />
          <stop offset="1" stopColor={c.shade} />
        </linearGradient>
        <linearGradient id={`f-${id}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e8862f" />
          <stop offset=".55" stopColor="#f6b552" />
          <stop offset="1" stopColor="#ffe3a3" />
        </linearGradient>
      </defs>
      {/* halo */}
      <circle cx={W / 2} cy={34} r={34} fill={`url(#h-${id})`} className="breathe" style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.speed + 1}s`, transformOrigin: `${W / 2}px 34px` }} />
      {/* body */}
      <rect x={x} y={top} width={c.w} height={c.h + 8} rx="3" fill={`url(#b-${id})`} />
      <path d={drips} fill={c.wax} />
      <ellipse cx={W / 2} cy={top + 1} rx={c.w / 2 - 1} ry="3" fill={c.shade} opacity=".55" />
      {/* inner glow of the melted pool */}
      <ellipse cx={W / 2} cy={top + 2} rx={c.w / 3} ry="2" fill="#ffd28a" opacity=".55" className="breathe" style={{ animationDelay: `${c.delay}s` }} />
      {/* wick */}
      <path d={`M${W / 2} ${top} q1 -5 -0.5 -9`} stroke="#2b211c" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* flame */}
      <g className="flicker" style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.speed}s`, transformOrigin: `${W / 2}px ${top - 8}px` }}>
        <path d={`M${W / 2} 22 C${W / 2 + 7} 33 ${W / 2 + 9} 40 ${W / 2 + 7} 46 C${W / 2 + 5} 53 ${W / 2 - 5} 53 ${W / 2 - 7} 46 C${W / 2 - 9} 40 ${W / 2 - 5} 32 ${W / 2} 22 Z`} fill={`url(#f-${id})`} />
        <path d={`M${W / 2} 35 C${W / 2 + 3} 40 ${W / 2 + 4} 44 ${W / 2 + 3} 47 C${W / 2 + 2} 50.5 ${W / 2 - 2} 50.5 ${W / 2 - 3} 47 C${W / 2 - 4} 44 ${W / 2 - 2} 40 ${W / 2} 35 Z`} fill="#fff6dc" />
        <ellipse cx={W / 2} cy={50} rx="2" ry="2.4" fill="#5b7fd6" opacity=".5" />
      </g>
    </svg>
  );
}

export function CandleRow({ set = "footer", className = "" }: { set?: "footer" | "band"; className?: string }) {
  const list = SETS[set];
  return (
    <div className={`flex items-end justify-center gap-1 sm:gap-3 ${className}`} aria-hidden>
      {list.map((c, i) => (
        <div key={i} className={i > 4 ? "hidden sm:block" : ""}>
          <PillarCandle c={c} id={`${set}${i}`} />
        </div>
      ))}
    </div>
  );
}
