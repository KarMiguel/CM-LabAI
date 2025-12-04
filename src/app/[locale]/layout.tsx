import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { locales } from '../i18n/request'
import '../globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CM LabAi - Plataforma Inteligente de IA',
  description: 'Transformação de texto, análise de documentos, chat especializado e automação inteligente',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

