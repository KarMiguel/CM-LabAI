'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
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
      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('textTransform.title')}
        </h2>
        <p className="text-gray-300">
          {t('textTransform.description')}
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">
            {t('textTransform.inputLabel')}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('textTransform.inputPlaceholder')}
            className="w-full px-4 py-3 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[200px]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">Operação:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-gray-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ring-2 ring-blue-400/50 hover:ring-blue-300/50"
        >
          {loading ? t('common.loading') : t('textTransform.button')}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('textTransform.resultLabel')}
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

