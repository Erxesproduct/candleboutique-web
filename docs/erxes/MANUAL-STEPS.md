# Candle Boutique: erxes manual steps

Owner of every step below: **Terbish**, with Candle Boutique for credentials and decisions.

These steps happen inside the erxes 3.0 admin, not in code. The website reads the results through the
environment variables in `.env.example`. Never commit their values.

| Task | Status | What to do in erxes (admin path) |
| --- | --- | --- |
| [1.1] Import products, categories, prices | website done · manual import in erxes | Section 1.1 |
| [1.2] Payment setup (QPay) | website done · manual, blocked on QPay merchant credentials | Section 1.2 |
| [1.3] eBarimt setup | website done · manual, blocked on PosAPI registration + TIN | Section 1.3 |
| [1.4] Delivery zones, fees, order statuses | website done · manual in erxes | Section 1.4 |
| [1.5] Test order from cart to receipt | validation verified · real order blocked on erxes env vars + 1.2 + 1.3 | Section 1.5 |

There is no erxes instance for Candle Boutique yet ("erxes 3.0: NOT SET"). Create it first, then add the env vars
under **Vercel → candleboutique-web → Settings → Environment Variables**.

---

## 1.1 Import products, categories and prices

Source: candleboutique.mn (Zochil shop 4152), scraped 2026-11-17, plus the Facebook page «Candle_Boutique.mn»
(it only gives the name, follower count and the line «Гар аргаар урласан тансаг зэрэглэлийн лаанууд нэг дор»).

- **32 products** (63 photos), the home banner, 9 blog posts (now «Тэмдэглэл»), the «About» text (MN + EN),
  the FAQ and the logo.
- The Zochil tree had 20 categories, 9 of them empty (City, Limited Edition, Summer Garden, Naked, Cleopatra,
  OZOÍ, Diptyque, Christmas Box …). The website keeps **3 groups and 11 collections** that hold products.
- Scent notes (Дээд / Дунд / Суурь), the scent name, weight and burn time were parsed from the Zochil
  descriptions into separate fields.
- Name fixes: «MINIMAL COLLECTION | GREEN» → «Minimal Green» (same for the other colours), «Kasset» → «Kassett»
  (as printed on the jar and in the Amoln post), «Matte Black-Pressure» → «Matte Black · Pressure».

| Code | Name | Products |
| --- | --- | --- |
| `CB-own` | Candle Boutique лаа: Minimal 4, Basic 4, Memories 4, Marble 3, White 1, Matte Black 2, ASA 1 | 19 |
| `CB-brand` | Албан ёсны брэндүүд: Lauren Dickinson Clarke 4, Amoln 4 | 8 |
| `CB-extra` | Refill 3, Лааны хэрэгсэл 2 | 5 |

Files:

- `docs/erxes/candleboutique-categories.csv`: the parent `CB`, 3 groups and 11 collections (`CB-<group>-<collection>`).
- `docs/erxes/candleboutique-products.csv`: **32 rows**, code `CB-<zochilId>`, with price, old price, stock,
  status, scent, top / heart / base notes, specs, description and photo paths.

Steps:

1. **Products & services → Categories**: import `candleboutique-categories.csv`, or create them by hand.
2. **Settings → Import & Export → Import → Products**: upload `candleboutique-products.csv`.
   - Map `code → Code`, `name → Name`, `categoryCode → Category code`, `unitPrice → Unit price`, `type → Type`,
     `uom → UOM`, `description → Description`.
   - Keep the codes: the website and `npm run sync:erxes` match products on them.
3. **Stock**: Zochil tracked stock on 8 products only (28 units): Minimal Green 6, Red 7, Grey 7, Dark Grey 8;
   **Ocean Mist and the 3 refills are at 0** and show «Дууссан». The other 24 products have no stock count, so
   the website lets them be ordered. Enter real remainders in **Inventories → Remainders**; until erxes stock is
   wired to the site, update `stock` in `src/data/catalog.json`.
4. **Discounts**: 12 products have a −30% sale price on Zochil with no end date (Minimal 39,900 → 27,930₮,
   Basic 39,000 → 27,300₮, Memories 59,000 → 41,300₮). The CSV keeps the old price in `compareAtPrice`.
   Recreate it in **Loyalty → Pricing** if it continues.
5. **Photos** (63 images, WebP) are in `public/images/p`. Upload them to the products in erxes before the
   Zochil shop closes (Zochil subscription expires **2026-12-03**).
6. Run `npm run sync:erxes` once with a Client Portal token (`cpProducts`) to confirm the codes match.

**Confirm with Candle Boutique:**

- Basic Collection: the short text says 230 гр / 60 цаг, the description says 200 гр / 48 цаг. The site shows 200 гр / 48 цаг.
- Amoln: 300 г (short text) or 270 гр (description)? The site shows 270 гр.
- Minimal Collection has no scent names. Does each colour have a scent?
- Minimal Dark Grey on Zochil carries another candle's text («Сараана цэцэг…»); the site uses the Minimal facts.
- Is the −30% sale still running, and until when?
- Are the 24 untracked products (LDC, Amoln, Marble, Matte Black …) really in stock?
- Green Collection (96,000₮) is only sold as a refill on Zochil; is the full candle for sale?

## 1.2 Payment setup (QPay)

On Zochil, checkout was **disabled** (`checkout_status: disabled`, `has_qpay: false`); the shop has a Zochil-issued
QPay merchant (`Z_CANDLEBOUTIQ`) that is not transferable. The payment rule: «Та төлбөрөө 100% урьдчилан
шилжүүлснээр таны захиалга баталгаажих болно. Төлбөр дутуу хийгдсэн тохиолдолд хүргэлт хийгдэх боломжгүй».

1. Get Candle Boutique's own QPay merchant credentials: `client_id`, `client_secret`, `invoice_code`.
   Owner: Terbish / Candle Boutique.
2. **Settings → Payments → Add → QPay**: enter the credentials.
3. **Settings → Payments → (QPay) → Test**: create a 100₮ test invoice.
4. **Sales → Pipelines → «Вэбсайт» → Settings → Payments**: select QPay.

Website (done): checkout offers QPay only and shows the 100% prepayment rule; the receipt says the invoice will be
sent to the phone.

**Confirm with Candle Boutique:** the bank account for transfers (the Zochil SMS template referenced
`{{bank_accounts}}`, but no account number is public).
