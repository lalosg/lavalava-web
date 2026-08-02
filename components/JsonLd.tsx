import { BUSINESS, SITE_URL } from '@/lib/seo'
import { getT } from '@/lib/translations'
import type { Locale } from '@/lib/i18n'

const DAY_CODES = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const DAY_NAMES = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

/** Expand a schema.org day token ('Mo-Fr', 'Sa', 'Mo,We') into full day names */
function expandDays(token: string): string[] {
  return token.split(',').flatMap((part) => {
    const [from, to] = part.split('-')
    const start = DAY_CODES.indexOf(from)
    if (start === -1) return []
    if (!to) return [DAY_NAMES[start]]
    const end = DAY_CODES.indexOf(to)
    if (end === -1) return []
    return DAY_NAMES.slice(start, end + 1)
  })
}

/**
 * Derive openingHoursSpecification from BUSINESS.openingHours so the schema can
 * never drift from the single source of truth in lib/seo.ts.
 */
function openingHoursSpecification() {
  return BUSINESS.openingHours.map((entry) => {
    const [days, hours] = entry.split(' ')
    const [opens, closes] = hours.split('-')
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: expandDays(days),
      opens,
      closes,
    }
  })
}

/** LocalBusiness schema — DryCleaningOrLaundry subtype */
function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'DryCleaningOrLaundry'],
    name: BUSINESS.name,
    description: getT(locale).meta.schemaDescription,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: BUSINESS.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    // No aggregateRating: self-reported rating markup is a Google penalty risk.
    // Real ratings surface through the Places API reviews + the review cards.
    sameAs: BUSINESS.sameAs,
    servesCuisine: undefined, // not applicable
    hasMap: `https://maps.google.com/?q=${BUSINESS.latitude},${BUSINESS.longitude}`,
  }
}

/** FAQPage schema, built from the translations for the rendered locale */
function faqSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: getT(locale).faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

interface Props {
  locale: Locale
}

export function JsonLd({ locale }: Props) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(locale)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(locale)) }}
      />
    </>
  )
}
