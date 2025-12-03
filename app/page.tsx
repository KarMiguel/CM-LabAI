'use client'

import { useState } from 'react'
import Navigation from './components/Navigation'
import Sidebar from './components/Sidebar'
import MobileMenu from './components/MobileMenu'
import TextTransformer from './components/TextTransformer'
import DocumentAnalyzer from './components/DocumentAnalyzer'
import TechnicalChat from './components/TechnicalChat'
import IntelligentAutomation from './components/IntelligentAutomation'
import AudioTranslator from './components/AudioTranslator'
import { Sparkles, FileText, MessageSquare, Zap, Headphones } from 'lucide-react'

export type TabType = 'text' | 'documents' | 'chat' | 'automation' | 'audio'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('text')

  const tabs = [
    { id: 'text' as TabType, labelKey: 'textTransform', icon: Sparkles },
    { id: 'documents' as TabType, labelKey: 'documentAnalysis', icon: FileText },
    { id: 'chat' as TabType, labelKey: 'technicalChat', icon: MessageSquare },
    { id: 'automation' as TabType, labelKey: 'intelligentAutomation', icon: Zap },
    { id: 'audio' as TabType, labelKey: 'audioTranslate', icon: Headphones },
  ]

  return (
    <div className="min-h-screen bg-primary-900">
      <Navigation />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      <MobileMenu activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      
      <main className="lg:ml-64 pt-4 px-4 lg:px-6 pb-20 lg:pb-4">
        <div className="max-w-6xl mx-auto">
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
