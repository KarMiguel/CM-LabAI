import axios from 'axios'

export async function generateTextWithGemini(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    const apiUrl = process.env.GEMINI_API_URL
    
    if (!apiKey || !apiUrl) {
      throw new Error('Configuração de IA não disponível')
    }

    const fullPrompt = systemPrompt
      ? `${systemPrompt}\n\n${prompt}`
      : prompt

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      }
    )

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Erro ao gerar resposta'

    return text
  } catch (error: any) {
    console.error('Erro ao chamar Gemini:', error)
    throw new Error('Erro ao processar solicitação com IA')
  }
}

export async function generateTextWithGeminiAudio(
  base64Audio: string,
  mimeType: string,
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    const apiUrl = process.env.GEMINI_API_URL
    
    if (!apiKey || !apiUrl) {
      throw new Error('Configuração de IA não disponível')
    }

    const fullPrompt = systemPrompt
      ? `${systemPrompt}\n\n${prompt}`
      : prompt

    const parts: any[] = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Audio,
        },
      },
      {
        text: fullPrompt,
      },
    ]

    const response = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: parts,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      }
    )

    const text =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Erro ao gerar resposta'

    return text
  } catch (error: any) {
    console.error('Erro ao chamar Gemini com áudio:', error)
    throw new Error('Erro ao processar áudio com IA')
  }
}

