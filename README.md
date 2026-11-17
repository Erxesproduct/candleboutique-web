# Candle Boutique storefront

Website for **Candle Boutique** (Улаанбаатар): hand-poured soy candles and the official Lauren Dickinson Clarke
and Amoln collections. It replaces the Zochil shop at candleboutique.mn (shop 4152).

Next.js 16 (App Router) + Tailwind CSS 4. Static catalog in `src/data/catalog.json`; orders go to erxes 3.0.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm run build
npm run test:order -- http://localhost:3000   # order API checks (add --send for one real erxes order)
npm run sync:erxes   # refresh prices from erxes (needs ERXES_API_URL + ERXES_APP_TOKEN)
```

| Path | What |
| --- | --- |
| `/` | Home: owner's banner, collections, −30% sale, scent notes, official brands, journal, care tips, pop-up store |
| `/shop?c=<group or collection>` | Catalog by group (own / brand / extra) or collection |
| `/p/<slug>` | Product: gallery, price, stock, specs, scent pyramid, refill fit |
| `/journal`, `/journal/<slug>` | The 9 Zochil posts |
| `/info` | About (MN/EN), delivery & payment, care FAQ, contact |
| `/cart` | Cart + checkout (QPay, eBarimt person/company, UB / countryside delivery) |
| `POST /api/orders` | Validates on the server (prices, stock, fee) and sends the order to erxes |

Business rules live in `src/content/business.ts`. Old Zochil URLs (`/products/...`, `/posts/<id>`, `/about`, `/faq`)
redirect to the new pages. erxes setup and open questions: `docs/erxes/MANUAL-STEPS.md`.

Environment variables: see `.env.example` (never commit values).
