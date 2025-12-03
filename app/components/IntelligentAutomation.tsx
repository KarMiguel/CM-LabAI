'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Zap, Copy, CheckCircle } from 'lucide-react'

type AutomationType = 'text' | 'commit' | 'organize' | 'pattern'

export default function IntelligentAutomation() {
  const { t, language } = useLanguage()
  const [type, setType] = useState<AutomationType>('text')
  const [task, setTask] = useState('')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleAutomate = async () => {
    if (!task.trim() || !input.trim()) {
      alert('Por favor, preencha todos os campos')
      return
    }

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/automation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, task, input, language }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.result)
      } else {
        alert(data.error || t('errors.processingError'))
      }
    } catch (error) {
      console.error('Erro:', error)
      alert(t('errors.apiError'))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('automation.title')}
        </h2>
        <p className="text-gray-300">
          {t('automation.description')}
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">Tipo:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AutomationType)}
            className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="text">{t('automation.types.text.label')}</option>
            <option value="commit">{t('automation.types.commit.label')}</option>
            <option value="organize">{t('automation.types.organize.label')}</option>
            <option value="pattern">{t('automation.types.pattern.label')}</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">
            {t('automation.taskLabel')}
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder={t('automation.taskPlaceholder')}
            className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">
            {t('automation.inputLabel')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('automation.inputPlaceholder')}
            className="w-full px-4 py-3 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[150px]"
          />
        </div>

        <button
          onClick={handleAutomate}
          disabled={!task.trim() || !input.trim() || loading}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-gray-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ring-2 ring-blue-400/50 hover:ring-blue-300/50"
        >
          <Zap size={20} />
          {loading ? t('common.loading') : t('automation.button')}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('automation.resultLabel')}
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-all shadow-md hover:shadow-lg ring-1 ring-blue-400/30"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
          <div className="bg-gray-950 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-800">
            <p className="text-white whitespace-pre-wrap leading-relaxed">{result}</p>
          </div>
        </div>
      )}
    </div>
  )
}
