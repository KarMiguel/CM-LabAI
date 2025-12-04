import { NextRequest, NextResponse } from 'next/server'
import { parsePDF } from '@/lib/parsers/pdf'
import { generateText } from '@/lib/ai'
import { getDocumentAnalysisPrompt } from '@/lib/prompts/loader'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const operation = formData.get('operation') as string

    if (!file) {
      return NextResponse.json({ error: 'Arquivo não fornecido' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const pdfData = await parsePDF(buffer)

    const language = formData.get('language') as string | null

    const { system: systemPrompt, user: userPrompt } = getDocumentAnalysisPrompt(
      operation,
      pdfData.text,
      language || undefined
    )

    const analysis = await generateText(userPrompt, systemPrompt)

    return NextResponse.json({
      analysis,
      metadata: {
        numPages: pdfData.numPages,
        info: pdfData.info,
      },
    })
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar documento' },
      { status: 500 }
    )
  }
}
