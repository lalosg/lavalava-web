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
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LAVALAVA — Lavandería y Tintorería Premium en Distrito Tec, Monterrey',
  description: 'Lavandería y tintorería premium en Distrito Tec, Monterrey. Cuidamos tu ropa con dedicación. Servicio a domicilio disponible.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${sourceSans3.variable}`}>
      <body className="bg-bone text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
