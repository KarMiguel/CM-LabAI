'use client'

import { useState, useRef } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Upload, Play, Pause, Download, Languages } from 'lucide-react'

export default function AudioTranslator() {
  const { t, language } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [targetLanguage, setTargetLanguage] = useState<string>('pt')
  const [transcription, setTranscription] = useState('')
  const [translation, setTranslation] = useState('')
  const [loading, setLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const targetLanguages = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type.startsWith('audio/') || selectedFile.name.match(/\.(mp3|wav|ogg|m4a|webm)$/i)) {
        setFile(selectedFile)
        setTranscription('')
        setTranslation('')
        const url = URL.createObjectURL(selectedFile)
        setAudioUrl(url)
      } else {
        alert(t('audioTranslate.errors.invalidFile'))
      }
    }
  }

  const handleTranslate = async () => {
    if (!file) {
      alert(t('audioTranslate.errors.noFile'))
      return
    }

    setLoading(true)
    setTranscription('')
    setTranslation('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('targetLanguage', targetLanguage)
      formData.append('language', language)

      const response = await fetch('/api/audio-translate', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setTranscription(data.transcription || '')
        setTranslation(data.translation || '')
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

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('audioTranslate.title')}
        </h2>
        <p className="text-primary-200">
          {t('audioTranslate.description')}
        </p>
      </div>

      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('audioTranslate.fileLabel')}
          </label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-primary-100">
              <Upload size={20} />
              <span>{t('audioTranslate.selectFile')}</span>
              <input
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.m4a,.webm"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            {file && (
              <span className="text-primary-200 text-sm">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            )}
          </div>
          <p className="text-primary-300 text-sm mt-2">
            {t('audioTranslate.fileHint')}
          </p>
        </div>

        {audioUrl && file && (
          <div className="mb-4 p-4 bg-primary-900/50 rounded-lg">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-500 rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white" />}
              </button>
              <div className="flex-1">
                <p className="text-primary-100 font-medium">{file.name}</p>
                <p className="text-primary-300 text-sm">
                  {t('audioTranslate.audioPreview')}
                </p>
              </div>
            </div>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            <Languages size={16} className="inline mr-2" />
            {t('audioTranslate.targetLanguage')}
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full px-4 py-2 bg-primary-700 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {targetLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleTranslate}
          disabled={!file || loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>{t('common.loading')}</span>
            </>
          ) : (
            <>
              <Languages size={20} />
              <span>{t('audioTranslate.button')}</span>
            </>
          )}
        </button>
      </div>

      {transcription && (
        <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('audioTranslate.transcriptionLabel')}
            </h3>
            <button
              onClick={() => handleDownload(transcription, 'transcricao.txt')}
              className="flex items-center gap-2 px-3 py-1 bg-primary-700 hover:bg-primary-600 text-primary-100 rounded-lg text-sm transition-colors"
            >
              <Download size={16} />
              {t('common.download')}
            </button>
          </div>
          <div className="bg-primary-900/50 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-primary-100 whitespace-pre-wrap">{transcription}</p>
          </div>
        </div>
      )}

      {translation && (
        <div className="bg-primary-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('audioTranslate.translationLabel')}
            </h3>
            <button
              onClick={() => handleDownload(translation, 'traducao.txt')}
              className="flex items-center gap-2 px-3 py-1 bg-primary-700 hover:bg-primary-600 text-primary-100 rounded-lg text-sm transition-colors"
            >
              <Download size={16} />
              {t('common.download')}
            </button>
          </div>
          <div className="bg-primary-900/50 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-primary-100 whitespace-pre-wrap">{translation}</p>
          </div>
        </div>
      )}
    </div>
  )
}

