# LAVALAVA — lavalava.vip

Marketing website for **LAVALAVA**, a premium laundry and dry cleaner in Distrito Tec,
Monterrey. Bilingual (ES default, EN at `/en`), mobile-first, WhatsApp-first.

The site is one leg of a coordinated relaunch — website + social + a price increase,
shipping together. Its job is to make the premium *visible* so the higher price reads as
earned. It sells time ("Más tiempo para ti"), never price.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · no database · no test suite.
Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /es
npm run build    # production build; all routes are SSG
npm run lint
```

## Layout

```
app/[locale]/          ES/EN routes. This is the ROOT layout — it renders <html lang>,
                       which is why there is no app/layout.tsx.
  page.tsx             Homepage (the hub)
  servicios/           ─┐
  a-domicilio/          ├─ the three spokes
  ubicacion/           ─┘
components/sections/   Homepage sections
components/delivery/   /a-domicilio sections
components/ui/         Shared primitives
lib/translations/      All copy, ES + EN. `en` is typed `Translations`, so a missing
                       English key is a build error — keep that guarantee.
lib/contract.ts        Types mirroring the POS CMS contract
lib/fallback-*.json    Committed snapshots of the published catalog/prices
lib/coverage.ts        The 24 Distrito Tec colonias (shared, not bilingual)
lib/seo.ts             Business constants + the per-page metadata builder
middleware.ts          Locale routing; always redirects / to /{locale}
```

## Things that look like bugs but are not

- **Plain `<a>`, not `next/link`, for internal links.** Importing `Link` into these server
  components pulls the client router into the route bundle — measured at +9 kB First Load
  JS on the homepage. Crawlers only read the `href`.
- **Every page sets its own canonical** via `pageMetadata()` in `lib/seo.ts`, and the
  layout sets none. Metadata merges from the closest segment, so a layout-level canonical
  silently became every sub-page's canonical and de-indexed all six.
- **The desktop hero is on native lazy loading.** `display:none` does not cancel a
  preload, so `priority` on both heroes made every mobile visitor fetch a desktop image it
  never saw. Exactly one high-priority preload should remain, and it is the mobile hero.
- **`.h-hero` is a real CSS utility**, not Tailwind arbitrary values. Tailwind emitted the
  `dvh` rule before the `vh` one, so `vh` won and the fix was inert.
- **No `aggregateRating` in the schema.** Deliberately omitted rather than faked. Do not
  re-add it.

## Content ownership

Prices, products and business facts come from the POS and are never typed into a page —
a price the POS will not honour becomes an argument at the counter. Everything else
(page copy, structure, design) is authored here. A CMS in the POS project will take over
the user-visible copy later; SEO surfaces — meta tags, canonicals, hreflang, JSON-LD
construction — stay in this repo permanently.

See `CLAUDE.md` for the full working context and `docs/LAVALAVA-WEBSITE-BUILD-SPEC.md`
for the canonical build spec.

## Environment

```
GOOGLE_PLACES_API_KEY    Live Google reviews via the Places API. Without it the reviews
                         section silently falls back to hardcoded cards.
NEXT_PUBLIC_SITE_URL     Sent as the Referer so the Places key passes HTTP-referrer
                         restrictions. Must match the deployed origin exactly.
```

Both must be set in Vercel before launch. See `.env.example`.
