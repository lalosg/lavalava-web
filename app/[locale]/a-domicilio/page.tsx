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
    path: '/a-domicilio',
    title: t.pages.aDomicilio.meta.title,
    description: t.pages.aDomicilio.meta.description,
  })
}

export default function AdomicilioPage({ params }: Props) {
  const t = getT(params.locale)

  return (
    <>
      <JsonLd
        schemas={[
          localBusinessSchema(params.locale),
          breadcrumbSchema(params.locale, [{ name: t.nav.delivery, path: '/a-domicilio' }]),
        ]}
      />
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
    </>
  )
}
