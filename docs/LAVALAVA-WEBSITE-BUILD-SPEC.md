# LAVALAVA Website — Build Spec (for Claude Code)
**Version 1.0 · July 2026 · Domain: lavalava.vip**

This is the executable build spec for the LAVALAVA marketing website. It is
grounded in a locked visual design (a Claude Design HTML export) and a full
brand + SEO/AEO strategy. Read it completely before building. Build in stages
(Section 11), stopping to verify each.

> **BUILD STATUS (audited July 2026):** The site is already built through Steps
> 1–5 (scaffold, i18n, all 13 homepage sections, SEO/schema layer, integrations)
> and is live at lavalava-web.vercel.app. It is slightly ahead of earlier notes.
> What remains: (a) fix stale data in `lib/seo.ts` + `JsonLd.tsx` (real phone,
> real coords, REMOVE the hardcoded aggregateRating, add GBP URL, sync hours to
> 19:30/15:30); (b) fix two i18n bugs (hardcoded `<html lang="es">` for both
> locales; FAQ schema always Spanish); (c) build out the three sub-page spokes
> (Section 4.1) — currently thin shells; (d) supply real assets (OG image,
> favicon, Behold IG widget id). See CLAUDE.md "What's left" for the audited,
> file-level punch-list. Nothing from this spec was lost.

---

## 0. What This Is

A bilingual (ES/EN), mobile-first marketing site for LAVALAVA — a premium
laundry and dry-cleaning business in Distrito Tec, Monterrey, Mexico.

**Structure: hub & spoke.** The homepage is the hub — all key info on one
scrolling page, WhatsApp-first. Detailed **sub-pages are the spokes**
(`/servicios`, `/a-domicilio`, `/ubicacion`), each a deep topic page targeting a
specific search/AEO intent. This is a deliberate SEO/AEO strategy (per the Gemini
test + Google guidance): deep, specific pages are what rank and what AI engines
cite. The hub converts; the spokes get found and feed the hub.

**Business goals the site serves:**
1. Acquire new customers (win local + AI/search discovery, convert to first visit)
2. Drive frequency (Instagram follow, stay top-of-mind)
3. Raise average ticket (surface premium services, home pickup/delivery)

**Primary action everywhere: WhatsApp.** Secondary: Instagram follow, directions.

**Positioning:** Premium, warm, effortless. Sells *freedom and time* ("Más
tiempo para ti"), not laundry. Never competes on price. The site's visual
quality is itself proof of the premium — it must look and feel expensive.

**Critical context — AEO:** A live test showed AI assistants (Gemini) recommend
competitors, not LAVALAVA, because competitors saturate machine-readable text
connecting *category + zone + premium*. This site MUST fix that: real text (not
text-in-images), structured data, and geographic/category keyword coverage are
first-class requirements, not afterthoughts. See Section 5.

---

## 1. Tech Stack & Setup

- **Framework:** Next.js 14 (App Router), TypeScript, deployed on Vercel → lavalava.vip
- **Rendering:** Static generation (SSG). The site is content-static; pre-render
  both language versions for speed and SEO. No SSR needed.
- **Styling — IMPORTANT DECISION:** The original intent was Tamagui (for
  consistency with the POS). For THIS site, reconsider: it's a static marketing
  page where **mobile performance directly drives SEO ranking** (87% of traffic
  is mobile). Tamagui is heavier than needed for a web-only static site.
  - **Recommended:** CSS Modules or Tailwind — feather-light, fast, full control
    over the precise design tokens below. Best for Core Web Vitals.
  - **Acceptable:** Tamagui, IF disciplined about bundle size, for POS
    consistency. If chosen, keep the component surface minimal.
  - Claude Code: pick based on performance-first; flag the tradeoff before
    committing. Do not let framework weight compromise mobile speed.
- **Fonts:** `next/font` for Fraunces (headings) + Source Sans 3 (body) — self-hosted,
  no layout shift, no external font requests.
- **Images:** `next/image` throughout, AVIF/WebP, responsive srcset.
- **Repo:** github.com/[lalo]/lavalava-web (or as configured). Read any CLAUDE.md.

---

## 2. Design System (extracted from the locked design)

The visual direction is **light/airy "quiet luxury"** (boutique-hotel feel) with
navy as deliberate accent moments — NOT navy-dominant. Light dominates; the
design gets out of the way and frames beautiful photography; huge whitespace;
calm, slow pacing; one idea per screen.

### 2.1 Palette (exact values)
```
--bone:        #F7F4EE   /* primary surface — the canvas, 70%+ of the page */
--bone-alt:    #FAF8F3   /* secondary light surface for subtle section shifts */
--ink:         #1B2536   /* primary text — soft charcoal-navy */
--navy:        #16233B   /* ACCENT MOMENTS only (final CTA, one mid-page band) */
--sand:        #E4D8C4   /* muted warm sand — subtle blocks/dividers only */
--teal:        #5E7F84   /* DESATURATED dusty teal — whisper accent only:
                            thin lines, small labels, the wave mark. Never bold. */
--line:        rgba(27,37,54,0.12)  /* hairline dividers */
```
Rule: light dominates, navy is punctuation (2–3 moments max: the final CTA, and
one mid-page section for rhythm), teal/sand only whisper. Never a saturated color
dominating.

### 2.2 Typography
- **Fraunces** (serif) — headlines and the LAVALAVA wordmark. Elegant, warm,
  editorial. Large, with generous space around it.
- **Source Sans 3** (sans) — body, UI, labels.
- **Signature label device:** small, UPPERCASE, wide letter-spacing (~0.2em)
  sans eyebrows, paired with numbered section markers: `01 —`, `02 —`, `03 —` …
  through `08 —`. This editorial device runs through every section and is a
  core part of the premium feel. Keep it consistent.
- Wordmark: `LAVALAVA` in Fraunces, letter-spaced.

### 2.3 Spacing & layout
- Generous. Large vertical rhythm between sections (think 96–160px on desktop,
  scaled for mobile). Wide margins. Let everything breathe — whitespace IS the
  premium signal.
- One idea per screen. Don't crowd.
- Mobile-first: design and implement mobile layout first, enhance up.

### 2.4 Components & interactions
- **Quiet, refined.** Thin-outline buttons; text links with a small arrow (→);
  slow, gentle fades on scroll-in. Nothing loud.
- **Primary WhatsApp CTA:** the one exception to pure-outline restraint — give it
  slightly more presence (a subtle fill: soft navy or the desaturated teal) so
  it's unmistakably the primary action, while still feeling calm. Secondary
  actions stay as outline/text-link.
- **The wave mark:** keep it, rendered quietly (a calm single wave, not busy
  swooshes). Sits lightly in the light layout.
- Accordion for FAQ (the `+` expand pattern from the design).

---

## 3. Bilingual Architecture (ES / EN)

The design already uses a data-driven translation pattern (`t.heroTitle` etc.)
with full ES and EN string sets. The English is native-written (not machine
translation) — preserve that quality.

- **Implement proper i18n**: locale-based routing. Spanish is primary/default
  (`/` or `/es`), English at `/en`. Static-generate both.
- **Language toggle** (ES/EN) in header and footer, first-class, visible.
- **hreflang tags** in `<head>` for every page: `es`, `en`, and `x-default`
  (→ Spanish). This is how Google serves the right version per searcher and is
  required for the bilingual SEO to work.
- Keep the string sets in a clean translations structure (JSON/TS objects per
  locale). The existing `es{}` / `en{}` objects map directly — reuse the copy.
- **Do not machine-translate.** The existing English is good; preserve its
  idiomatic quality ("Wash & press," "the moment it's ready," "gift on your
  first visit"). One tune: EN hero kicker currently leads with "dry cleaner" —
  change to "premium laundry & dry cleaning in Distrito Tec" so it doesn't
  undersell laundry (the higher-volume search term).

---

## 4. Page Structure (sections, in order)

All present in the locked design. Each keeps its `NN —` editorial label. Light
background by default; navy only where noted.

1. **Header** — LAVALAVA wordmark (Fraunces), ES/EN toggle. Minimal, sticky-light.
2. **Hero** — kicker (category + zone), "Más tiempo para ti." (Fraunces, large),
   subhead (keyword-bearing: *lavandería y tintorería premium en Distrito Tec*),
   primary WhatsApp CTA, "Cómo llegar →". Hero image (AI, soft linen/light) is
   the LCP — optimize and priority-load it.
3. **First-visit welcome** — small, elegant strip: "Bienvenido a LAVALAVA —
   recibe un beneficio en tu primera visita." Premium-framed, not a promo banner.
4. **01 — Pillars** ("Por qué LAVALAVA"): Cuidado visible / Sin complicaciones /
   Puntualidad confiable.
5. **Trust bar** — 5.0 ★ en Google · 1,300+ clientes · Zona Tec.
6. **02 — Servicios**: lavandería por kilo, tintorería, lavado y planchado,
   delicados y vestidos, cobertores y blancos, tenis, + servicio a domicilio.
   (Steers toward premium services — the ticket-raising goal.) No prices.
7. **03 — Cómo funciona** — FOUR explicit steps: 1 Escríbenos · 2 Recogemos ·
   3 Cuidamos · 4 "Lista. Te avisamos." (the signature payoff moment).
8. **04 — Servicio a domicilio** — home pickup/delivery highlight (premium
   convenience). Photo + benefit bullets + WhatsApp CTA.
9. **05 — Reseñas** — 3 REAL Google reviews (name, stars, Google glyph). Plus the
   compliant feedback prompt: "¿Cómo te fue? Cuéntanos por WhatsApp" (rewards
   feedback/visit, NOT the star rating — Google-compliant).
10. **06 — Instagram** — live feed embed (Section 6), @lavalava.vip follow CTA,
    follow-for-benefit incentive.
11. **07 — Ubicación** — embedded interactive Google Map, address (Av. Junco de
    la Vega, Col. Roma, Distrito Tec), hours, "A minutos del Tec."
12. **08 — FAQ** — 7-item accordion (already written). Becomes FAQPage schema
    (Section 5). This is a key AEO asset.
13. **Final CTA** — NAVY moment (bookend): "Más tiempo para ti empieza con un
    mensaje." + large WhatsApp CTA.
14. **Footer** — wordmark, ES/EN toggle, address, email (hola@lavalava.vip),
    social links, copyright. Full machine-readable NAP.

### 4.1 Sub-pages (spokes — the AEO depth layer)
The homepage summarizes; these go deep. Each is a real, substantial, bilingual
page with its own `generateMetadata`, relevant structured data, real body copy,
internal links back to the hub and to WhatsApp, and the category+zone keywords
for its intent. They are NOT placeholders to delete — they are the strategy.
Content depth per page needs a review pass with Lalo before writing.
- **`/servicios`** — full services catalog in depth: lavandería por kilo,
  tintorería, lavado y planchado, delicados y vestidos, cobertores y blancos,
  tenis. Real descriptions, use cases, keywords. Intent: "[service] Distrito Tec."
- **`/a-domicilio`** — home pickup & delivery in depth: how it works, coverage
  (Zona Tec / Distrito Tec / nearby colonias), why it's premium-convenient,
  WhatsApp CTA. Intent: "servicio a domicilio / lavandería a domicilio."
- **`/ubicacion`** — location/visit page: address, map, hours, landmarks
  ("a minutos del Tec"), parking, finding us. Intent: "cerca del Tec / cerca de mí."
More spokes can be added later (e.g. a tintorería-de-vestidos page — the
"vestidos de XV años" demand is real in the search data).

---

## 5. SEO / AEO Technical Layer (first-class — do not skip)

This is what makes LAVALAVA discoverable and AI-recommendable. The Gemini test
proved it's the highest-leverage part.

### 5.1 Structured data (JSON-LD) — REQUIRED
- **LocalBusiness / `DryCleaningOrLaundry`** schema on the page:
  name, description (per-locale), `@type`, address (full — street, Col. Roma,
  Distrito Tec, Monterrey, NL, 64700, MX), `geo` (lat/lng), `telephone`, `url`,
  `openingHours`, `priceRange`, `areaServed` (Distrito Tec / Zona Tec), and
  `sameAs` (Instagram, Google profile).
  **`aggregateRating` is deliberately OMITTED** — self-reported rating markup is
  a Google penalty risk. Real ratings surface via the Places API + the review
  cards. Do not re-add it. (Decision Aug 2026; see CLAUDE.md "What's left" #1.)
- **FAQPage** schema built from the 8-section FAQ (the 7 Q&A pairs). This feeds
  Google and AI engines the exact Q&A they extract and quote. High AEO leverage.
- Validate both with Google's Rich Results Test before shipping.

### 5.2 Metadata
- Per-locale `<title>` and `<meta description>` — keyword-bearing, natural.
  Include both accented and unaccented forms naturally across copy
  (lavandería/lavanderia, tintorería/tintoreria — search data shows ~50/50).
- Open Graph + Twitter card (title, description, a branded OG image).
- `hreflang` alternates (es, en, x-default) — Section 3.
- Canonical URLs per locale.

### 5.3 Semantic HTML & content
- Real text everywhere — NEVER put headlines, services, or key copy in images.
  (This was the core failure Gemini identified.)
- Proper heading hierarchy (one H1 per page = the hero; H2 per section).
- Geographic saturation, naturally in copy: Distrito Tec, Zona Tec, Colonia Roma,
  Av. Junco de la Vega, Tec de Monterrey, Monterrey.
- Descriptive alt text on every image (bilingual per locale), keyword-aware but honest.

### 5.4 Technical SEO
- `sitemap.xml` (both locales), `robots.txt`.
- Fast mobile performance (Section 8) — Core Web Vitals are a ranking factor.
- Accessible (semantic landmarks, focus states, contrast) — also aids SEO.

---

## 6. Integrations

### 6.1 WhatsApp (primary CTA — everywhere)
- All primary CTAs → `https://wa.me/52XXXXXXXXXX?text=<prefilled>` (full intl
  number, supplied asset). URL-encode a friendly prefilled message, e.g.
  ES: "¡Hola LAVALAVA! Me gustaría más información." / EN native equivalent.
- Open in new tab. No form, no booking system in V1 — WhatsApp IS the conversion.

### 6.2 Instagram — live feed embed
- Requirement: a LIVE feed of @lavalava.vip in section 06.
- **Honest note:** Instagram has no simple free official feed widget since the
  Basic Display API changes. A live feed needs a **third-party widget service**
  that handles auth/token refresh. Recommended lightweight options: **Behold.so**,
  **LightWidget**, or **EmbedSocial** (freemium; pick one). These give an embed
  snippet and manage the token.
- **Performance:** lazy-load the widget (below the fold) — use a facade / load
  on scroll so it doesn't block initial render or hurt LCP.
- **Fallback (build this too):** a curated 6-image grid linking to the profile,
  shown if the widget fails to load — so the section never appears broken.
- Follow CTA → `https://instagram.com/lavalava.vip`.

### 6.3 Google Map — embedded interactive
- Section 07: embedded interactive Google Map (Maps Embed API iframe, or the
  place share-embed).
- **Performance:** lazy-load / facade pattern (load the iframe on interaction or
  when scrolled into view) — maps are heavy and would otherwise hurt mobile
  Core Web Vitals. Do NOT eager-load it in the initial payload.
- Include a text address alongside (for SEO + the schema) and a "Cómo llegar →"
  link that deep-links to the Google Maps listing.

---

## 7. Photography — AI-Generated (style guide)

All launch imagery is AI-generated, graded to one consistent look. This aesthetic
lives or dies on image quality — a light/airy layout with weak images looks empty.

### 7.1 Style (every image obeys this)
- Soft natural light, warm, slightly desaturated, calm, editorial (not stock-y).
- Palette-consistent with the site (bone, warm neutrals, soft navy/teal hints).
- Subjects: folded linen and garments in soft light; calm neutral interiors;
  hands with fabric; morning light on cloth; the pickup moment (abstract, warm).
  Atmosphere and texture over literal "laundry machine" shots.

### 7.2 Honesty constraint (important)
- Use AI images for ATMOSPHERE and TEXTURE only. Do NOT generate images that
  fake the actual store, real staff, or imply specific results/claims that
  aren't real. Mood: yes. Fabricated "our store / our results": no. This
  protects trust (your biggest asset) and keeps you honest.
- Where an identifiably-real element is needed later (storefront, team), leave a
  slot for a real photo.

### 7.3 Technical
- Export AVIF/WebP, responsive sizes, `next/image`.
- Hero image = LCP: `priority`, properly sized, compressed. Everything else
  lazy-loads.
- Bilingual, descriptive alt text.

---

## 8. Performance (mobile-first — 87% of traffic)

Performance is a business requirement here: it drives SEO ranking and reflects
the premium brand. Targets: green Core Web Vitals on mobile.
- SSG both locales; minimal client JS.
- `next/image` (AVIF/WebP, srcset, lazy except hero); `next/font` (self-hosted).
- Lazy-load / facade the heavy embeds (Instagram widget, Google Map).
- Keep the framework bundle lean (Section 1 styling decision).
- Preload the hero image and fonts; avoid layout shift (CLS).
- Test on real mobile + Lighthouse before deploy; iterate to green.

---

## 9. Real-Asset Checklist (Lalo supplies; build with placeholders until then)

Design every placeholder to be cleanly swapped. Needed for launch:
1. **Logo files** — the real wave logo, SVG preferred (mockup uses a placeholder
   wordmark treatment).
2. **WhatsApp number** — full international format for wa.me links.
3. **3–6 real Google reviews** — text, names, star counts, + Google profile link.
   Pick ones mentioning speed, care, the WhatsApp "ready" moment.
4. **Google Maps place** — the exact listing/embed for the interactive map.
5. **Real business hours** — CONFIRM (POS logic treats Saturday as a full
   business day; verify the site/GBP hours match reality — wrong hours lose
   "abierto ahora" searches).
6. **Instagram** — @lavalava.vip + the chosen widget service account.
7. **AI images** — generate per Section 7: hero (linen/light), pickup moment,
   services atmosphere, any section imagery. Consistent grade.
8. **OG/branded share image.**
9. **Google Business Profile alignment** — ensure NAP + hours + categories match
   the site exactly (consistency is an AEO signal; see the separate GBP playbook).

---

## 10. Skills to Leverage

Two installed frontend skills should inform the build:
- **Anthropic Frontend Design skill** (`/mnt/skills/public/frontend-design`) — for
  design tokens, styling constraints, and distinctive (non-templated) visual
  quality. Read it before building UI.
- **ui-ux-pro-max skill** — for UX patterns and polish.
Read both before implementing components; apply the design system in Section 2.

---

## 11. Build Order (staged — verify each before moving on)

**Step 1 — Scaffold & design system**
Next.js 14 App Router + TypeScript + chosen styling. Implement the palette,
fonts (next/font: Fraunces + Source Sans 3), spacing scale, and the numbered-
label + button/link components. Verify tokens render correctly.

**Step 2 — i18n foundation**
Locale routing (es default, en), the translation structure (reuse existing ES/EN
copy), language toggle, hreflang. Verify both locales render and toggle works.

**Step 3 — Static sections (top to bottom)**
Build each section (Section 4) with real copy and placeholder images/embeds.
Mobile-first. Light/airy language; navy only at the final CTA (+ one mid-page
moment for rhythm). Verify the full scroll on mobile.

**Step 4 — SEO/AEO layer**
LocalBusiness + FAQPage JSON-LD, metadata, hreflang, semantic HTML pass,
sitemap, robots, alt text. Validate with Google Rich Results Test.

**Step 5 — Integrations**
WhatsApp deep-links on all CTAs; Google Map (lazy/facade); Instagram widget
(lazy + curated fallback). Verify each works and none block render.

**Step 6 — Images**
Drop in the AI images (or final placeholders), optimize, hero as LCP priority.

**Step 7 — Performance pass**
Lighthouse mobile → green Core Web Vitals. Fix CLS/LCP. Lazy-load audit.

**Step 8 — Deploy**
Vercel → lavalava.vip. Confirm both locales, schema live, mobile speed, all CTAs.

Report after each step. Do not race ahead — verify mobile rendering and
performance as you go, since those are the business-critical outcomes.

---

## 12. Deferred (not in V1)

- Booking/scheduling system, e-commerce (V1 CTA is WhatsApp).
- Blog / editorial content SEO (a strong *future* AEO lever — "mejores
  lavanderías cerca del Tec" style articles). NOTE: this is distinct from the
  V1 sub-pages (/servicios, /a-domicilio, /ubicacion), which ARE in scope now
  (Section 4.1) — the blog is a later, additional content layer.
- Dedicated English-market landing pages (grow the foreign/tourist niche later).
- Additional topic spokes beyond the first three (e.g. tintorería de vestidos).
- The signature-detergent brand story (formula not ready; explicitly out).
- Online payments, customer portal.

---

*This site is the anchor of a coordinated relaunch (website + social + price
increase). Its job is to make the premium visible and to win the local + AI
discovery that competitors currently take by saturating machine-readable text.
Build it light, fast, beautiful, and deeply legible to both humans and machines.*
