import type { Post } from "./catalog";

/**
 * Journal topics, read from what each of the 9 Zochil posts is about, each with its own colour
 * so the journal is not one beige wall. `shop` links a post to the candles it talks about.
 */
export const TOPICS = {
  brand: { name: "Брэндийн түүх", bg: "#2a1f1a", fg: "#fff4dc", chip: "#f2c27b", tint: "#f6ead8" },
  home: { name: "Гэр, чимэглэл", bg: "#6c7c64", fg: "#ffffff", chip: "#e3ead9", tint: "#eef1e8" },
  collection: { name: "Цуглуулга", bg: "#a5552a", fg: "#ffffff", chip: "#f7d9c6", tint: "#f8ebe2" },
  holiday: { name: "Баяр ёслол", bg: "#7a2e2a", fg: "#ffffff", chip: "#f3cfc9", tint: "#f7e7e4" },
} as const;
export type TopicId = keyof typeof TOPICS;

const BY_SLUG: [RegExp, TopicId, string | null][] = [
  [/^zul-sar/, "holiday", null],
  [/lauren-dickinson/, "brand", "/shop?c=ldc"],
  [/amoln/, "brand", "/shop?c=amoln"],
  [/ozo/, "brand", null],
  [/khurim|uruunii|bairluulakh/, "home", "/shop?c=own"],
  [/ankhilam|cleopatra/, "collection", "/shop?c=own"],
];

export function topicOf(p: Pick<Post, "slug">): { id: TopicId; shop: string | null } {
  const hit = BY_SLUG.find(([re]) => re.test(p.slug));
  return { id: hit?.[1] ?? "home", shop: hit?.[2] ?? null };
}

/** Minutes to read at ~170 words a minute. */
export function readMinutes(p: Post) {
  const words = p.blocks.reduce((n, b) => n + (b.t === "img" ? 0 : b.text.split(/\s+/).length), 0);
  return Math.max(1, Math.round(words / 170));
}
