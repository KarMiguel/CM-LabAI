// Define os locales suportados
export const locales = ['pt', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'pt';

// Valida se um locale é válido
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Obtém o locale da URL ou retorna o padrão
export function getLocaleFromParams(locale?: string): Locale {
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  return defaultLocale;
}

