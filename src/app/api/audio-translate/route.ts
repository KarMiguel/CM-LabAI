import { NextRequest, NextResponse } from 'next/server'
import { generateTextWithGeminiAudio } from '@/lib/ai/gemini-audio'
import { getAudioTranslatePrompt } from '@/lib/prompts/loader'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const targetLanguage = formData.get('targetLanguage') as string
    const language = formData.get('language') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Arquivo de áudio não fornecido' }, { status: 400 })
    }

    // Converter arquivo para base64
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Audio = buffer.toString('base64')
    
    // Determinar o tipo MIME
    const mimeType = file.type || 'audio/mpeg'

    // Obter prompts
    const { system: systemPrompt, user: userPrompt } = getAudioTranslatePrompt(
      targetLanguage,
      language || undefined
    )

    // Processar áudio com Gemini
    const result = await generateTextWithGeminiAudio(
      base64Audio,
      mimeType,
      userPrompt,
      systemPrompt
    )

    // Separar transcrição e tradução (assumindo que o resultado vem formatado)
    const lines = result.split('\n')
    let transcription = ''
    let translation = ''

    // Tentar identificar transcrição e tradução
    const transcriptionIndex = lines.findIndex(line => 
      line.toLowerCase().includes('transcrição') || 
      line.toLowerCase().includes('transcription') ||
      line.toLowerCase().includes('áudio original')
    )
    
    const translationIndex = lines.findIndex(line => 
      line.toLowerCase().includes('tradução') || 
      line.toLowerCase().includes('translation') ||
      line.toLowerCase().includes('traduzido')
    )

    if (transcriptionIndex !== -1 && translationIndex !== -1) {
      transcription = lines.slice(transcriptionIndex + 1, translationIndex).join('\n').trim()
      translation = lines.slice(translationIndex + 1).join('\n').trim()
    } else {
      // Se não encontrar separação clara, dividir ao meio ou usar todo o resultado
      const midPoint = Math.floor(lines.length / 2)
      transcription = lines.slice(0, midPoint).join('\n').trim()
      translation = lines.slice(midPoint).join('\n').trim()
    }

    // Se ainda estiver vazio, usar o resultado completo
    if (!transcription && !translation) {
      transcription = result
      translation = result
    }

    return NextResponse.json({
      transcription,
      translation,
    })
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar áudio' },
      { status: 500 }
    )
  }
}

