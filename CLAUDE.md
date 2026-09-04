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

## Build status (audited against real code + live site, July 2026)
Steps 1–5 DONE; build clean. Site is slightly AHEAD of earlier notes:

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

## Content architecture — website CMS lives in the POS (decided Sep 2026)

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

**Transport:** on publish, the POS writes a versioned JSON snapshot to a public Supabase
Storage bucket; the website fetches that CDN URL at build/ISR time. Chosen over a live API
so website builds never depend on POS uptime. Full contract + table design + publish flow:
`~/.claude/plans/purrfect-wobbling-lagoon.md` (appendix).

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
1. ~~**Stale business data in `lib/seo.ts`**~~ — **DONE Aug 2 2026** (see Build
   status above). One item survives: `BUSINESS.sameAs` still needs the **Google
   Business Profile URL** — left as an explicit `TODO(Lalo)` in `seo.ts` rather
   than invented. The share link in `LocationSection.tsx`
   (`share.google/2JPAcqEaTyrn6Dl3r`) is a candidate but is a shortlink, not the
   canonical profile URL. Also still open: `og-image.jpg` referenced in `seo.ts`
   but the asset is missing (see #3).
2. **Sub-page CONTENT** (`/servicios`, `/a-domicilio`, `/ubicacion`) — the SEO shell
   is DONE (Sep 3 2026: per-page metadata, self-referencing canonicals, sibling
   hreflang, BreadcrumbList, real hub→spoke links). They are now indexable but still
   thin. **The remaining work is content, and content now lives in the CMS** — see
   "Content architecture" below. Do NOT delete the routes; they are the hub-and-spoke
   AEO strategy. Direction per page is unchanged:
   - `/servicios` — full catalog in depth (lavandería por kilo, tintorería, lavado y
     planchado, delicados, cobertores y blancos, tenis, composturas). Intent:
     "[service] Distrito Tec."
   - `/a-domicilio` — pickup & delivery in depth, coverage by named colonia (Lalo
     supplies the list — do not invent). Intent: "lavandería a domicilio."
   - `/ubicacion` — address, map, hours, landmarks, parking. Intent: "cerca del Tec."
3. **Missing OG image** (`/og-image.jpg` referenced but absent) + default favicon.
   The stock create-next-app favicon is also 26 KB and IS fetched on every page load.
4. **Instagram feed placeholder** — `INSTAGRAM_WIDGET_ID` undefined → six empty
   squares in prod. Needs a Behold.so account (or curated-grid fallback).
5. ~~**i18n bugs on /en**~~ — **DONE Aug 2 2026** (see Build status above).
   `<html lang>`, FAQ schema locale, the three Spanish-only strings,
   `streetAddress`, and the LocalBusiness `description` (now per-locale via
   `meta.schemaDescription`, EN wording approved by Lalo). No known i18n gaps
   remain on /en.
6. Default create-next-app README.
7. **Heading order a11y** (the only failing Lighthouse audit — a11y 98, not 100).
   Homepage goes `h1 → h3 → h2`: `PillarsSection.tsx:41` renders its three cards as
   `<h3>` in a section that has no `<h2>` (only an eyebrow `<p>`). Also violates Spec
   §5.3 ("one H1, H2 per section"). Promoting those three to `<h2>` is a pure semantic
   change — no copy, no visual impact. Flagged and left undone: it was outside the
   agreed scope of the Sep 3 passes.

Suggested order (updated Sep 3 2026): 7 (one-line a11y fix) → 3 (OG image + favicon,
needs assets from Lalo) → 2 (sub-page content — now gated on the POS CMS; the copy can
be authored into `lib/fallback-catalog.json` in parallel) → 4 (IG when Behold account
exists) → 6. Note: #2 is a build-OUT, not a delete — it's the hub-and-spoke AEO
strategy.

## Production release checklist (lavalava.vip go-live)
Status as of Aug 2 2026. Schema data + i18n are DONE; what follows is what still
stands between the current build and a public launch.

**Blockers — must be resolved before pointing the domain at prod**
1. **Env vars in Vercel.** `GOOGLE_PLACES_API_KEY` currently exists only in local
   `.env.local`. Without it in Vercel, `fetchGoogleReviews()` returns `[]` and the
   reviews section silently falls back to the three hardcoded ES/EN cards. Not a
   crash — a silent downgrade, so it's easy to miss in prod.
2. **`NEXT_PUBLIC_SITE_URL` must be set in Vercel.** (It IS now documented in
   `.env.example`.) `lib/google-reviews.ts` reads it to
   set the `Referer` header for Places API key restriction, defaulting to
   `https://lavalava-web.vercel.app`. On lavalava.vip that default is WRONG and
   the API key will be rejected if referrer restrictions are on. Set it in Vercel
   AND add it to `.env.example` (it's missing there).
3. **Domain.** `SITE_URL` in `lib/seo.ts` is already `https://lavalava.vip` — it
   feeds canonicals, hreflang, sitemap, robots, and OG. Prod is currently
   `lavalava-web.vercel.app`, so every one of those URLs is wrong until the
   domain is connected. Connect the domain, don't change `SITE_URL`.
4. **OG image** (`/og-image.jpg`, referenced but absent → broken social cards) and
   the still-default create-next-app **favicon**.
5. ~~**Sub-pages cancel themselves out of the index**~~ — **FIXED Sep 3 2026.** All six
   now emit self-referencing canonicals and sibling hreflang, verified in the emitted
   HTML. They remain thin until CMS content lands, but they are no longer self-defeating
   and are safe to keep in the sitemap.

**Should-have before launch**
6. Google Business Profile URL for `BUSINESS.sameAs` (`TODO(Lalo)` in `seo.ts`).
7. ~~**Lighthouse mobile pass**~~ — **DONE Sep 3 2026**: Performance 96 · Accessibility
   98 · SEO 100, LCP 2.8s, CLS 0, TBT 0ms (mobile, simulated, production build).
   Re-measure against the live domain once it is connected — the remaining LCP is
   dominated by Lighthouse's simulated throttling, not a defect found in the code.
   One open a11y item: heading order (below).
8. **Validate JSON-LD with Google's Rich Results Test** against the live URL.
   (Locally verified: LocalBusiness + FAQPage parse, per-locale, no
   `aggregateRating`. The live check is still worth doing.)
9. Instagram: `INSTAGRAM_WIDGET_ID` is undefined → six empty squares in prod.
   Needs a Behold.so account, or approve the curated-grid fallback.

**Post-launch / nice-to-have**
10. Replace the default create-next-app README.
11. Verify GBP hours/NAP match the site exactly (consistency is an AEO signal).

## Real assets still needed from Lalo
Logo SVG · OG image + favicon · confirmed hours (Saturday IS a business day) ·
Behold.so account for IG (or approve curated grid) · AI images per style guide ·
**sign-off on the content plan for each sub-page** (/servicios, /a-domicilio,
/ubicacion) before they're written — depth, sections, and any per-page images.
(Decision made: aggregateRating is REMOVED, not faked — see What's left #1.)

## Working rules
- Verify mobile rendering + Core Web Vitals as you go (87% of traffic is mobile;
  performance drives SEO ranking).
- Build in stages, report after each, don't race ahead.
- Update this file at the end of each session so the next one starts warm.
