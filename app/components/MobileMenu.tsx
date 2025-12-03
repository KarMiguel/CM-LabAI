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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-950 backdrop-blur-md border-t border-gray-800 z-40 shadow-lg">
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
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'bg-transparent text-white hover:bg-gray-800'
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

