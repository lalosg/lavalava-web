import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'
import { pageMetadata } from '@/lib/seo'
import {
  JsonLd,
  localBusinessSchema,
  breadcrumbSchema,
  faqSchemaFromItems,
  deliveryServiceSchema,
} from '@/components/JsonLd'
import { DeliveryHero } from '@/components/delivery/DeliveryHero'
import { DeliverySteps } from '@/components/delivery/DeliverySteps'
import { CoverageGrid } from '@/components/delivery/CoverageGrid'
import { DeliveryPricing } from '@/components/delivery/DeliveryPricing'
import { DeliveryIncluded } from '@/components/delivery/DeliveryIncluded'
import { DeliveryFaq } from '@/components/delivery/DeliveryFaq'
import { DeliveryCrossLinks } from '@/components/delivery/DeliveryCrossLinks'
import { FinalCTASection } from '@/components/sections/FinalCTASection'

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
      {/* FAQPage is legitimate here now that the page renders a visible FAQ of its own,
          and the questions are delivery-specific rather than a copy of the homepage's.
          It is built from the same t.pages.aDomicilio.content.faq.items the section
          renders, so the markup cannot describe questions the visitor cannot see. */}
      <JsonLd
        schemas={[
          localBusinessSchema(params.locale),
          deliveryServiceSchema(params.locale),
          breadcrumbSchema(params.locale, [
            { name: t.nav.delivery, path: '/a-domicilio' },
          ]),
          faqSchemaFromItems(t.pages.aDomicilio.content.faq.items),
        ]}
      />
      <DeliveryHero t={t} />
      <DeliverySteps t={t} />
      <CoverageGrid t={t} />
      <DeliveryPricing t={t} locale={params.locale} />
      <DeliveryIncluded t={t} />
      <DeliveryFaq t={t} />
      <DeliveryCrossLinks t={t} locale={params.locale} />
      <FinalCTASection t={t} />
    </>
  )
}
