import { CountUp } from '@/components/motion/CountUp'
import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function TrustBar({ t }: Props) {
  const items = [
    <CountUp key="rating" value={t.trust.ratingValue} decimals={1} suffix={t.trust.ratingSuffix} />,
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
