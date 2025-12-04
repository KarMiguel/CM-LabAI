'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import FlagIcon from './FlagIcon'
import Logo from './Logo'

export default function Navigation() {
  const { t, language, setLanguage } = useLanguage()
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)

  const languages = [
    { code: 'pt' as const, name: 'Português', flag: 'br' as const },
    { code: 'en' as const, name: 'English', flag: 'us' as const },
    { code: 'es' as const, name: 'Español', flag: 'es' as const },
  ]

  const currentLanguage = languages.find(l => l.code === language) || languages[0]

  return (
    <nav className="bg-gray-950 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3 max-w-full">
        <div className="flex items-center justify-between">
          {/* Logo e Título */}
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-xl font-bold text-white">
              {t('home.title')}
            </h1>
          </div>

          {/* Seletor de Idioma */}
          <div className="relative">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setShowLanguageMenu(!showLanguageMenu)
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-all shadow-sm"
            >
              <FlagIcon country={currentLanguage.flag} size={24} />
              <span className="hidden md:inline text-sm font-medium">
                {currentLanguage.name}
              </span>
            </button>
            
            {showLanguageMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLanguageMenu(false)}
                />
                <div className="absolute right-0 mt-2 bg-gray-950 border border-gray-800 rounded-lg shadow-xl z-50 min-w-[160px] overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className={`
                        w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-800 transition-colors text-left
                        ${language === lang.code 
                          ? 'bg-gray-800 text-white' 
                          : 'text-white'
                        }
                        first:rounded-t-lg last:rounded-b-lg
                      `}
                    >
                      <FlagIcon country={lang.flag} size={20} />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
