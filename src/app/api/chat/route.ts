import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai'
import { getTechnicalChatPrompt } from '@/lib/prompts/loader'

export async function POST(request: NextRequest) {
  try {
    const { message, context, language } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Mensagem não fornecida' }, { status: 400 })
    }

    const { system: systemPrompt, user: userPrompt } = getTechnicalChatPrompt(message, context, language)

    const response = await generateText(userPrompt, systemPrompt)

    return NextResponse.json({ response })
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
