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
    <aside className="fixed left-0 top-[88px] bottom-0 w-64 bg-gray-950 backdrop-blur-md border-r border-gray-800 z-30 overflow-y-auto hidden lg:block shadow-sm">
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
                      ? 'bg-gray-800 text-white shadow-md'
                      : 'bg-transparent text-white hover:bg-gray-800'
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

