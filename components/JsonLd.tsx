import { BUSINESS, SITE_URL } from '@/lib/seo'
import { COVERAGE_AREAS } from '@/lib/coverage'
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
 * FAQPage schema from an explicit Q&A list.
 *
 * Google requires FAQPage markup to match FAQ content visible on the SAME page, so the
 * caller must pass the very array it renders — never a second, parallel copy. That is
 * what keeps schema and content from drifting.
 *
 * Emitting FAQPage on more than one page is fine as long as the questions differ. The
 * original homepage-only rule existed because the spokes had no visible FAQ of their
 * own; duplicating the *same* FAQ across pages is the thing to avoid, not having one.
 */
export function faqSchemaFromItems(items: readonly { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

/** Homepage FAQPage — the FAQ rendered by FAQSection. */
export function faqSchema(locale: Locale) {
  return faqSchemaFromItems(getT(locale).faq.items)
}

/**
 * Service schema for pickup & delivery, with all 24 Distrito Tec colonias as areaServed.
 *
 * This is the machine-readable half of the coverage list the page renders as text: the
 * same COVERAGE_AREAS array feeds both, in the same render pass, so they cannot diverge.
 * Naming each colonia is the point — "areaServed: Monterrey" is a claim every competitor
 * also makes, while 24 named neighbourhoods is the specificity that gets a business cited.
 */
export function deliveryServiceSchema(locale: Locale) {
  const t = getT(locale)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: locale === 'es' ? 'Lavandería a domicilio' : 'Laundry pickup and delivery',
    name: t.pages.aDomicilio.content.hero.headline.replace('\n', ' '),
    description: t.pages.aDomicilio.meta.description,
    provider: {
      '@type': ['LocalBusiness', 'DryCleaningOrLaundry'],
      name: BUSINESS.name,
      telephone: BUSINESS.telephone,
      url: SITE_URL,
    },
    areaServed: COVERAGE_AREAS.map((area) => ({
      '@type': 'Place',
      name: area.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Distrito Tec, Monterrey',
      },
    })),
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${SITE_URL}/${locale}/a-domicilio`,
      servicePhone: BUSINESS.telephone,
    },
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
