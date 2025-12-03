'use client'

import { TabType } from '../page'
import { useLanguage } from '../contexts/LanguageContext'

interface MobileMenuProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  tabs: Array<{ id: TabType; labelKey: string; icon: any }>
}

export default function MobileMenu({ activeTab, setActiveTab, tabs }: MobileMenuProps) {
  const { t } = useLanguage()

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-primary-800/90 backdrop-blur-md border-t border-primary-700 z-40">
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-2 py-2 min-w-max">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex flex-col items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 min-w-[80px]
                  ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-primary-700/50 text-primary-100 hover:bg-primary-600 hover:text-white border border-primary-600'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-xs text-center">{t(`nav.${tab.labelKey}`)}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

