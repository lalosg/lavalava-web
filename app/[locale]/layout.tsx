import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'
import { SITE_URL, OG_IMAGE } from '@/lib/seo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const t = getT(locale)
  const isEs = locale === 'es'

  return {
    title: t.meta.title,
    description: t.meta.description,

    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        es: `${SITE_URL}/es`,
        en: `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/es`,
      },
    },

    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'LAVALAVA',
      locale: isEs ? 'es_MX' : 'en_US',
      alternateLocale: isEs ? 'en_US' : 'es_MX',
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: isEs
            ? 'LAVALAVA — Lavandería y Tintorería Premium en Distrito Tec, Monterrey'
            : 'LAVALAVA — Premium Laundry & Dry Cleaning in Distrito Tec, Monterrey',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: [OG_IMAGE],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export default function LocaleLayout({ children, params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound()

  return (
    <>
      <Header locale={params.locale as Locale} />
      <main>{children}</main>
      <Footer locale={params.locale as Locale} />
    </>
  )
}
