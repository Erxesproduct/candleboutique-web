import type { Notes } from "@/lib/catalog";

const TIERS = [
  { key: "top", label: "Дээд үнэр", hint: "Асаахад эхэлж мэдрэгдэнэ" },
  { key: "heart", label: "Дунд үнэр", hint: "Лааны гол зан төрх" },
  { key: "base", label: "Суурь үнэр", hint: "Өрөөнд удаан үлдэнэ" },
] as const;

/** The three scent tiers drawn as a widening stack, like the pool of wax under a flame. */
export function NotesPyramid({ notes, dark }: { notes: Notes; dark?: boolean }) {
  return (
    <ol className="space-y-2.5">
      {TIERS.map((t, i) =>
        notes[t.key].length ? (
          <li key={t.key} className="mx-auto" style={{ width: `${72 + i * 14}%` }}>
            <div className={`rounded-2xl px-4 py-3 text-center ${dark ? "bg-white/7 ring-1 ring-white/10" : "bg-wax ring-1 ring-sand"}`}>
              <p className={`eyebrow text-[10.5px] ${dark ? "text-glow" : "text-ember"}`}>{t.label}</p>
              <p className={`serif mt-1 text-[1.05rem] leading-snug ${dark ? "text-cream" : "text-ink"}`}>{notes[t.key].join(" · ")}</p>
              <p className={`mt-0.5 text-[12px] ${dark ? "text-cream/50" : "text-mute"}`}>{t.hint}</p>
            </div>
          </li>
        ) : null,
      )}
    </ol>
  );
}
