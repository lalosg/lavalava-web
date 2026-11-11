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
- Type: **Canela Web** (display) + **Source Sans 3** (functional). Wide-tracked
  uppercase eyebrow labels. The `NN —` numbering was REMOVED in Sep 2026 — see the
  typography system below; it survives only in the four "Cómo funciona" steps, which
  are a real sequence.
- WhatsApp CTA gets slightly more presence (subtle fill) than the otherwise
  quiet outline/text-link components.
- AI photography = atmosphere/texture only (soft warm light, folded linen, calm
  interiors). NEVER fabricate the real store/staff or fake results/claims.

## Build status (audited against real code, Nov 5 2026)
Steps 1–5 DONE; build clean. Site is slightly AHEAD of earlier notes:

> **Session update — Nov 9-11 2026: the hero plays video, the OG image is real, and the
> repo was audited end to end.**
>
> **THE HERO IS VIDEO NOW.** `components/motion/HeroVideo.tsx`, overlaid on the two
> photographs inside `HeroParallax`. The photographs did not go away — **they are the
> poster**: they paint the first frame, they are what LCP measures, and they remain the
> hero wherever the video must not load. A `<video poster>` would have done this for one
> image, but the hero is art directed and `poster` takes no `media` attribute.
>
> Rules this component encodes, all of them load-bearing:
> - **Nothing is fetched until `load` has fired**, then on the first idle slot. The `src`
>   is assigned in the client, so it never appears in the HTML and no preload scanner
>   pulls it forward. Measured: the request starts at 102ms against `loadEventEnd` at
>   82ms, and Lighthouse's byte weight for the page is unchanged.
> - **One file is fetched, never two.** The breakpoint is read with `matchMedia` at the
>   moment the source is chosen. Shipping two elements and letting CSS hide one is the
>   mistake the two hero images had to be rescued from — `display:none` does not cancel a
>   preload.
> - **It does not load at all** under `prefers-reduced-motion`, under Save-Data, or on a
>   connection reporting 2g/3g. The photograph stays, and it is a correct hero alone.
> - **AV1 requires `canPlayType` === `probably`, never `maybe`.** `maybe` means the
>   browser recognises the container but will not commit to the codec; trusting it leaves
>   a black hero instead of falling back to H.264.
> - The fade-in is a deliberate exception to the no-opacity-above-the-fold rule, and a
>   safe one: the element that paints and measures is the photograph underneath, opaque
>   from the first frame. The video arrives after LCP has already happened.
>
> **Shipping (10s, 24fps, no audio track at all — absent, not muted):**
> ```
> mobile  1080x1920  AV1 CRF 44   967 KB   VMAF 93.1
> mobile  1080x1920  H.264 CRF 27 1489 KB  VMAF 92.2
> desktop 1920x1080  AV1 CRF 44  1046 KB   VMAF 93.8
> desktop 1920x1080  H.264 CRF 27 1455 KB  VMAF 92.4
> ```
>
> **⚠️ VMAF: the default model is a TELEVISION at three picture heights.** Measuring a
> phone hero with it is measuring the wrong thing — it scored a perfectly good encode at
> 83 and made the bitrate look like a wall. The phone model is
> `libvmaf=model='version=vmaf_v0.6.1\:enable_transform=true'`, and the same file scored
> 94.9. On clean Kling footage the phone model **saturates at 100** and cannot
> discriminate, so the standard model is the one to choose CRF with. Use both and know
> which question each answers.
>
> **VP9 was proposed and is REJECTED, with numbers.** Against the same master: VP9 1386 KB
> → 89.6, AV1 797 KB → 92.0, H.264 1154 KB → 90.1. Half the weight and a better picture
> in AV1, and VP9 loses to H.264 as well. **AV1 + H.264, two files. Do not add a third.**
>
> **The source was the limit, never the encoding.** Lalo tried Draw Things + MiniMax +
> Upscayl (124 PNGs, 3584x6144, 4.6GB) and it never matched Kling. The numbers say why:
> the same CRF gives 1107 KB for 5.2s of the upscaled footage and 967 KB for **10s** of
> Kling. Twice the duration at less weight, because the source is clean. Two of my own
> hypotheses were wrong along the way and both were killed by measurement — it was not
> grain from the upscale (a denoise moved the size 3%), it is **motion**: a breeze across
> the whole frame changes every pixel every frame, and there is no trick for that.
>
> **⚠️ A PNG sequence must never be fed to ffmpeg with `-pattern_type glob`.** Lalo's
> frames were named `0_`, `1_`, `10_` with no zero padding, so glob orders them 0, 1, 10,
> 100, 101 … 11 and the clip comes out scrambled **in silence**. Build a numerically
> ordered symlink sequence (`f_%04d`) and verify a sample before encoding.
>
> **Masters live in `assets-src/`, which is gitignored.** Four-plus GB of intermediates
> were dropped into `public/` twice during this session. Anything in `public/` is served
> publicly and goes into the Vercel build whether or not git tracks it.
>
> **The OG image is done.** Lalo supplied it; three things stood between the file and a
> working preview. It was in `public/images/` while `lib/seo.ts` points at `/og-image.jpg`
> — every share was a 404. It was 1733x907 while the tags declare 1200x630. And it was
> 1.04 MB: **WhatsApp drops the thumbnail above roughly 300 KB**, and WhatsApp is this
> business's primary channel. Now 1200x630 at 165 KB.
>
> **The posters are the exact frames fed to Kling as its first frame**, so the photograph
> and the video's opening frame are the same picture and there is no jump when playback
> starts. 1536x864 and 864x1536, JPEG q85.
>
> **Repo audit (Nov 11).** An import-resolution pass over all 66 modules found exactly one
> orphan: `RevealImage`, the services grid's entrance before the pinned sequence replaced
> it, which took ~25 lines of `.reveal-image` CSS with it. `nav.whatsapp` was the only one
> of 37 second-level translation keys with no reader. All 14 npm dependencies are used, no
> other CSS class is unreferenced, and `public/` is now **exactly the thirteen files the
> site serves**. `public/images_backup/` moved to `assets-src/images-anteriores/` — it was
> gitignored but Vercel would still have published it.
>
> Mobile 99/100/100/100 LCP 1.6s; desktop **100**/100/100/100 LCP 0.7s; CLS 0; shared
> First Load JS unchanged at 87.3 kB.

> **Session update — Nov 6 2026: the services sequence, finished — and the lesson that cost the day.**
> Nine commits on `test/services-no-crop`, merged. This session took far too many
> iterations and the reason is worth more than the code: **I validated against an emulated
> viewport that no real phone has.**
>
> ⚠️ **THE RULE THAT CAME OUT OF THIS — read it before touching any full-screen layout.**
> Chrome DevTools device mode does NOT model the browser chrome, so there `svh == lvh ==
> dvh == 852`. **No phone in portrait with its bars reaches 852 of *small viewport*.** Lalo's
> iPhone reports **~658** and his Poco F5 **~769**. For weeks this section was measured at
> 390×844 and reported as correct while it was broken in his hand. **The realistic band is
> 600–880, and the LOW end is the normal case, not the high one.**
>
> **`scripts/svc-invariants.js` exists because of that**, and it is the main deliverable
> here. It is browser-side assertions, run over the band in both locales (the run loop is
> in its header comment). It asserts: nothing clipped in silence (`scrollHeight ===
> clientHeight` on every clipping box — **this is the one that matters**, it turns invisible
> content loss into a loud failure), the photograph at the full width with its own ratio,
> the photograph clearing the menu with no gap in front of it, the description inside its
> panel, the ribbon welded to the description, the pinned travel equalling track minus
> stage, no title escaping its photograph, and no horizontal overflow. **It caught two real
> regressions while being written.** Extend it rather than eyeballing.
>
> **The layout, settled (mobile; desktop 3×2 grid untouched throughout):**
> - The **heading is OUTSIDE the pinned stage**, in normal flow, 36px over two lines. It
>   does not fit inside: menu + a full-width uncropped 3:4 photograph + the panel need
>   694px of an iPhone's ~658, with the heading already at zero. Putting it inside forced
>   it to 10px or hid it under the menu, and both shipped before being caught. **Do not
>   move it back in** — the harness asserts it.
> - **The photograph is 100vw with its exact 3:4 and is never cropped.** Lalo's call,
>   stated three times. The files are 1086×1448, exactly 3:4, so at full width they lose
>   nothing. It clears the menu by `pt-[66px]`, measured, with zero slack in front of it.
> - **The sand panel is 6.5rem**, compressing to 4.25rem only where the screen cannot hold
>   it, and reaches the viewport bottom on a short phone.
> - **The delivery ribbon lives INSIDE the stage**, as the element after the deck, welded
>   to the description (gap 0, asserted). It is **not sticky** — a sticky version was built
>   and rejected: pinned to the foot of the screen it appeared above the heading and over
>   the photograph.
> - Three heights derive from one value: `--svc-stage-h` is the menu clearance plus the
>   deck plus an **8rem estimate of the ribbon**; the track is that plus `--svc-scroll`;
>   and `read()` measures its span against the stage's **real** `offsetHeight`, so the
>   estimate cannot move where the sequence ends. Measuring the span against the viewport
>   instead is what left a band of bone before the ribbon arrived.
>
> **Earlier in the same session, and still true:** the crossfade was rebuilt. A screenshot
> at the midpoint showed **two titles and two descriptions legible at once** over a milky
> photograph — two cards at 0.5 composite to 75% coverage, so the bone came through. The
> incoming card now fades in ON TOP of an outgoing card that stays opaque, only the two in
> play are painted, `DWELL = 0.45` holds each photograph still for the first 45% of its
> segment (55% of the sequence is at rest), and the words cut in their own narrower window
> so a beat passes with no text. `SCROLL_PER_SERVICE` is 0.9.
>
> **Two corrections to earlier notes in this file:**
> - **9:16 masters would make this WORSE, not better.** That advice was computed for a
>   full-viewport frame and does not apply here. A taller source crops more. What this
>   composition would actually want, if the heading and the panel were ever to share one
>   screen with a full-bleed photograph, is something near **1:1**.
> - The "3:4 loses 38–40% to the crop" line was wrong. At the full width the files lose
>   nothing; what cropped them was a height cap that no longer exists.
>
> Final: **99 performance / 100 a11y / 100 best practices / 100 SEO**, LCP 1.6s, CLS 0,
> harness green on 658/700/734/769/800/852 in both locales, desktop 371px cards unchanged,
> reduced motion 6/6 visible.
>
> **Nov 7 2026 — desktop homologated to the mobile look.** The 3×2 grid, its sizes and its
> distribution are untouched; what changed is the card's skin. Lalo's four points:
> - **A bug the request happened to fix:** the service title already existed on desktop,
>   but `md:static` took it out of positioning inside a box with `overflow:hidden`, so it
>   sat in flow BEHIND the `fill` image. It was in the DOM and invisible on every large
>   screen, and nobody had noticed.
> - The title now stays **absolute inside the photograph at every size**, white over the
>   same navy gradient as mobile. Mobile sizes it in CSS against the photo's width; from
>   md it steps by breakpoint (24 / 28 / 32px) because the card does not follow the
>   viewport. At md the column is 221px, so the longest title takes two lines rather than
>   go below Canela's 24px floor.
> - **The sand panel is now on desktop too.** The card is a flex column from md and the
>   grid stretches, so `flex-1` on the panel makes every panel in a row the same height
>   even when the descriptions run 2 vs 3 lines — verified 94/94/94 and 122/122/122.
>   The `pr-20` that cleared the mobile counter becomes symmetric from md; there is no
>   counter on desktop and none was added.
> - **The delivery ribbon is full bleed at every size, its content is not.** The band runs
>   edge to edge; the inner box is `max-w-6xl mx-auto` with the padding OUTSIDE the max
>   width, which is the only arrangement where its text starts exactly where the first
>   card does. With the padding inside it landed 32px off at 1440. Verified aligned at
>   768 / 1024 / 1440 / 1920.
>
> Desktop Lighthouse 99/100/100/100, LCP 0.9s. Mobile unchanged and still green on the
> harness in both locales.
>
> **Nov 7 2026, second pass — the desktop entrance is back.** Lalo was right that it had
> been lost: before the mobile sequence replaced the grid, every card was wrapped in
> `RevealOnScroll delay={i*60}`, and that went with it.
>
> It returns as a **class, not a component**, and the whole rule lives inside
> `@media (min-width: 768px)`. That is the point: on a phone the opacity of these same
> cards is written frame by frame by the scroll, so anything else touching their opacity
> there would fight the sequence. Below md the class simply does not exist.
>
> - **The delay comes from the COLUMN (`i % 3 * 90ms`), not the index.** Row one sweeps
>   left to right, and row two repeats the same sweep when it arrives, instead of
>   accumulating a delay that would land card six half a second late. It is set inline so
>   it ships in the server HTML and does not wait on hydration.
> - The ribbon carries `270ms`, the fourth beat after the three columns. Without it, on a
>   tall screen it enters alongside row two instead of closing it.
> - A **second effect**, deliberately not folded into the existing one: that one returns
>   early precisely on desktop, which is where this has to work.
> - ⚠️ **`md:opacity-100` had to come off the card.** Tailwind emits responsive variants
>   AFTER the file's own rules, so it beat `.svc-reveal` and the cards were visible from
>   the start. Desktop opacity is now `.svc-reveal`'s alone, with its own no-JS fallback
>   placed after it (`scripting: none`, with `!important`, since the general block sits
>   earlier in the file and would have lost the cascade).
>
> Measured: everything at 0 at the top; row one 0.64 / 0.35 / 0 then settled while row two
> is still 0; row two 0.6 / 0.28 / 0 with the ribbon still 0; the ribbon last. Mobile
> untouched — the crossfade still paints only two cards at a time and the harness, which
> now also asserts the entrance cannot leak below md, is green in both locales.
>
> ⚠️ **The entrance broke the ribbon's full bleed, and the reason generalises.** The bleed
> lives in a `translateX(-50%)`, and writing `transform` on that element — which the
> entrance did, for the 20px rise — erases it: the band appeared shifted half a screen to
> the right. **Never write `transform` on `.svc-ribbon`.** The entrance now animates
> **opacity only**, and the rise belongs to `.svc-card.svc-reveal`, which carries no other
> transform. The same trap was sitting in the `scripting: none` and `prefers-reduced-motion`
> fallbacks, which both reset `transform: none` on `.svc-reveal`; those are scoped to the
> card now. The harness asserts the bleed, so the class of bug is caught rather than the
> instance.
>
> **The reduced-motion unwind is scoped to `max-width: 767px`**, which it always should
> have been. It is the mobile list; on desktop it was putting the ribbon in `static` while
> it kept a screen-wide box, opening **144px of horizontal scroll** at 1440. Found by
> measuring, not reported.
>
> **The harness bails out above 767px** with a note. Its contract is the mobile one — grid
> instead of sequence, 371px photographs instead of full width — so every assertion fires
> a false positive on desktop, including one caused by the harness itself comparing every
> title against the FIRST card's photograph.
>
> Desktop **100**/100/100/100, LCP 0.8s. Mobile 99/100/100/100, LCP 1.6s. CLS 0 on both.

> **Session update — Nov 5 2026: the services block is a pinned scroll sequence on phones.**
> Five commits on `feat/services-scroll-mobile`, merged. This is the first of the four
> "front-end design" moves below — #3, continuous scroll choreography on ONE sequence.
> Every geometry number here was read from the rendered page at six viewport heights, not
> from the source.
>
> **What it is.** Below `md`, the six services become one full-height stage that pins while
> the page scrolls past it, crossfading photograph to photograph. **From `md` the 3×2 grid
> is completely untouched** — Lalo's explicit constraint. `components/services/ServicesShowcase.tsx`.
>
> **ONE set of markup serves both breakpoints**, switched with responsive classes: each card
> is `absolute inset-0` on mobile and a `relative` grid cell from md. The alternative — a
> grid and a sequence side by side, each hidden at the other's breakpoint — would put all
> six titles and descriptions in the DOM twice, which is the duplication removed from these
> very cards in the typography session and which an AEO-first page cannot afford.
>
> **Sticky with reserved height, NOT scroll-jacking.** The page scrolls at the speed the
> thumb asks for, with its own momentum; the sequence just holds still while it passes. The
> track reserves `100svh + (n-1) × 0.7 × 100svh`. Opacity is written straight to the DOM
> nodes in a rAF, never through React state — six cards re-rendering per frame is how a
> smooth page becomes a janky one. Only the counter goes through state, and only when the
> index actually changes.
>
> **The mobile stage is measured BOTTOM-UP, and that order is the design:** first the sand
> panel that must never clip the description, then the photograph at its full 3:4, and
> whatever is left at the top belongs to the eyebrow and the headline. The headline is sized
> with `clamp()` over that remainder in `vh`, so on a short screen it **shrinks instead of
> being cut**. The allocation lives in `.svc-*` in `globals.css`, not in Tailwind classes —
> declaration order matters here and arbitrary values cannot control it.
>
> **The reserve constant is load-bearing: `8.5rem`.** It must be ≥ eyebrow (19.5) + its
> margin (12) + two headline lines at 1.12× + padding (20). At 6rem the block was 35px short
> and `justify-end` pushed the overflow **upward, behind the 66px header** — the eyebrow
> "SERVICIOS" disappeared on any phone showing its URL bar, which is why it looked fine at
> 844 and broken at 700. If the headline cap (`2.3rem`) or the eyebrow size changes, redo
> that sum. Measured pinned at 667/700/750/800/844/932: the eyebrow clears the header by
> 23–36px in all six.
>
> **Deliberate choices, each made against an alternative:**
> - **Progress, not jump navigation.** `01 / 06` plus a hairline, top-right **inside the
>   photograph** (it must be inside `.svc-deck`, or `top-4` resolves against the pinned
>   stage and lands behind the menu). Six dots are tiny targets and clutter the
>   composition, and nobody arrives wanting service four. What a pinned section owes the
>   reader is "how much is left" — a question about anxiety, not navigation.
> - **The description panel is `sand`, not navy.** `bg-navy` is used 18× and the homepage
>   already carries four navy bands; the delivery ribbon directly below is one of them, and
>   two navy bands touching read as a single block. Measured: sand gives 11.15× the
>   luminance difference against navy and carries `ink/80` at 6.4:1. `ink` was rejected at
>   1.02× (indistinguishable); `teal` as a surface fails AA with every text colour.
> - **Servicio a domicilio is a full-bleed ribbon on mobile**, welded to the foot of the
>   sand panel (gap measured 0) and edge to edge, using the same `w-screen left-1/2
>   -translate-x-1/2` the track uses — document stays at 390, no horizontal overflow. Its
>   `RevealOnScroll` was REMOVED: the wrapper's 20px travel opened a bone seam under the
>   panel on the way in, and a band welded to something must not slide into place. From md
>   it returns to the 1152px column with its 20px gap.
> - **Reduced motion unwinds the stacking entirely** (`.svc-card { position: relative;
>   opacity: 1 !important }` etc.). Simply disabling the animation left five of six cards
>   at `opacity: 0`, because here the sequence *is* the layout. Verified 6/6 visible.
>
> **Verified:** 99 performance / 100 a11y / 100 BP / 100 SEO, LCP 1.6s, CLS 0.00009, zero
> horizontal overflow; desktop cards still 371px.
>
> ⚠️ **`next start` does not rebuild CSS.** LAN testing runs a production server, so a
> `globals.css` edit is invisible until `npx next build` runs again. A fix was reported as
> landed when the phone was still being served the previous build's stylesheet. **Confirm a
> CSS change by curling the served `/_next/static/css/*.css`, not by reading the source.**
>
> **Rhythm and title tuned, Nov 6 2026 — and the tuning uncovered a real defect.**
> A screenshot taken at the midpoint of a transition showed **both titles and both
> descriptions legible at once**, over a washed-out photograph. The cause was the
> crossfade model: two cards at 0.5 composite to 1-(0.5)(0.5) = **75% coverage**, so a
> quarter of the bone background came through. Three changes, all in
> `ServicesShowcase.tsx`:
> - **The incoming card now fades in ON TOP of an outgoing card that stays fully
>   opaque** (cards paint in DOM order; no z-index needed). Never any background wash.
>   Only two cards are painted at a time — everything already passed drops to zero
>   rather than sitting opaque underneath, so the compositor holds two full-screen
>   layers instead of six.
> - **`DWELL = 0.45`**: the photograph holds perfectly still for the first 45% of each
>   service's scroll segment. A linear fade across the whole segment meant the reader
>   was almost always looking at a blend rather than at a photograph. Measured: **55% of
>   the sequence is now at rest**, ~414px per service.
> - **The words cut, the photograph dissolves.** `TEXT_OUT = 0.35` / `TEXT_IN = 0.65`
>   inside the dissolve window, so there is a beat with **no words at all** — measured at
>   17% of the scroll, 126px per service. Fading the text at the image's rate is what
>   printed two titles on top of each other.
> - **`SCROLL_PER_SERVICE` 0.7 → 0.9.** At 0.7 one thumb flick carried the reader past
>   two services. The track is 5.5 screens (was 4.5), 34% of the page.
> - **The title is fluid: `clamp(1.75rem, 8.6vw, 2.25rem)` in `globals.css`.** It was a
>   fixed 1.9rem, which wrapped on a 320px phone and looked small on a 430px one. Sized
>   on **vw, not vh** — unlike `.svc-headline` — because what decides a title is whether
>   it fits the width. Verified: all **48 combinations** (6 titles × 2 locales ×
>   320/360/390/430) render on one line.
>
> Re-measured after: 99 / 100 / 100 / 100, LCP 1.6s, CLS 0, TBT 0ms; desktop still 371px
> cards with zero inline styles; reduced motion 6/6 visible with zero inline writes.
>
> **Still open on this component:**
> - ~~The service images are 3:4 and lose 38–40% to the crop; 9:16 masters would lose
>   ~20%~~ — **BOTH CLAIMS WERE WRONG, corrected Nov 6 2026.** At the full width the 3:4
>   files lose nothing, and a 9:16 master would crop MORE. See the Nov 6 session note.
> - `text-bone/50` in the delivery ribbon looks washed out on the device; it is at the
>   documented floor but worth re-examining at ribbon width.
> - The desktop grid has had none of this attention and is still the original 3×2.
> - The dwell/cut constants were tuned by measurement, not yet against a real thumb.

> **Session update — Oct 23 to Nov 5 2026: typography system rebuilt end to end.**
> Nine commits on `design/canela-display`, merged. Every number below was measured in
> the rendered page with real CPU/network throttling, not read off the source.
>
> **The display face is now Canela Web**, licensed from Commercial Type (web licence,
> order 2611-FFCWHZ). `app/fonts/Canela-Regular-Web.woff2`, 30.2 KB, 679 glyphs, full
> Spanish coverage. **The licence PDFs are deliberately OUT of this repo** — they live
> in `~/Documents/lavalava-licencias/`. Fonts now total 58 KB, down from 64 KB.
>
> ⚠️ **Two unlicensed copies were offered before this one and neither shipped.** The
> first was the desktop TTF from a pirate mirror; the second was that same file
> subsetted with the name table rewritten to "Lavalava" and the foundry, designer and
> licence fields emptied. Glyph outlines were byte-identical, which is how it was
> established. **If a font file appears whose provenance is not documented, check its
> `name` table before wiring it up.**
>
> **Served through `next/font/local`, NOT the @font-face in the vendor package.**
> next/font adds the content hash, the immutable cache header and a metrics-adjusted
> fallback family. That fallback is what holds CLS at 0 while the webfont loads.
>
> **The CSS variable is still `--font-fraunces` and the Tailwind key is still
> `fraunces`.** 77 component usages reference it. Renaming them would have buried a
> one-line font swap inside an unreviewable diff. Rename it when something else is
> already touching those files, not on its own.
>
> **Three bugs that only measuring the rendered page found:**
> - **The line mask was clipping every descender.** `RevealText` wraps each line in
>   `overflow:hidden` for the rise animation, and that clip stays. Canela descends to
>   −0.225em, so the tail of every `g p y q` was cut in all 21 headlines. Fixed with
>   padding-bottom 0.3em plus an equal negative margin — the clip box grows, layout
>   does not move. **Do not remove that padding.**
> - **The service description was a hover overlay on desktop**, unreachable by
>   keyboard or touch, and the same paragraph sat in the DOM twice.
> - **The homepage H1 scaled backwards** — 64px mobile, 48px desktop — because an old
>   `md:whitespace-nowrap` forced one line. Now 44/60/72, matching the spokes.
>
> **Final Lighthouse (production build, warm server, real throttling):** performance
> 99, accessibility 100, best practices 100, SEO 100. LCP 1.6s, CLS 0.00009, TBT
> ~10ms, zero horizontal overflow on all five pages.

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
3. ~~Missing OG image~~ — **DONE Nov 10 2026.** `/og-image.jpg`, 1200x630, 165 KB, with
   the master in `assets-src/`. Still open: the **favicon** is the create-next-app default
   (`app/favicon.ico`, 25,931 bytes exactly — verified, not guessed) and is fetched on
   every page load. Blocked on the vector logo.
4. **Instagram feed placeholder** — `INSTAGRAM_WIDGET_ID` undefined → six empty squares in
   prod. Needs a Behold.so account or an approved curated-grid fallback.
4b. **The wordmark is live text, not the logo.** Header and footer render "LAVALAVA"
   in Canela. Lalo has the final logo and can supply any format; it should be the
   approved SVG, which is also what the type brief's §12 asks for.
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
- ~~`public/images_backup/` sits inside `public/`~~ — **moved Nov 11 2026** to
  `assets-src/images-anteriores/`. `public/` now holds exactly the thirteen files the
  site serves; keep it that way.

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
4. ~~OG image~~ **DONE**; the **favicon** is still the create-next-app default.
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

## Typography system (settled Nov 2026 — read before changing any size)

Two faces. **Canela is the exception, Source Sans 3 is the default.**

| Role | Face / weight | mobile | desktop |
|---|---|---|---|
| Hero H1 | Canela 400 | 44 | 72 |
| Section H2 | Canela 400 | 36 | 48 |
| Card / functional heading | Source Sans 600 | 18 | 20 |
| Lead paragraph | Source Sans 400 | 17 | 20 |
| **Body** | Source Sans 400 | **16** | **17** (`text-base md:text-body`) |
| Buttons | Source Sans 600 | 16 | 16 |
| Navigation + language toggle | Source Sans 600 | 14 | 14 |
| Secondary text, CTA links | Source Sans 600 | 14 | 14 |
| Eyebrows | Source Sans 600 | 13 | 13 |
| **Fine print only** | Source Sans | **12** | **12** |

`body` (17px) and `lead` (20px) are named sizes in `tailwind.config.ts`; Tailwind's
scale jumps 16 → 18 and the system needs 17.

**Rules that cost real work to establish. Do not undo them:**

1. **12px is for fine print, nothing else.** Copyright, fare disclaimers, "Precio
   promocional", the two service badges, the five care captions. **Anything read in
   order to decide or to act has a 14px floor.** Selling copy and CTA links drifted
   down to 12px twice and had to be lifted out twice.
   Reference, measured: apple.com never goes below 12px at any width — and it does
   that with SF Pro, which is optically cut for small sizes. Source Sans 3 is not.
2. **Canela never below 24px**, and never in navigation, buttons, form fields, prices
   or compact UI. The two wordmarks (header, footer) are the sole exception: they are
   a brand asset, not a heading, and both carry a comment saying so.
3. **Prices are Source Sans 600 with tabular figures.** Never the display face. A
   price is read, compared and acted on; recognition beats expression.
4. **Tracking is decided per face and per job, not globally:**
   - Canela: **0** on headlines, 0.08em on the wordmark. No negative tracking — it was
     calibrated for Fraunces, which is a more compact face.
   - Source Sans interface (nav, toggle, badges, "tiempo de entrega"): **0.12em**
   - Source Sans editorial (the 27 `.eyebrow` section labels): **0.20em**, above the
     brief's range on purpose, because the locked design direction asks for
     wide-tracked eyebrows and nothing is near its container edge.
   The obvious future "cleanup" is to unify those two values. It would break one.
5. **Never animate opacity on above-the-fold content** — an element at opacity 0 does
   not count as painted for LCP. This cost 3 Lighthouse points before it was found.
6. **`.reveal-text__line` keeps its `padding-bottom: 0.3em` / `margin-bottom: -0.3em`.**
   Without it the mask clips every descender.

**Source brief:** the typography direction came from a document Lalo supplied. Where
it conflicted with the locked design direction in this file, the brand direction won,
and each of those calls is recorded in the relevant commit.

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

## Next session: front-end design — where it stands

Typography is **closed**. The open thread is the one Lalo named: the site reads flat
and static, and the goal is award-level, not template-level.

**The diagnosis, measured rather than guessed:**
```
9 homepage sections  ->  9 times the same shape (eyebrow + h2 + content)
27 headlines         ->  19 at exactly the same size
29 components        ->  animate on enter ("pop")
 3 components        ->  respond continuously to scroll
```
The flatness is **structural and in the animation model**, not a shortage of
carousels. Parallax, carousels and widgets were proposed and only one of them —
continuous scroll-linked motion — addresses the actual cause. Carousels would also
hide content, which this site cannot afford.

**The four moves identified, in order of leverage:**
1. Break the structural repetition — 2-3 sections with a genuinely different shape.
2. Typographic contrast — one or two genuinely large moments. 19 headlines at one
   size is a decision made once and repeated.
3. ~~Continuous scroll choreography on ONE sequence~~ — **DONE Nov 6 2026**: the
   services block on phones, finished and asserted (see the Nov 6 session note). The
   **desktop 3×2 grid has had none of this attention** and is still the original.
   Treat the mobile sequence as closed unless Lalo reopens it.
4. Art direction on the photography. All six images share one temperature and one
   composition, which flattens everything. **This is Lalo's to supply.**

**Settled with Lalo and not to be re-litigated:**
- Imagery is AI-generated, including video. Real photography is off the table.
  Atmosphere and texture only — never a fabricated storefront, staff or customer.
- The logo exists and Lalo can supply any format. The header and footer still render
  the wordmark as live text and should use the approved SVG.
- **The hero's job is to move people emotionally.** Information and SEO can live
  further down the page.
- The language switcher stays as text, not flags. Lalo verified aesop.com and
  loropiana.com both use text.

**Hero direction — SETTLED and SHIPPED Nov 11 2026.** Not the scroll-scrubbed garment
transformation that was sketched here; a plain looping clip from Kling, autoplaying over
the photograph. 10s, 24fps, 1920x1080 and 1080x1920, AV1 with H.264 behind it. See the
Nov 9-11 session note for the component's rules and the measurements behind the encode.

**Settings that produced it, for when Lalo regenerates:** Kling 4.0 (not Flash), 1080p,
ratio **16:9** and **9:16** — the earlier 2:3 came from feeding a 2:3 reference image and
cost 31% of the width to the crop instead of 18%. The reference frames come from ChatGPT,
which only outputs 1:1, 3:2 and 2:3, so they must be cropped to 1536x864 and 864x1536
first. Use the SAME image as First frame and Last frame: that is what closes the loop.

**One technique found late and worth starting from:** the 21st.dev parallax component
is NOT video. It is three stacked WebP images, 188 KB total, each translated on Y at a
different rate by scroll — back layer moves most, front moves least, transform only.
That is 1/20 the weight of a scrubbed video with none of the seek problems. It argues
for generating **three depth-separated layers** rather than a transformation clip, and
the effect needs no GSAP: the existing rAF in `HeroParallax` already does translateY
per layer.

## NEXT SESSION — start here (written Nov 11 2026)

The hero and the services block are both closed. What is left to launch is mostly
**assets and three things outside this repo**, not design work.

**A. Two placeholders that make production look broken, and need no asset from anyone:**
1. **Instagram.** `INSTAGRAM_WIDGET_ID` is `undefined`, so `InstagramFeed` renders **six
   empty cream squares** with a faint glyph. It reads as a failed load. Agreed approach:
   degrade with intent — keep the heading, drop the grid, link to @lavalava.vip. The
   component already lights up on its own the day a Behold widget id exists.
2. **Servicio a domicilio.** Two problems and only one is the missing photo:
   `DeliverySection` is a **single `max-w-sm` column inside a 1152px container**, so on
   desktop the right 60% is empty navy. It was clearly drawn as two columns with the
   photograph on the right. Lay the grid out so only the file is missing.

**B. Assets Lalo owes. He generates them — do NOT derive assets from what he has
supplied.** Stated explicitly Nov 10 2026.
| | size | format | unlocks |
|---|---|---|---|
| **Vector logo** | — | SVG, transparent, single colour | header + footer wordmarks, today live text |
| Mark alone | vector + 180x180 | SVG + PNG | `app/icon.svg`, `app/apple-icon.png`. **The wave only** — at 16px the lockup is a smudge |
| `delivery.jpg` | **1200x900** (4:3) | JPEG | drawn at 384px; 1200 covers DPR 3 |
| Instagram grid, if no Behold | **6 x 1080x1080** | JPEG | the curated fallback |
The vector logo unlocks three of these at once; it is the one to ask for first.

**C. Lalo's, outside this repo — these are the real launch blockers:**
1. Add `lavalava.vip` to the Places API key's referrer allowlist in Google Cloud Console.
   Without it, live reviews die **silently** the moment the domain switches.
2. `GOOGLE_PLACES_API_KEY` and `NEXT_PUBLIC_SITE_URL` into Vercel.
3. 301 the old Drupal site. It is still indexed with the old prices, so today Google's
   cheapest answer about LAVALAVA is Lalo's own old site — while the relaunch raises
   prices.

**D. Content needing his eye:** `/servicios` claims "aceptamos tarjeta y efectivo" (I
wrote it; no source). `/ubicacion` says nothing about parking or landmarks on a page whose
job is helping someone arrive. Turnaround times for cobertores, tenis and composturas.

**If design work does resume**, the open moves are #1 (break the structural repetition)
and #2 (typographic contrast) above. Before touching any full-screen layout, read the
⚠️ viewport rule in the Nov 6 note and run `scripts/svc-invariants.js` against the
current build first, so a regression shows immediately.

**Working agreement earned the hard way, Nov 6 2026:**
- When a request is **one change**, make **that change** and nothing else. Restructuring
  a component to satisfy a one-line ask is how this session lost a day: twice a fix
  shipped alongside an unrequested change that broke something Lalo had already approved.
- **Do not ship a build whose own measurements say it is unusable.** A 10px headline was
  measured, shipped anyway as "evidence", and rightly rejected. If the numbers say it
  will not work, say so in one line and propose the alternative instead of shipping it.
- **Verify against the served build, not the source.** `next start` does not rebuild CSS,
  and a fix was reported as landed while the phone was being served the old stylesheet.

**Still true and still blocking a launch, unchanged since September:** the Places API
key rejects lavalava.vip, neither env var is set in Vercel, `og-image.jpg` and the
favicon are missing, `delivery.jpg` is missing, and the old Drupal site still serves
lavalava.vip with the old prices.

**Vercel preview deployments fail on branches.** `main` deploys fine; a push to
`design/canela-display` failed in 21 seconds — too fast to have compiled, and a clean
clone of that branch builds without error. Unresolved; the logs need Lalo's Vercel
session (`npx vercel inspect <dpl> --logs`). Branch testing meanwhile is done over
the LAN: `npx next start -H 0.0.0.0` and open the Mac's IP from the phone.

## Working rules
- Verify mobile rendering + Core Web Vitals as you go (87% of traffic is mobile;
  performance drives SEO ranking).
- Build in stages, report after each, don't race ahead.
- Update this file at the end of each session so the next one starts warm.
