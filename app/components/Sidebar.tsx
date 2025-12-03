'use client'

import { TabType } from '../page'
import { useLanguage } from '../contexts/LanguageContext'

interface SidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  tabs: Array<{ id: TabType; labelKey: string; icon: any }>
}

export default function Sidebar({ activeTab, setActiveTab, tabs }: SidebarProps) {
  const { t } = useLanguage()

  return (
    <aside className="fixed left-0 top-[73px] bottom-0 w-64 bg-primary-800/90 backdrop-blur-md border-r border-primary-700 z-40 overflow-y-auto hidden lg:block">
      <div className="p-4">
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left
                  ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-primary-700/50 text-primary-100 hover:bg-primary-600 hover:text-white border border-primary-600'
                  }
                `}
              >
                <Icon size={20} />
                <span>{t(`nav.${tab.labelKey}`)}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

