import { locales, defaultLocale, type Locale } from './request';

export { locales, defaultLocale };
export type { Locale };

// Configuração de rotas
export const routing = {
  locales,
  defaultLocale,
  localePrefix: 'as-needed' as const
};

// Helper para gerar path com locale
export function getLocalizedPath(locale: Locale, path: string = ''): string {
  const basePath = locale === defaultLocale ? '' : `/${locale}`;
  return `${basePath}${path}`;
}

