# CLAUDE.md — LAVALAVA Website

Persistent project memory. Read this first every session. If it conflicts with
something in the code, the code is newer — reconcile and update this file.

---

## What this is
Marketing website for **LAVALAVA** — a premium laundry & dry-cleaning business in
Distrito Tec, Monterrey, MX. Bilingual (ES/EN), mobile-first.

**Site structure — hub & spoke (deliberate AEO strategy):**
- The homepage is the **hub**: all key info on one scrolling page, WhatsApp-first.
- **Detailed sub-pages are the spokes**, each targeting a specific search/AEO
  intent with deep, unique content: `/servicios`, `/a-domicilio`, `/ubicacion`
  (and possibly more later). These exist ON PURPOSE — per the Gemini test and
  Google guidance, deep topic pages are what rank and what AI engines cite.
- They currently exist as near-placeholder shells and need a second iteration
  to define real, substantial content per page (see "What's left" #2). Do NOT
  delete them or drop them from the sitemap — build them out instead.
- Repo: github.com/lalosg/lavalava-web · Deploy target: **lavalava.vip**
- Stack: **Next.js 14 App Router + TypeScript + Tailwind** (no DB, no tests)
- i18n: `middleware.ts` + `app/[locale]/`, ES default, EN at `/en`
- Full build spec: `LAVALAVA-WEBSITE-BUILD-SPEC.md` (canonical — read it too)

## The strategy (why the site exists)
One leg of a coordinated relaunch: **website + social relaunch + price increase**,
launching together. The site makes the premium **visible** so the price raise
feels earned, and wins local + AI/search discovery competitors take by default.
- Sells **freedom / time** ("Más tiempo para ti"), NOT laundry. Never competes on price.
- Positioning: premium, warm, effortless. Family business that takes craft seriously.
- Primary action EVERYWHERE: **WhatsApp**. Secondary: Instagram follow, directions.

## Critical context — AEO (highest-leverage requirement)
A live Gemini test showed AI assistants recommend competitors, not LAVALAVA,
because competitors saturate machine-readable text linking category + zone +
premium. So: real text (never text-in-images), structured data, and geographic/
category keyword coverage are FIRST-CLASS requirements. Keywords to cover
naturally (both accented + unaccented): lavandería/lavanderia, tintorería/
tintoreria, Distrito Tec, Zona Tec, Colonia Roma, Av. Junco de la Vega, Tec de
Monterrey, Monterrey.

## Locked design direction
Light/airy "quiet luxury" (boutique-hotel feel), navy as ACCENT moments only
(not dominant). Huge whitespace, calm pacing, one idea per screen, photography-
forward. Editorial numbered section labels (01 — … 08 —).
- Palette: bone `#F7F4EE` / `#FAF8F3` (surface), ink `#1B2536` (text), navy
  `#16233B` (accent moments: final CTA + one mid-page band), muted sand
  `#E4D8C4`, DESATURATED teal `#5E7F84` (whisper only). Light dominates.
- Type: **Fraunces** (headings/wordmark), **Source Sans 3** (body). Wide-tracked
  uppercase eyebrow labels + `NN —` numbers.
- WhatsApp CTA gets slightly more presence (subtle fill) than the otherwise
  quiet outline/text-link components.
- AI photography = atmosphere/texture only (soft warm light, folded linen, calm
  interiors). NEVER fabricate the real store/staff or fake results/claims.

## Build status (audited against real code, Sep 27 2026)
Steps 1–5 DONE; build clean. Site is slightly AHEAD of earlier notes:

> **Session update — Sep 22-27 2026: all three spokes WRITTEN, prices wired, motion layer built.**
> The site went from "one real page plus three shells" to four finished pages with a
> motion layer. Every number below was measured against a production build, not asserted.
>
> **The spokes are real pages now.** `/servicios` ~1,400 words per locale, `/a-domicilio`
> ~900, `/ubicacion` ~600. Each has its own FAQ (so FAQPage schema is legitimate on them
> now — the homepage-only rule existed because they had no visible FAQ; the hazard is
> duplicating the SAME FAQ, and these differ), BreadcrumbList, real cross-links, and a
> per-page JSON-LD set built from the same objects the page renders.
>
> **The 24 Distrito Tec colonias are in `lib/coverage.ts`** — verified to match the live
> published catalog exactly, set for set. Shared and NOT bilingual, mirroring the CMS's
> single `name` column. The same array feeds the visible grid and the Service schema's
> `areaServed` in one render pass, so they cannot drift. This list is the single strongest
> AEO asset on the site; never move it into an image.
>
> **THREE CONTENT CORRECTIONS — the site had been stating things that were false:**
> 1. **Delivery is PAID, not free.** The POS publishes pickup and delivery as two separate
>    items, $37.50 each, currently promoted to $30. The homepage had claimed "recolección
>    sin costo adicional" since the beginning. Fixed everywhere.
> 2. **There IS a 3 kg minimum** on per-kilo laundry (confirmed by Lalo). The site actively
>    denied it — `/servicios` FAQ answered "no hay mínimo". Now stated in 4 places incl.
>    beside the price. NOTE for the POS side: `products.min_quantity` is still 1.000, so
>    the till permits a ticket the shop will not sell.
> 3. **Two services did not exist.** The homepage advertised "Lavado y planchado" (the POS
>    sells press-only per piece) and "Cobertores y blancos" promising pillows and bed linen
>    (published items are comforters by bed size). Both corrected.
>
> **Prices are consumed, never typed.** `lib/contract.ts` mirrors the POS types;
> `lib/fallback-{catalog,prices}.json` are the REAL payloads captured from the live CDN on
> 2026-09-24, so the shapes are observed rather than imagined; `lib/prices.ts` is the only
> module that touches them. When the fetch layer lands it replaces two imports and nothing
> else. `activePromo()` enforces `validUntil` at render because the file has no clock —
> untested in production until a dated offer ships. `PriceTag` renders list struck grey,
> promo green, no promotion name (it is internal and Spanish-only).
>
> **Motion layer, four passes.** No `motion`/framer dependency — all reveal primitives are
> CSS transitions + IntersectionObserver, which the brief's own "prefer CSS where it is
> enough" asks for and which kept ~34 kB out of an 87.3 kB shared bundle. Shared First Load
> JS is UNCHANGED at 87.3 kB; the homepage sits at 106 kB. Lenis is desktop-pointer only
> and dynamically imported — native iOS scrolling is better than anything a JS scroller
> does, and 87% of traffic is mobile.
> - `components/motion/`: `useInView`, `RevealText` (lines rise out of a mask, split on the
>   \n the copy already carries), `RevealImage` (clip-path wipe + 1.06 settle), `CountUp`,
>   `ScrollWave`, `HeroParallax`, `SmoothScroll`, `FloatingWhatsApp`.
> - Header floats transparent over the hero, solidifies past 24px, hides down / returns up.
> - Page transitions are a single `@view-transition` CSS rule — internal links are plain
>   `<a>`, which makes navigations cross-document, which is the case needing zero JS.
>
> **Three bugs found by measuring that nobody had seen:**
> - **Every page had a horizontal scroll on mobile** — document scrollWidth 1391px against
>   390px. The reviews carousel cards had `min-w-[280px] flex-shrink-0` and no width;
>   min-width is only a floor, so each card grew to its max-content width (698px). This was
>   cutting the header and hero stripe off in every screenshot.
> - **The hero entrance was holding LCP open.** `hero-rise` animated opacity from 0, and an
>   element at opacity 0 does not count as painted for LCP. Every network request finished
>   inside 24ms and Speed Index was 0.9s — the page was done and one keyframe was holding
>   the metric. `hero-rise` is transform-only now, deliberately. **Do not re-add opacity to
>   any above-the-fold entrance animation.**
> - **The spokes were at 95-96 accessibility**, never noticed because every prior
>   measurement was homepage-only. Their CTA is `bg-teal text-white` and brand teal is
>   4.33:1 on white. Filled buttons now use `teal-deep`.
>
> **Contrast is now AA site-wide.** Brand teal is 3.95:1 on bone and 3.62:1 on navy, both
> under 4.5 for normal text, so `teal-deep` (#557478) and `teal-soft` (#799AA0) exist for
> TEXT ONLY. The brand teal is unchanged and still used for borders, icons, fills and the
> wave mark. Muted text was swept to computed floors: ink >= /65 on bone, bone >= /50 on
> navy, white >= /50 in the footer.
>
> **Final Lighthouse (production build, warm cache, medians):** /es 95, /en 95,
> /es/servicios 98, /en/servicios 98, /es/a-domicilio 98, /es/ubicacion 99.
> **Accessibility, Best Practices and SEO are 100 on all six.** CLS 0, TBT 0ms everywhere.
> Zero horizontal overflow across 16 page/locale/viewport combinations. Under
> prefers-reduced-motion, 274 animated elements measure at rest with nothing hidden.
>
> **LCP is the one budget not demonstrably met, and it CANNOT be judged from a dev machine.**
> `observedLargestContentfulPaint` is 60-67ms against a simulated 3.0s: Lighthouse models
> 150ms RTT / 1638kbps from a trace taken on a warm localhost server that has no real
> network profile. Removing the entrance animation from the LCP element entirely changed
> nothing. **Measure against the deployment before concluding anything about LCP.**

> **Session update — Sep 3 2026: sub-page SEO + performance passes DONE.**
> Build, lint, and typecheck clean; all six sub-page routes still SSG. Verified against
> emitted HTML and a real Lighthouse run, not assertion.
> - **Canonical bug FIXED (this was the big one).** All six sub-pages were emitting the
>   HOMEPAGE canonical (`.../es`) because none had `generateMetadata` and metadata is
>   inherited from the closest segment. Google would have folded them all into `/es`.
>   Fixed by removing `alternates` from `app/[locale]/layout.tsx` **entirely** and giving
>   every page its own via a new `pageMetadata()` helper in `lib/seo.ts`. This kills the
>   bug CLASS: a new route can no longer silently inherit a wrong canonical.
>   Per-page titles/descriptions live in `lib/translations/*.ts` under `pages.<slug>.meta`.
> - **`JsonLd` is now composable** — `<JsonLd schemas={[...]} />` plus exported builders
>   `localBusinessSchema` / `faqSchema` / `breadcrumbSchema`. Sub-pages emit LocalBusiness
>   + BreadcrumbList. **FAQPage stays homepage-only** (Google requires FAQPage markup to
>   match FAQ visible on that page). `expandDays()` + `openingHours` derivation untouched.
> - **Hub→spoke internal links are real anchors now.** `ServicesSection` had a dead
>   `<p className="… cursor-default">` CTA; added contextual links to all three spokes.
>   **Deliberately plain `<a>`, NOT `next/link`** — measured: `next/link` pulled the client
>   router into the homepage bundle and cost 9 kB First Load JS (103→112 kB). Crawlers only
>   read `href`. `HeroSection` already used plain `<a>` for `/ubicacion`. Don't "fix" this.
> - **`sitemap.ts`**: dropped `lastModified: new Date()` (claimed every page changed on
>   every deploy) and the bare-origin entry (a redirecting URL).
> - **Performance: 92 → 96, LCP 3.3s → 2.8s** (mobile, simulated, production build; "after"
>   re-run twice for stability). Cause was `priority` on BOTH hero images: `display:none`
>   does not cancel a preload. `loading="eager"` also emits one, so the desktop hero is now
>   on native lazy — browsers skip `display:none` lazy images, so mobile never fetches it.
>   Exactly one high-priority preload remains, and it is the mobile hero.
> - **Images 16MB → 2.9MB** (PNG→JPEG q85, no alpha, dimensions unchanged; refs updated).
>   Honest caveat: this barely moved *delivered* bytes (346→369 KiB) because `next/image`
>   already served resized AVIF (hero arrives as 42 KB). The win is repo size, build time,
>   and Vercel image-optimization cost.
> - **`.h-hero` utility added to `globals.css`.** The `dvh` fix written as duplicate
>   Tailwind arbitrary values was INERT — Tailwind emitted `dvh` first and `vh` second, so
>   `vh` won. A real utility is the only way to control declaration order.
> - Final Lighthouse (mobile, prod build): **Performance 96 · Accessibility 98 · SEO 100**,
>   LCP 2.8s, CLS 0, TBT 0ms.
>
> **Session update — Aug 2 2026: schema data + i18n correctness passes DONE.**
> Build + lint clean; all routes still SSG; JSON-LD verified in the emitted HTML.
> - **Schema data (was "What's left" #1):** `BUSINESS.telephone` → `+528118201400`;
>   `streetAddress` → includes `2224B`; lat/lng → verified `25.6559152 / -100.2927385`
>   (matches `LazyMap.tsx`); `openingHours` → `Mo-Fr 08:00-19:30`, `Sa 09:00-15:30`.
>   `aggregateRating` **REMOVED** from both `seo.ts` and `JsonLd.tsx`.
>   `JsonLd.tsx` now DERIVES `openingHoursSpecification` from `BUSINESS.openingHours`
>   via an `expandDays()` helper — hours are no longer hardcoded anywhere.
> - **i18n (was "What's left" #5):** `<html lang>` is now per-locale. This required
>   making `app/[locale]/layout.tsx` the ROOT layout (it now renders `<html>`/`<body>`,
>   fonts, `globals.css`, `metadataBase`); `app/layout.tsx` and `app/page.tsx` were
>   DELETED. `app/page.tsx` was dead code — `middleware.ts` always intercepts `/`
>   and redirects to `/es` (verified against the matcher regex). Reading the locale
>   via `headers()` in a layout at `app/` was rejected: it would opt the whole tree
>   out of SSG, which Spec §1 requires.
> - `JsonLd` now takes a `locale` prop; FAQPage schema is built from the matching
>   translations (was always Spanish, even on /en).
> - Spanish-only strings moved into translations: `location.mapCta`,
>   `location.mapLabel`, `reviews.starsLabel` (`{rating}` placeholder),
>   `reviews.feedbackMessage`. `LazyMap` now requires `ariaLabel` + `ctaLabel`.
> - **Spec §5.1 reconciled:** it no longer lists `aggregateRating` as required —
>   it now records the omission + the reason, with a "do not re-add" note.
> - **LocalBusiness `description` is now per-locale**, via a new
>   `meta.schemaDescription` key in both translation files. Kept separate from
>   `meta.description` on purpose: the schema string is more keyword-dense (an AEO
>   surface), the meta one is a SERP snippet. Don't collapse them into one.
- Design system faithful (bone/ink/navy/sand/teal, Fraunces + Source Sans, wave
  mark, reveal-on-scroll). Light/airy + navy accents as designed.
- All 13 homepage sections live. Hero UPGRADED to three-tier (headline /
  service descriptor / SEO stripe) with real hero images + keyword alt text.
- Hero SEO copy already integrated as `subheadTertiary`, and "Único" already
  softened to "Servicio premium" (good — no change needed there).
- Real content already in: review cards (María G./Carlos M./Ana R. + WhatsApp
  feedback prompt), service images, real address (incl. 2224B), real hours
  (Mon–Fri 8–19:30, Sat 9–15:30), real "Cómo llegar" Google link.
- WhatsApp real number 528118201400 live in all CTA links (encoded).
- SEO/AEO foundation present: LocalBusiness/DryCleaningOrLaundry + FAQPage
  schema, per-locale metadata, hreflang (es/en/x-default), canonical, OG,
  Twitter, sitemap, robots. Google reviews integration via Places
  (`lib/google-reviews.ts`), `GOOGLE_PLACES_API_KEY` in `.env.local`.
- Instagram wired for Behold with graceful placeholder fallback.

Nothing from the plan was lost. Remaining = data correctness + sub-page
build-out + assets (below).

## Content architecture — website CMS lives in the POS (BUILT and LIVE, Sep 2026)

Website content is moving OUT of this repo and into a back office in the **POS project**
(`~/Documents/projects/POS`, `lavalava-pos`: Next 15 + Supabase + Tamagui). That work is
being built in a SEPARATE session; this repo is **consume-only**.

**The ownership rule (Lalo's words):**
> Everything an end user reads or sees → **CMS**.
> Everything SEO / AEO / metadata → **repo**.

So: service names, descriptions, prices, which products are published, display order,
delivery coverage, hours, H1s, intro paragraphs, and FAQ Q&A → CMS. Meta titles and
descriptions, canonicals, hreflang, OG/Twitter tags, `meta.schemaDescription`, and all
JSON-LD *construction code* → repo.

**Edge case, already resolved:** some schema values mirror visible text (FAQPage,
`openingHoursSpecification`, `areaServed`). The repo owns schema *construction*; the CMS
owns the *value*. This is also what Google requires — FAQPage markup must match content
visible on the page. Consequence: `BUSINESS.openingHours` in `lib/seo.ts` demotes from
source-of-truth to **fallback** once the CMS lands.

**Why not read Supabase directly:** RLS on `products` is
`FOR ALL TO authenticated USING (store_id = auth_store_id())`, and there is currently
**no `TO anon` policy anywhere in the schema**. Keeping the DB closed is the whole reason
the website consumes a published contract instead.

**Transport — LIVE as of 2026-09-24.** Both files are published, anon-readable, no auth:
```
https://ljtdsckotxpkkmjmmlpp.supabase.co/storage/v1/object/public/website/catalog.json
https://ljtdsckotxpkkmjmmlpp.supabase.co/storage/v1/object/public/website/prices.json
```
Real content: 7 services, 24 priced items, 24 coverage names, promos on 3 items.
`catalog.json` is copy and changes only on an explicit Publish; `prices.json` is the whole
product layer and regenerates by itself on any price/visibility change. They never change
together and must not be merged. Full contract, types and consumption rules:
`~/Documents/projects/POS/docs/WEBSITE-CONTRACT-HANDOFF.md`; promotional-price rules in
`WEBSITE-PROMO-PRICING-PLAN.md`; page intent in `WEBSITE-PAGE-BRIEF.md`.

**The site does not fetch them yet** — it renders committed snapshots in
`lib/fallback-*.json` through `lib/prices.ts`. Wiring the live fetch is post-launch item 11.

**Content freedom (Lalo, Sep 2026):** *"CMS content and capacity should never restrict or
limit content creation. Imagine the CMS doesn't even exist."* The CMS is a separate project
Lalo retakes after the pages are finished, and it will be reshaped to fit what is built —
NOT the reverse. The only things that are fixed facts and must never be invented are
**products, prices, hours, address and coverage**. Everything else is the website's to
write. The POS service descriptions are written in `usted`; the site speaks `tú`, so the
prose here is authored rather than lifted.

**Three hard requirements when integrating (do not skip):**
1. **Bilingual completeness.** Today `en: Translations` makes a missing EN key a build
   error. The CMS loses that. Enforce in Postgres with a `CHECK` constraint on published
   rows — not app-level validation. Never fall back EN→ES at render.
2. **Let the catalog fetch THROW — do not copy the `catch { return [] }` from
   `lib/google-reviews.ts`.** That pattern is right for reviews (they have hardcoded
   fallbacks) but fatal for CMS content: returning empty makes ISR regeneration *succeed*
   with nothing and replaces a good page with a blank one. On a throw, Next keeps serving
   the last good page. Commit `lib/fallback-catalog.json` for cold builds, and **alert
   loudly whenever the fallback is used** — silent downgrade is this project's recurring
   hazard (see `GOOGLE_PLACES_API_KEY`).
3. **No schema/content drift.** Build the visible component and its JSON-LD from the same
   in-memory object in the same render pass. Omit missing fields; never fake them.

**Useful:** the sub-page copy is NOT blocked on the CMS. `lib/fallback-catalog.json` is
required by the architecture anyway, so authoring copy into it is not throwaway — it is
both the fallback content and the seed data the POS session imports.

## What's left (prioritized)
1. ~~Stale business data in `lib/seo.ts`~~ — **DONE.** `BUSINESS.sameAs` now carries the
   canonical Google Business Profile (`maps.google.com/?cid=13133730578863152898`, the
   `cid=` form because a raw Maps URL carries a viewport and session token).
2. ~~**Sub-page CONTENT**~~ — **DONE Sep 2026.** All three spokes are written, priced and
   schema'd. Turnaround times for cobertores, tenis and composturas are still unknown and
   the pages say "te lo confirmamos al recibirlo" rather than carry an invented figure —
   Lalo asked to leave this and review content details later.
3. **Missing OG image** (`/og-image.jpg` referenced in `lib/seo.ts` but absent → broken
   social cards) + the default create-next-app **favicon** (26 KB, fetched every load).
   **Still the top open item.**
4. **Instagram feed placeholder** — `INSTAGRAM_WIDGET_ID` undefined → six empty squares in
   prod. Needs a Behold.so account or an approved curated-grid fallback.
5. ~~i18n bugs on /en~~ — **DONE.**
6. ~~Default create-next-app README~~ — **DONE.**
7. ~~Heading order a11y~~ — **DONE.** Zero heading skips on every page, one h1 each.

**Unverified claims that need Lalo's eye** (written because the page had to answer the
question, but not sourced from anything):
- `/servicios` FAQ says "aceptamos tarjeta y efectivo". Ordinary for a shop like this,
  but it is not in any document I was given.
- `/ubicacion` deliberately says **nothing** about parking or landmarks. The page brief
  asks for both and I have neither; on a page whose job is helping someone arrive, an
  invented landmark is worse than silence. **Still needed.**
- Walking time from campus is qualitative ("a unos minutos"). Straight-line distance is
  ~600m, which supports it, but the campus coordinate used for that check was approximate.
  A real walking time would be a strong line to have.

## Files still needed from Lalo
- `public/images/delivery.jpg` — the pickup/delivery photo. `DeliverySection` still renders
  the striped "FOTO — recogida a domicilio" placeholder until it exists.
- `public/images_backup/` currently sits inside `public/`, so it would be served at public
  URLs. It is gitignored, but move it out of the repo when convenient.

## Production release checklist (lavalava.vip go-live)
Status as of Sep 27 2026.

**Blockers — must be resolved before pointing the domain at prod**
1. **⚠️ The Places API key REJECTS `https://lavalava.vip`.** Verified 2026-09-24 against
   the live API: the key's HTTP-referrer allowlist accepts `lavalava-web.vercel.app` and
   `localhost:3000`, and returns `API_KEY_HTTP_REFERRER_BLOCKED` for the real domain.
   Setting `NEXT_PUBLIC_SITE_URL=https://lavalava.vip` at cutover — which `.env.example`
   itself instructs — will kill live reviews the moment the domain goes live, silently
   falling back to the three hardcoded cards. **Add lavalava.vip to the key's allowlist in
   Google Cloud Console BEFORE the domain switch.**
2. **Env vars in Vercel.** `GOOGLE_PLACES_API_KEY` and `NEXT_PUBLIC_SITE_URL` both exist
   only locally. Without the key, `fetchGoogleReviews()` returns `[]` — a silent downgrade.
3. **Domain.** `SITE_URL` in `lib/seo.ts` is already `https://lavalava.vip`, feeding
   canonicals, hreflang, sitemap, robots and OG. Connect the domain; don't change SITE_URL.
4. **OG image + favicon** — still missing / still the create-next-app default.
5. **301 the old Drupal site.** `lavalava.vip/content/inicio` is still indexed and its
   search snippet still advertises the OLD prices ($28 / $12 / $40 / $15). Since the
   relaunch raises prices, Google's cheapest answer for LAVALAVA pricing is currently the
   old site undercutting the new one. Needs 301s or removal at cutover.

**Should-have before launch**
6. ~~Google Business Profile URL~~ — **DONE.**
7. **Re-run Lighthouse against the LIVE domain.** Local numbers are 95-99 performance,
   100 a11y/BP/SEO — but LCP cannot be judged locally (see the Sep 22-27 session note).
   This is the only budget still unproven.
8. **Validate JSON-LD with Google's Rich Results Test** against the live URLs. Locally the
   full set parses: LocalBusiness, Service with 24 named areaServed, OfferCatalog with 24
   priced Offers, BreadcrumbList and per-page FAQPage.
9. Instagram: `INSTAGRAM_WIDGET_ID` undefined → six empty squares in prod.

**Post-launch**
10. Verify GBP hours/NAP match the site exactly (consistency is an AEO signal).
11. **Wire the live CMS fetch.** The contract is frozen and both files are live and real;
    the site currently reads committed snapshots of them. When wiring it: let the fetch
    THROW (never `catch { return [] }` — that makes ISR "succeed" with nothing and
    replaces a good page with a blank one), gate on `version`, and alert loudly whenever
    the fallback is used.

## Motion rules (do not undo these)
- **No `motion`/framer dependency.** Every reveal is a CSS transition driven by
  IntersectionObserver in `components/motion/`. That kept ~34 kB out of an 87.3 kB shared
  bundle. Add it only if something genuinely needs spring physics.
- **Never animate opacity on above-the-fold content.** An element at opacity 0 does not
  count as painted for LCP; this cost 3 Lighthouse points and 0.3s until it was found.
  `hero-rise` is transform-only on purpose.
- **Lenis is desktop-pointer only and dynamically imported.** Native iOS scrolling beats a
  JS scroller and the library should never reach a mobile visitor's bundle.
- **One easing curve, one set of durations** — the `--ease` / `--dur-*` / `--travel` /
  `--stagger` tokens in `globals.css`. Don't introduce a second feel.
- **Every animation must be inert under `prefers-reduced-motion`**, and content must be
  visible with no JS (`@media (scripting: none)` + the `<noscript>` block in the layout).
- **`teal-deep` / `teal-soft` are TEXT-ONLY tokens.** The brand teal fails AA for normal
  text on both bone and navy. Don't "simplify" them back to `--teal`.

## Working rules
- Verify mobile rendering + Core Web Vitals as you go (87% of traffic is mobile;
  performance drives SEO ranking).
- Build in stages, report after each, don't race ahead.
- Update this file at the end of each session so the next one starts warm.
