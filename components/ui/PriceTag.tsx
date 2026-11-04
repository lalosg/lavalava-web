import { activePromo, formatPrice, type PriceItem } from '@/lib/contract'

interface Props {
  item: PriceItem
  /** Localized "antes" / "was" label, read by screen readers on the struck price. */
  wasLabel: string
  size?: 'sm' | 'lg'
}

/**
 * A price, with its promotional price when one is live.
 *
 * Per the contract: list price struck through in grey, promotional price beside it in
 * green, and no promotion name — `promotions.name` is internal, Spanish-only, and
 * publishing it would leak internal naming and break the bilingual guarantee. The two
 * numbers are the whole message.
 *
 * Expiry is enforced here via activePromo() because the JSON file has no clock; an
 * expired promo renders as the list price alone, which is always correct.
 *
 * Both figures are Source Sans 3 Semibold with tabular figures, never the display
 * face. A price is read, compared and acted on — recognition beats expression, and
 * tabular figures keep the digits aligned down a column of services.
 */
export function PriceTag({ item, wasLabel, size = 'sm' }: Props) {
  const promo = activePromo(item)
  const big = size === 'lg'

  if (!promo) {
    return (
      <span
        className={`font-sans font-semibold text-ink ${big ? 'text-2xl' : 'text-lg'} tabular-nums`}
      >
        {formatPrice(item.price.amount)}
      </span>
    )
  }

  return (
    <span className="inline-flex items-baseline gap-2">
      {/* The struck price carries a label so it is not read aloud as the price in effect */}
      <s className={`font-sans text-ink/65 tabular-nums ${big ? 'text-base' : 'text-sm'}`}>
        <span className="sr-only">{wasLabel} </span>
        {formatPrice(item.price.amount)}
      </s>
      <span
        className={`font-sans font-semibold text-[#2F6B4F] ${big ? 'text-2xl' : 'text-lg'} tabular-nums`}
      >
        {formatPrice(promo.amount)}
      </span>
    </span>
  )
}
