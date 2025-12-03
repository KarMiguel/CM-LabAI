'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Sparkles, Copy, CheckCircle } from 'lucide-react'

type Operation = 'summarize' | 'improve' | 'commit' | 'translate' | 'reorganize'

export default function TextTransformer() {
  const { t, language } = useLanguage()
  const [text, setText] = useState('')
  const [operation, setOperation] = useState<Operation>('summarize')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const operations = [
    { id: 'summarize' as Operation, icon: Sparkles },
    { id: 'improve' as Operation, icon: Sparkles },
    { id: 'commit' as Operation, icon: Sparkles },
    { id: 'translate' as Operation, icon: Sparkles },
    { id: 'reorganize' as Operation, icon: Sparkles },
  ]

  const handleTransform = async () => {
    if (!text.trim()) {
      alert(t('errors.noText'))
      return
    }

    setLoading(true)
    setResult('')

    try {
      const response = await fetch('/api/text-transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, operation, language }),
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
          {t('textTransform.title')}
        </h2>
        <p className="text-primary-200">
          {t('textTransform.description')}
        </p>
      </div>

      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('textTransform.inputLabel')}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textTransform.inputPlaceholder')}
            className="w-full px-4 py-3 bg-primary-900 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[200px]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">Operação:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            className="w-full px-4 py-2 bg-primary-700 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {operations.map((op) => (
              <option key={op.id} value={op.id}>
                {t(`textTransform.operations.${op.id}.label`)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTransform}
          disabled={!text.trim() || loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {loading ? t('common.loading') : t('textTransform.button')}
        </button>
      </div>

      {result && (
        <div className="bg-primary-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('textTransform.resultLabel')}
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

