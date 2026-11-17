import data from "@/data/catalog.json";

export type Img = { src: string; w: number; h: number };
export type Photo = Img & { thumb: Img };
export type Notes = { top: string[]; heart: string[]; base: string[] };

export type Product = {
  /** Zochil product id (kept for the erxes product code and old-URL redirects). */
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  collection: string;
  /** Selling price (the sale price when discounted). */
  price: number;
  /** Price before the discount, null when not discounted. */
  compareAt: number | null;
  /** Units in stock; null = stock not tracked. 0 = sold out. */
  stock: number | null;
  featured: boolean;
  createdAt: string;
  scent: string | null;
  notes: Notes | null;
  /** Scents a refill comes in (Green Collection refill). */
  variants: { name: string; notes: Notes }[];
  specs: { label: string; value: string }[];
  story: string[];
  /** Slugs of the candles a refill fits. */
  fits: string[];
  images: Photo[];
};

export type Group = { id: string; name: string; blurb: string };
export type Collection = { id: string; group: string; name: string; blurb: string; origin?: string; zochil: number[]; count: number };
export type Block = { t: "p" | "h"; text: string } | ({ t: "img" } & Img);
export type Post = { id: number; slug: string; title: string; date: string; cover: Img | null; blocks: Block[] };

export const groups = data.groups as Group[];
export const collections = data.collections as Collection[];
export const products = data.products as Product[];
export const banners = data.banners as { id: number; title: string; image: Img }[];
export const posts = data.posts as Post[];
export const about = data.about as { mn: string[]; en: string[] };
export const aboutImage = data.aboutImage as Img | null;
export const faq = data.faq as { q: string; a: string }[];
export const catalogUpdatedAt = data.updatedAt;

const bySlug = new Map(products.map((p) => [p.slug, p]));
export const getProduct = (slug: string) => bySlug.get(slug);
export const getCollection = (id: string) => collections.find((c) => c.id === id);
export const inCollection = (id: string) => products.filter((p) => p.collection === id);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const soldOut = (p: { stock: number | null }) => p.stock === 0;
export const onSale = (p: Pick<Product, "price" | "compareAt">) => p.compareAt != null && p.compareAt > p.price;
export const discount = (p: Pick<Product, "price" | "compareAt">) => (onSale(p) ? Math.round((1 - p.price / p.compareAt!) * 100) : 0);
export const fromPrice = (list: Product[]) => Math.min(...list.map((p) => p.price));

/** The product a cart line points at (server side). */
export function resolveLine(slug: string) {
  const product = getProduct(slug);
  return product ? { product, price: product.price, stock: product.stock } : null;
}

/** erxes product code: CB-<zochil id>. */
export const sku = (p: Pick<Product, "id">) => `CB-${p.id}`;

/** First readable sentence for meta descriptions. */
export function summary(p: Product) {
  const c = getCollection(p.collection);
  const bits = [p.scent ? `Үнэр: ${p.scent}.` : null, p.story[0] ?? c?.blurb ?? null];
  return bits.filter(Boolean).join(" ").slice(0, 170);
}

/** First paragraph of a journal post (for teasers and meta descriptions). */
export const lede = (p: Post) => p.blocks.flatMap((b) => (b.t === "p" ? [b.text] : []))[0] ?? "";
