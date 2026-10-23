import { CountUp } from '@/components/motion/CountUp'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function TrustBar({ t }: Props) {
  const items = [
    // Deliberately NOT a CountUp. Animating a rating from zero puts "1.8 ★ en Google"
    // on screen for a beat — a precise, damaging, false claim about a business whose
    // real rating is 5.0. A client tally climbing reads as a tally; a star rating
    // climbing reads as the rating. Only the tally animates.
    <span key="rating" className="tabular-nums">
      {t.trust.ratingValue.toFixed(1)}
      {t.trust.ratingSuffix}
    </span>,
    <CountUp key="clients" value={t.trust.clientsValue} group suffix={t.trust.clientsSuffix} />,
    <span key="zone">{t.trust.zone}</span>,
  ]

  return (
    <div className="bg-navy py-6 section-px">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="font-sans text-sm font-medium text-bone/80 px-6 md:px-10 text-center">
              {item}
            </span>
            {i < items.length - 1 && (
              <div className="w-px h-[22px] bg-bone/20 flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
