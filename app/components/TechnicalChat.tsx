'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { MessageSquare, Send } from 'lucide-react'

export default function TechnicalChat() {
  const { t, language } = useLanguage()
  const [message, setMessage] = useState('')
  const [context, setContext] = useState('')
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!message.trim()) {
      alert(t('errors.noMessage'))
      return
    }

    setLoading(true)
    setResponse('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, context, language }),
      })

      const data = await res.json()

      if (res.ok) {
        setResponse(data.response)
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('technicalChat.title')}
        </h2>
        <p className="text-primary-200">
          {t('technicalChat.description')}
        </p>
      </div>

      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('technicalChat.contextLabel')}
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={t('technicalChat.contextPlaceholder')}
            className="w-full px-4 py-3 bg-primary-900 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[100px]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">Pergunta:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('technicalChat.inputPlaceholder')}
            className="w-full px-4 py-3 bg-primary-900 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{t('common.loading')}</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>{t('common.send')}</span>
            </>
          )}
        </button>
      </div>

      {response && (
        <div className="bg-primary-800/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Resposta:</h3>
          <div className="bg-primary-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
            <p className="text-primary-100 whitespace-pre-wrap">{response}</p>
          </div>
        </div>
      )}
    </div>
  )
}

