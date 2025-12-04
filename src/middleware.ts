import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pt', 'en', 'es']
const defaultLocale = 'pt'

// Obtém o locale preferido
function getLocale(request: NextRequest): string {
  // Verifica se há um locale na URL
  const pathname = request.nextUrl.pathname
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameLocale) return pathnameLocale

  // Verifica o Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().substring(0, 2))
      .find((lang) => locales.includes(lang))
    
    if (preferredLocale) return preferredLocale
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Verifica se o pathname já tem um locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redireciona se não houver locale
  const locale = getLocale(request)
  
  // Para a rota raiz, redireciona para o locale padrão
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(`/${locale}`, request.url)
    )
  }

  // Para outras rotas sem locale, adiciona o locale
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: [
    // Pula todos os caminhos internos (_next, api, assets)
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|logo2.png|icon.svg|flags).*)',
  ],
}

