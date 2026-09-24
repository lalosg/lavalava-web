import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { getT, localePath } from '@/lib/translations'
import { pageMetadata } from '@/lib/seo'
import {
  JsonLd,
  localBusinessSchema,
  breadcrumbSchema,
  faqSchemaFromItems,
} from '@/components/JsonLd'
import { LocationHero } from '@/components/location/LocationHero'
import { AddressBlock } from '@/components/location/AddressBlock'
import { HoursBlock } from '@/components/location/HoursBlock'
import { VisitNotes } from '@/components/location/VisitNotes'
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
    path: '/ubicacion',
    title: t.pages.ubicacion.meta.title,
    description: t.pages.ubicacion.meta.description,
  })
}

export default function UbicacionPage({ params }: Props) {
  const t = getT(params.locale)
  const c = t.pages.ubicacion.content

  return (
    <>
      {/* localBusinessSchema already carries address, geo and openingHoursSpecification,
          all of which this page now renders as visible text — which is the condition
          Google puts on that markup. No separate Place schema: it would describe the
          same entity twice and risk them disagreeing. */}
      <JsonLd
        schemas={[
          localBusinessSchema(params.locale),
          breadcrumbSchema(params.locale, [{ name: t.nav.location, path: '/ubicacion' }]),
          faqSchemaFromItems(c.faq.items),
        ]}
      />
      <LocationHero t={t} />
      <AddressBlock t={t} />
      <HoursBlock t={t} />
      <VisitNotes t={t} />
      <FaqAccordion eyebrow={c.faq.eyebrow} headline={c.faq.headline} items={c.faq.items} />
      <SpokeCrossLinks
        eyebrow={c.crossLinks.eyebrow}
        cards={[
          { ...c.crossLinks.services, href: localePath(params.locale, '/servicios') },
          { ...c.crossLinks.delivery, href: localePath(params.locale, '/a-domicilio') },
        ]}
      />
      <FinalCTASection t={t} />
    </>
  )
}
