import { NextRequest, NextResponse } from 'next/server'
import { generateText } from '@/lib/ai'
import { getAutomationPrompt } from '@/lib/prompts/loader'

export async function POST(request: NextRequest) {
  try {
    const { task, input, type, language } = await request.json()

    if (!task || !input) {
      return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 })
    }

    const { system: systemPrompt, user: userPrompt } = getAutomationPrompt(type, task, input, language)

    const result = await generateText(userPrompt, systemPrompt)

    return NextResponse.json({ result })
  } catch (error: any) {
    console.error('Erro na API:', error)
    return NextResponse.json(
      { error: error.message || 'Erro ao processar automação' },
      { status: 500 }
    )
  }
}
