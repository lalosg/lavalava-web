import type { Translations } from '@/lib/translations'

interface Props {
  t: Translations
}

export function TrustBar({ t }: Props) {
  const items = [t.trust.rating, t.trust.clients, t.trust.zone]

  return (
    <div className="bg-navy py-6 section-px">
      <div className="max-w-6xl mx-auto flex items-center justify-center gap-0">
        {items.map((item, i) => (
          <div key={item} className="flex items-center">
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
