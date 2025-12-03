'use client'

import { useState } from 'react'
import Logo from './components/Logo'
import Navigation from './components/Navigation'
import TextTransformer from './components/TextTransformer'
import DocumentAnalyzer from './components/DocumentAnalyzer'
import TechnicalChat from './components/TechnicalChat'
import IntelligentAutomation from './components/IntelligentAutomation'
import AudioTranslator from './components/AudioTranslator'
import { useLanguage } from './contexts/LanguageContext'
import { Sparkles, FileText, MessageSquare, Zap, Headphones } from 'lucide-react'

export type TabType = 'text' | 'documents' | 'chat' | 'automation' | 'audio'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('text')
  const { t } = useLanguage()

  const tabs = [
    { id: 'text' as TabType, labelKey: 'textTransform', icon: Sparkles },
    { id: 'documents' as TabType, labelKey: 'documentAnalysis', icon: FileText },
    { id: 'chat' as TabType, labelKey: 'technicalChat', icon: MessageSquare },
    { id: 'automation' as TabType, labelKey: 'intelligentAutomation', icon: Zap },
    { id: 'audio' as TabType, labelKey: 'audioTranslate', icon: Headphones },
  ]

  return (
    <div className="min-h-screen bg-primary-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <p className="text-xl text-primary-200 mt-4">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="mt-8">
          {activeTab === 'text' && <TextTransformer />}
          {activeTab === 'documents' && <DocumentAnalyzer />}
          {activeTab === 'chat' && <TechnicalChat />}
          {activeTab === 'automation' && <IntelligentAutomation />}
          {activeTab === 'audio' && <AudioTranslator />}
        </div>
      </main>
    </div>
  )
}
