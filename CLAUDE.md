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

## What's left (prioritized)
1. ~~**Stale business data in `lib/seo.ts`**~~ — **DONE Aug 2 2026** (see Build
   status above). One item survives: `BUSINESS.sameAs` still needs the **Google
   Business Profile URL** — left as an explicit `TODO(Lalo)` in `seo.ts` rather
   than invented. The share link in `LocationSection.tsx`
   (`share.google/2JPAcqEaTyrn6Dl3r`) is a candidate but is a shortlink, not the
   canonical profile URL. Also still open: `og-image.jpg` referenced in `seo.ts`
   but the asset is missing (see #3).
2. **Build out the sub-pages** (`/servicios`, `/a-domicilio`, `/ubicacion`) —
   these are a DELIBERATE hub-and-spoke AEO strategy, not cruft. Currently
   headline-only shells with no `generateMetadata`, but `sitemap.ts` already
   submits all six (ES+EN). They must become real, substantial topic pages —
   NOT deleted. Each needs a second iteration to decide content. Until content
   exists they are thin pages that get crawled, so build them out (or
   temporarily remove from sitemap only until content lands). Direction per page:
   - `/servicios` — the full services catalog in depth (lavandería por kilo,
     tintorería, lavado y planchado, delicados y vestidos, cobertores y blancos,
     tenis), each with real descriptive copy, use cases, and the category+zone
     keywords. Targets "tintorería / lavandería [service] Distrito Tec" intents.
   - `/a-domicilio` — home pickup & delivery in depth: how it works, coverage
     (Zona Tec / Distrito Tec / nearby colonias), why it's premium-convenient,
     WhatsApp CTA. Targets "servicio a domicilio / lavandería a domicilio" intent.
   - `/ubicacion` — location/visit page: address, map, hours, landmarks
     ("a minutos del Tec"), parking, how to find us. Targets "lavandería /
     tintorería cerca del Tec / cerca de mí" proximity intent.
   Each sub-page needs: `generateMetadata` (per-locale title/description),
   its own structured data where relevant, real body content, internal links
   back to the hub and to WhatsApp, and bilingual copy. Content specifics need
   a review pass with Lalo before writing.
3. **Missing OG image** (`/og-image.jpg` referenced but absent) + default favicon.
4. **Instagram feed placeholder** — `INSTAGRAM_WIDGET_ID` undefined → six empty
   squares in prod. Needs a Behold.so account (or curated-grid fallback).
5. ~~**i18n bugs on /en**~~ — **DONE Aug 2 2026** (see Build status above).
   `<html lang>`, FAQ schema locale, the three Spanish-only strings,
   `streetAddress`, and the LocalBusiness `description` (now per-locale via
   `meta.schemaDescription`, EN wording approved by Lalo). No known i18n gaps
   remain on /en.
6. Default create-next-app README.

Suggested order (updated): 3 (OG image + favicon) → 2 (build out the sub-pages —
biggest content lift, needs a content pass with Lalo first) → 4 (IG when Behold
account exists) → 6. Note: #2 is a build-OUT, not a delete — it's the
hub-and-spoke AEO strategy.

## Production release checklist (lavalava.vip go-live)
Status as of Aug 2 2026. Schema data + i18n are DONE; what follows is what still
stands between the current build and a public launch.

**Blockers — must be resolved before pointing the domain at prod**
1. **Env vars in Vercel.** `GOOGLE_PLACES_API_KEY` currently exists only in local
   `.env.local`. Without it in Vercel, `fetchGoogleReviews()` returns `[]` and the
   reviews section silently falls back to the three hardcoded ES/EN cards. Not a
   crash — a silent downgrade, so it's easy to miss in prod.
2. **`NEXT_PUBLIC_SITE_URL` is undocumented.** `lib/google-reviews.ts` reads it to
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
5. **Sub-pages are thin** but `sitemap.ts` submits all six (ES+EN). Either build
   them out (What's left #2) or temporarily drop them from the sitemap. Do NOT
   delete the routes — they're the hub-and-spoke AEO strategy.

**Should-have before launch**
6. Google Business Profile URL for `BUSINESS.sameAs` (`TODO(Lalo)` in `seo.ts`).
7. **Lighthouse mobile pass** — Spec Step 7 was never run. 87% of traffic is
   mobile and Core Web Vitals are a ranking factor.
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
