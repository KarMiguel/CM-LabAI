import translationsData from './translations.json'

type Language = 'pt' | 'en' | 'es'

interface Translations {
  [lang: string]: any
}

const translations = translationsData as Translations

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'pt'
  
  const stored = localStorage.getItem('language') as Language
  const validLanguages: Language[] = ['pt', 'en', 'es']
  
  if (stored && validLanguages.includes(stored)) {
    return stored
  }
  
  return 'pt'
}

export function setLanguage(lang: Language) {
  if (typeof window === 'undefined') return
  
  const validLanguages: Language[] = ['pt', 'en', 'es']
  if (validLanguages.includes(lang)) {
    localStorage.setItem('language', lang)
    window.dispatchEvent(new Event('languagechange'))
  }
}

export function t(key: string, lang?: Language): string {
  const language = lang || getLanguage()
  const keys = key.split('.')
  
  let value: any = translations[language]
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      if (language !== 'pt') {
        value = translations['pt']
        for (const k2 of keys) {
          if (value && typeof value === 'object' && k2 in value) {
            value = value[k2]
          } else {
            return key
          }
        }
      } else {
        return key
      }
    }
  }
  
  return typeof value === 'string' ? value : key
}

export function useTranslation(lang?: Language) {
  const language = lang || getLanguage()
  
  return {
    t: (key: string) => t(key, language),
    language,
    setLanguage: (newLang: Language) => setLanguage(newLang),
  }
}

export type { Language }

