import type { MetadataRoute } from "next";
import { catalogUpdatedAt, collections, posts, products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(catalogUpdatedAt);
  return [
    { url: absoluteUrl("/"), lastModified, priority: 1 },
    { url: absoluteUrl("/shop"), lastModified, priority: 0.9 },
    ...collections.filter((c) => c.count > 0).map((c) => ({ url: absoluteUrl(`/shop?c=${c.id}`), lastModified, priority: 0.8 })),
    ...products.map((p) => ({ url: absoluteUrl(`/p/${p.slug}`), lastModified, priority: p.stock === 0 ? 0.4 : 0.7 })),
    { url: absoluteUrl("/journal"), lastModified, priority: 0.6 },
    ...posts.map((p) => ({ url: absoluteUrl(`/journal/${p.slug}`), lastModified: new Date(p.date), priority: 0.5 })),
    { url: absoluteUrl("/info"), lastModified, priority: 0.5 },
  ];
}
