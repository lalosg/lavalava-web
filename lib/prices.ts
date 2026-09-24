import fallbackPrices from './fallback-prices.json'
import fallbackCatalog from './fallback-catalog.json'
import {
  CONTRACT_VERSION,
  type CatalogFile,
  type PriceItem,
  type PricesFile,
} from './contract'

/**
 * Product and price access.
 *
 * Today this reads the committed snapshots in lib/fallback-*.json, captured from the live
 * CDN payloads on 2026-09-24. They are the real thing, not invented figures — prices and
 * products are the one area where the website has no creative licence, because a price the
 * POS refuses to honour becomes an argument at the counter.
 *
 * When the fetch layer lands it replaces the two imports below and nothing else: every
 * consumer already goes through these accessors. Per the contract's consumption rules the
 * fetch must THROW rather than return empty (an empty result makes ISR regeneration
 * "succeed" with nothing and replaces a good page with a blank one), must gate on
 * `version`, and must alert loudly whenever it falls back to these files.
 */
const prices = fallbackPrices as PricesFile
const catalog = fallbackCatalog as unknown as CatalogFile

if (prices.version !== CONTRACT_VERSION || catalog.version !== CONTRACT_VERSION) {
  throw new Error(
    `CMS contract mismatch: expected v${CONTRACT_VERSION}, got catalog v${catalog.version} / prices v${prices.version}. ` +
      'The contract moved — reconcile lib/contract.ts against the POS before shipping.',
  )
}

/** Service slugs as published by the POS. Spanish in both locales, by contract. */
export const SERVICE_SLUGS = {
  laundry: 'lavanderia-por-kilo',
  dryCleaning: 'tintoreria',
  ironing: 'planchado',
  bedding: 'colchas-cobertores',
  sneakers: 'tennis',
  repairs: 'composturas',
  delivery: 'recoleccion-entrega',
} as const

/** Published items for a service slug, in publish order. Empty when the slug is unknown. */
export function itemsFor(slug: string): PriceItem[] {
  const service = prices.services[slug]
  if (!service) return []
  return [...service.items].sort((a, b) => a.order - b.order)
}

/** A single item by slug + published order position. */
export function itemAt(slug: string, order: number): PriceItem | undefined {
  return itemsFor(slug).find((item) => item.order === order)
}

/** The lowest list price across a service — the honest basis for a "desde $X" line. */
export function lowestPrice(slug: string): number | undefined {
  const amounts = itemsFor(slug).map((item) => item.price.amount)
  return amounts.length ? Math.min(...amounts) : undefined
}

export const catalogData = catalog
export const pricesData = prices
