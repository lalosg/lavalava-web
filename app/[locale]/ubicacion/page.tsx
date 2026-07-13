import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'

interface Props {
  params: { locale: Locale }
}

export default function UbicacionPage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <section className="min-h-screen bg-bone pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">{t.location.eyebrow}</p>
        <h1 className="font-fraunces text-5xl text-ink leading-tight mb-8 whitespace-pre-line">
          {t.location.headline}
        </h1>
        <div className="font-sans text-ink/60 text-base flex flex-col gap-2">
          <p>{t.location.address}</p>
          <p>{t.location.city}</p>
          <ul className="mt-6 flex flex-col gap-2">
            {t.location.hours.map((h) => (
              <li key={h.days} className="flex justify-between max-w-xs">
                <span className="text-ink/45">{h.days}</span>
                <span className="text-ink font-medium">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
