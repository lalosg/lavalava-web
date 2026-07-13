import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'

interface Props {
  params: { locale: Locale }
}

export default function AdomicilioPage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <section className="min-h-screen bg-bone pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="eyebrow mb-4">{t.delivery.eyebrow}</p>
        <h1 className="font-fraunces text-5xl text-ink leading-tight mb-8 whitespace-pre-line">
          {t.delivery.headline}
        </h1>
        <p className="font-sans text-ink/55 text-lg leading-relaxed max-w-lg">
          {t.delivery.description}
        </p>
      </div>
    </section>
  )
}
