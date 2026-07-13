import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'

interface Props {
  params: { locale: Locale }
}

export default function ServiciosPage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <section className="min-h-screen bg-bone pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">{t.services.eyebrow}</p>
        <h1 className="font-fraunces text-5xl text-ink leading-tight mb-8 whitespace-pre-line">
          {t.services.headline}
        </h1>
        <p className="font-sans text-ink/50 text-base">— {t.services.cta}</p>
      </div>
    </section>
  )
}
