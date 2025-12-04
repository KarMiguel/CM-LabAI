import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai'
import { getTextTransformPrompt } from '@/lib/prompts/loader'

export async function POST(request: NextRequest) {
  try {
    const { text, operation, language } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Texto não fornecido' }, { status: 400 })
    }

    const { system: systemPrompt, user: userPrompt } = getTextTransformPrompt(operation, text, language)

    const result = await generateText(userPrompt, systemPrompt)

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar texto' },
      { status: 500 }
    )
  }
}
