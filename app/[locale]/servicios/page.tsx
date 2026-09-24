import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getT, localePath } from '@/lib/translations'
import { pageMetadata } from '@/lib/seo'
import {
  JsonLd,
  localBusinessSchema,
  breadcrumbSchema,
  faqSchemaFromItems,
  serviceCatalogSchema,
} from '@/components/JsonLd'
import { ServicesHero } from '@/components/services/ServicesHero'
import { ServiceCatalogue } from '@/components/services/ServiceCatalogue'
import { CareSteps } from '@/components/services/CareSteps'
import { UnusualSection } from '@/components/services/UnusualSection'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { SpokeCrossLinks } from '@/components/ui/SpokeCrossLinks'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

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
  const c = t.pages.servicios.content

  return (
    <>
      <JsonLd
        schemas={[
          localBusinessSchema(params.locale),
          serviceCatalogSchema(params.locale),
          breadcrumbSchema(params.locale, [{ name: t.nav.services, path: '/servicios' }]),
          faqSchemaFromItems(c.faq.items),
        ]}
      />
      <ServicesHero t={t} />
      <ServiceCatalogue t={t} locale={params.locale} />
      <CareSteps t={t} />
      <UnusualSection t={t} />
      <FaqAccordion eyebrow={c.faq.eyebrow} headline={c.faq.headline} items={c.faq.items} />
      <SpokeCrossLinks
        eyebrow={c.crossLinks.eyebrow}
        cards={[
          { ...c.crossLinks.delivery, href: localePath(params.locale, '/a-domicilio') },
          { ...c.crossLinks.location, href: localePath(params.locale, '/ubicacion') },
        ]}
      />
      <FinalCTASection t={t} />
    </>
  )
}
