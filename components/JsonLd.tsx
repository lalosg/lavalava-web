import { BUSINESS, SITE_URL } from '@/lib/seo'
import { es } from '@/lib/translations/es'

/** LocalBusiness schema — DryCleaningOrLaundry subtype */
function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'DryCleaningOrLaundry'],
    name: BUSINESS.name,
    description:
      'Lavandería y tintorería premium en Distrito Tec, Monterrey. Servicio a domicilio disponible. Lavado por kilo, tintorería, delicados y cobertores.',
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
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '15:00',
      },
    ],
    areaServed: BUSINESS.areaServed.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.aggregateRating.ratingValue,
      reviewCount: BUSINESS.aggregateRating.reviewCount,
      bestRating: '5',
    },
    sameAs: BUSINESS.sameAs,
    servesCuisine: undefined, // not applicable
    hasMap: `https://maps.google.com/?q=${BUSINESS.latitude},${BUSINESS.longitude}`,
  }
}

/** FAQPage schema from ES translations */
function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: es.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema()) }}
      />
    </>
  )
}
