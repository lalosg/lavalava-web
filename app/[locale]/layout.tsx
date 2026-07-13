import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/lib/i18n'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children, params }: Props) {
  if (!locales.includes(params.locale as Locale)) notFound()

  return (
    <>
      <Header locale={params.locale} />
      <main>{children}</main>
      <Footer locale={params.locale} />
    </>
  )
}
