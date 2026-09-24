/**
 * The published CMS contract, mirrored from the POS.
 *
 * Authoritative source: `src/features/website/types.ts` in the POS repo, with
 * `lib/buildCatalog.ts` / `lib/buildPrices.ts` as the producers. If these types and that
 * code ever disagree, the code wins and this file is stale.
 *
 * Nothing fetches these files yet — the site renders the committed fallbacks in
 * lib/fallback-*.json, which were generated FROM the live payloads so the shapes are
 * real rather than imagined. When the fetch layer lands it drops in behind these types
 * without touching a single component.
 */
export const CONTRACT_VERSION = 1

export const PAGE_SLUGS = ['home', 'servicios', 'a-domicilio', 'ubicacion'] as const
export type PageSlug = (typeof PAGE_SLUGS)[number]

export type Localized = { es: string; en: string }

// ── catalog.json ──────────────────────────────────────────────────────────────
export interface CatalogService {
  slug: string
  order: number
  name: Localized
  description: Localized
}

export interface CatalogFaqEntry {
  order: number
  q: Localized
  a: Localized
}

export interface CatalogPage {
  h1: Localized
  intro: Localized
  faq: CatalogFaqEntry[]
}

export interface CatalogFile {
  version: number
  generatedAt: string
  business: {
    hours: { days: Localized; time: string }[]
    /** Not bilingual — colonia names are proper nouns, identical in both locales. */
    coverage: { name: string; order: number }[]
  }
  services: CatalogService[]
  pages: Record<PageSlug, CatalogPage>
}

// ── prices.json ───────────────────────────────────────────────────────────────
export interface PromoPrice {
  /** What the customer actually pays. Render this one. */
  amount: number
  /** price.amount − amount */
  discount: number
  /** Derived from the amounts to 1dp — never from a promotion's name. The live
   *  "-10% Lavado" is actually 10.5%, so do not recompute or infer it. */
  percentOff: number
  /** ISO 8601, or null for open-ended. The file cannot expire itself: nothing happens
   *  in a database at midnight. Enforce this at render, where there is a real clock. */
  validUntil: string | null
}

export interface PriceItem {
  id: string
  order: number
  name: Localized
  /** ALWAYS the list price. Ignore `promo` and the page is still correct. */
  price: { amount: number; currency: string }
  /** Present ONLY when a promotion changes what one unit costs, for everyone, at any
   *  time, with no coupon. Absent — never null — so `if (item.promo)` is the whole check. */
  promo?: PromoPrice
}

export interface PriceService {
  items: PriceItem[]
}

export interface PricesFile {
  version: number
  generatedAt: string
  /** Keyed by service slug. Only ever contains slugs present in the last published catalog. */
  services: Record<string, PriceService>
}

/**
 * The promotional price, but only if it is still valid right now.
 *
 * `validUntil` is the consumer's job to enforce — see PromoPrice. Returns undefined for
 * an expired promo so the caller renders the list price alone, which is always correct.
 */
export function activePromo(item: PriceItem, now: Date = new Date()): PromoPrice | undefined {
  const promo = item.promo
  if (!promo) return undefined
  if (promo.validUntil && new Date(promo.validUntil).getTime() < now.getTime()) return undefined
  return promo
}

/** Formats an MXN amount the way the price tags read: $38, $37.50 — no trailing .00. */
export function formatPrice(amount: number): string {
  return `$${Number.isInteger(amount) ? amount : amount.toFixed(2)}`
}
