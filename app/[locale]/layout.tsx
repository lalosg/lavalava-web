import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3 } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { getT } from '@/lib/translations'
import { SITE_URL, OG_IMAGE } from '@/lib/seo'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '../globals.css'

// This is the root layout. It lives under [locale] rather than at app/ so that
// <html lang> can reflect the actual locale — reading it from headers() in a
// layout at app/ would opt the entire tree out of static generation.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['400', '600'],
  display: 'swap',
})

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
    // Fallback title/description only. Canonical and hreflang are deliberately NOT
    // set here: metadata merges from the closest segment, so a layout-level canonical
    // is inherited by every page that does not set its own — which is exactly how all
    // six sub-pages came to declare the homepage as their canonical. Each page builds
    // its own via pageMetadata() in lib/seo.ts.
    title: t.meta.title,
    description: t.meta.description,
    metadataBase: new URL(SITE_URL),

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
  const locale = params.locale as Locale

  return (
    <html lang={locale} className={`${fraunces.variable} ${sourceSans3.variable}`}>
      <body className="bg-bone text-ink font-sans antialiased">
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
