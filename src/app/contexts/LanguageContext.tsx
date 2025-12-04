'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { getLanguage, setLanguage, t, Language } from '@/lib/i18n'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = getLanguage()
    setLanguageState(savedLanguage)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleLanguageChange = () => {
      setLanguageState(getLanguage())
    }

    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [mounted])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    setLanguageState(lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: changeLanguage,
        t: (key: string) => t(key, language),
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

