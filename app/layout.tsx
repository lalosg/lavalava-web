import type { Metadata } from 'next'
import { Fraunces, Source_Sans_3 } from 'next/font/google'
import './globals.css'

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

// Fallback metadata — locale layout overrides per-page
export const metadata: Metadata = {
  title: 'LAVALAVA — Lavandería y Tintorería Premium en Distrito Tec, Monterrey',
  description: 'Lavandería y tintorería premium en Distrito Tec, Monterrey. Servicio a domicilio disponible.',
  metadataBase: new URL('https://lavalava.vip'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang="es" is the primary language; EN pages use hreflang alternates for correct indexing
    <html lang="es" className={`${fraunces.variable} ${sourceSans3.variable}`}>
      <body className="bg-bone text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
