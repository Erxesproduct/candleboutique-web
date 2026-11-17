import { readFileSync } from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// Old Zochil URLs keep working: /products/<categoryId|null>/<productId> → /p/<slug>, /products/<categoryId> → /shop?c=<collection>,
// /posts/<id> → /journal/<slug>.
const catalog = JSON.parse(readFileSync(path.join(process.cwd(), "src", "data", "catalog.json"), "utf8")) as {
  products: { id: number; slug: string }[];
  collections: { id: string; zochil: number[] }[];
  posts: { id: number; slug: string }[];
};
const productRedirects = catalog.products.map((p) => ({ source: `/products/:category/${p.id}`, destination: `/p/${p.slug}`, permanent: true }));
const collectionRedirects = catalog.collections.flatMap((c) => c.zochil.map((z) => ({ source: `/products/${z}`, destination: `/shop?c=${c.id}`, permanent: true })));
const postRedirects = catalog.posts.map((p) => ({ source: `/posts/${p.id}`, destination: `/journal/${p.slug}`, permanent: true }));
const groupRedirects = [
  { source: "/products/52481", destination: "/shop?c=own", permanent: true },
  { source: "/products/52424", destination: "/shop?c=brand", permanent: true },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Photos are pre-sized WebP (600 px thumbs, 1400 px large), so they are served as-is.
  images: { unoptimized: true },
  async redirects() {
    return [
      { source: "/products", destination: "/shop", permanent: true },
      ...productRedirects,
      ...collectionRedirects,
      ...groupRedirects,
      ...postRedirects,
      { source: "/products/:category(\\d+)", destination: "/shop", permanent: false },
      { source: "/category/:path*", destination: "/shop", permanent: false },
      { source: "/saled-products", destination: "/shop", permanent: true },
      { source: "/brands/:path*", destination: "/shop?c=brand", permanent: false },
      { source: "/shopping-cart", destination: "/cart", permanent: true },
      { source: "/checkout", destination: "/cart", permanent: true },
      { source: "/about", destination: "/info#about", permanent: true },
      { source: "/faq", destination: "/info#care", permanent: true },
      { source: "/terms", destination: "/info#delivery", permanent: true },
      { source: "/contact", destination: "/info#contact", permanent: true },
      { source: "/posts", destination: "/journal", permanent: true },
      { source: "/accounts/:path*", destination: "/", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      { source: "/images/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }] },
    ];
  },
};

export default nextConfig;
