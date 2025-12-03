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
      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t('documentAnalysis.titleDocumentAnalysis')}
        </h2>
        <p className="text-gray-300">
          {t('documentAnalysis.description')}
        </p>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg border border-gray-800">
        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">
            {t('documentAnalysis.fileLabel')}
          </label>
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer transition-colors text-white">
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
            <p className="text-gray-300 text-sm mt-2">{file.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-2 font-semibold">Operação:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as Operation)}
            className="w-full px-4 py-2 bg-gray-950 text-white rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-400 disabled:bg-gray-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ring-2 ring-blue-400/50 hover:ring-blue-300/50"
        >
          {loading ? t('common.loading') : t('documentAnalysis.button')}
        </button>
      </div>

      {result && (
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">
              {t('documentAnalysis.resultLabel')}
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
