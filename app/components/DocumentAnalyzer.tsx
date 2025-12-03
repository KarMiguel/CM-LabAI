'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { FileText, Upload, Copy, CheckCircle } from 'lucide-react'

type Operation = 'extract' | 'classify' | 'find' | 'verify'

export default function DocumentAnalyzer() {
  const { t, language } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [operation, setOperation] = useState<Operation>('extract')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
      setResult('')
    } else {
      alert(t('errors.invalidFile'))
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert(t('errors.noFile'))
      return
    }

    setLoading(true)
    setResult('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('operation', operation)
      formData.append('language', language)

      const response = await fetch('/api/document-analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data.analysis)
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
          {t('documentAnalysis.title')}
        </h2>
        <p className="text-primary-200">
          {t('documentAnalysis.description')}
        </p>
      </div>

      <div className="bg-primary-800/50 rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">
            {t('documentAnalysis.fileLabel')}
          </label>
          <label className="flex items-center gap-2 px-4 py-2 bg-primary-700 hover:bg-primary-600 rounded-lg cursor-pointer transition-colors text-primary-100">
            <Upload size={20} />
            <span>{t('documentAnalysis.filePlaceholder')}</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && (
            <p className="text-primary-200 text-sm mt-2">{file.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-primary-100 mb-2 font-medium">Operação:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            className="w-full px-4 py-2 bg-primary-700 text-primary-100 rounded-lg border border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="extract">{t('documentAnalysis.operations.extract.label')}</option>
            <option value="classify">{t('documentAnalysis.operations.classify.label')}</option>
            <option value="find">{t('documentAnalysis.operations.find.label')}</option>
            <option value="verify">{t('documentAnalysis.operations.verify.label')}</option>
          </select>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {loading ? t('common.loading') : t('documentAnalysis.button')}
        </button>
      </div>

      {result && (
        <div className="bg-primary-800/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('documentAnalysis.resultLabel')}
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

