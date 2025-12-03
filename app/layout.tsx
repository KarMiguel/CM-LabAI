import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './styles/globals.css'
import { LanguageProvider } from './contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CM LabAi - Plataforma Inteligente de IA',
  description: 'Transformação de texto, análise de documentos, chat especializado e automação inteligente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
