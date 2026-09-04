import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'
import { pageMetadata } from '@/lib/seo'
import { JsonLd, localBusinessSchema, breadcrumbSchema } from '@/components/JsonLd'

interface Props {
  params: { locale: Locale }
}

export function generateMetadata({ params }: Props): Metadata {
  const t = getT(params.locale)
  return pageMetadata({
    locale: params.locale,
    path: '/servicios',
    title: t.pages.servicios.meta.title,
    description: t.pages.servicios.meta.description,
  })
}

export default function ServiciosPage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <>
      <JsonLd
        schemas={[
          localBusinessSchema(params.locale),
          breadcrumbSchema(params.locale, [{ name: t.nav.services, path: '/servicios' }]),
        ]}
      />
      <section className="min-h-screen bg-bone pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          <h1 className="font-fraunces text-5xl text-ink leading-tight mb-8 whitespace-pre-line">
            {t.services.headline}
          </h1>
          <p className="font-sans text-ink/50 text-base">— {t.services.cta}</p>
        </div>
      </section>
    </>
  )
}
