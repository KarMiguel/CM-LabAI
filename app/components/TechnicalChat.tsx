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
      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('technicalChat.title')}
        </h2>
        <p className="text-gray-300">
          {t('technicalChat.description')}
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">
            {t('technicalChat.contextLabel')}
          </label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder={t('technicalChat.contextPlaceholder')}
            className="w-full px-4 py-3 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[100px]"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">Pergunta:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('technicalChat.inputPlaceholder')}
            className="w-full px-4 py-3 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || loading}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-gray-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 ring-2 ring-blue-400/50 hover:ring-blue-300/50"
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
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-4">Resposta:</h3>
          <div className="bg-gray-950 rounded-lg p-4 max-h-96 overflow-y-auto border border-gray-800">
            <p className="text-white whitespace-pre-wrap leading-relaxed">{response}</p>
          </div>
        </div>
      )}
    </div>
  )
}
