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

/** LocalBusiness schema — DryCleaningOrLaundry subtype. Emitted on every page. */
export function localBusinessSchema(locale: Locale) {
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
    hasMap: `https://maps.google.com/?q=${BUSINESS.latitude},${BUSINESS.longitude}`,
  }
}

/**
 * FAQPage schema, built from the translations for the rendered locale.
 *
 * Homepage only. Google requires FAQPage markup to match FAQ content visible on the
 * same page, so this must not be emitted on pages that do not render the FAQ.
 */
export function faqSchema(locale: Locale) {
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

/**
 * BreadcrumbList for a sub-page. `trail` holds locale-less paths; the locale home
 * is prepended automatically.
 */
export function breadcrumbSchema(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  const items = [{ name: getT(locale).nav.home, path: '' }, ...trail]

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  }
}

interface Props {
  /** One <script type="application/ld+json"> is emitted per entry. */
  schemas: object[]
}

export function JsonLd({ schemas }: Props) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
