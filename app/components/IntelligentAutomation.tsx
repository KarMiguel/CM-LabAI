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
      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('automation.title')}
        </h2>
        <p className="text-primary-200">
          {t('automation.description')}
        </p>
      </div>

      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">Tipo:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as AutomationType)}
            className="w-full px-4 py-2 bg-primary-700 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="text">{t('automation.types.text.label')}</option>
            <option value="commit">{t('automation.types.commit.label')}</option>
            <option value="organize">{t('automation.types.organize.label')}</option>
            <option value="pattern">{t('automation.types.pattern.label')}</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('automation.taskLabel')}
          </label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder={t('automation.taskPlaceholder')}
            className="w-full px-4 py-2 bg-primary-900 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('automation.inputLabel')}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('automation.inputPlaceholder')}
            className="w-full px-4 py-3 bg-primary-900 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[150px]"
          />
        </div>

        <button
          onClick={handleAutomate}
          disabled={!task.trim() || !input.trim() || loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Zap size={20} />
          {loading ? t('common.loading') : t('automation.button')}
        </button>
      </div>

      {result && (
        <div className="bg-primary-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('automation.resultLabel')}
            </h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 bg-primary-700 hover:bg-primary-600 text-primary-100 rounded-lg text-sm transition-colors"
            >
              {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              {copied ? t('common.copied') : t('common.copy')}
            </button>
          </div>
          <div className="bg-primary-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="text-primary-100 whitespace-pre-wrap">{result}</p>
          </div>
        </div>
      )}
    </div>
  )
}

