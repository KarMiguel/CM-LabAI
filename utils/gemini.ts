import axios from 'axios'

export async function generateTextWithGemini(
  prompt: string,
  systemPrompt?: string
): Promise<string> {
  try {
    const apiKey = process.env.GEMINI_API_KEY
    const apiUrl = process.env.GEMINI_API_URL
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurada')
    }
    
    if (!apiUrl) {
      throw new Error('GEMINI_API_URL não configurada')
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
    
    if (error.response) {
      const errorMessage = error.response.data?.error?.message || error.response.statusText
      throw new Error(`Erro na API Gemini: ${errorMessage}`)
    }
    
    throw new Error(
      error.message || 'Erro ao processar solicitação. Verifique sua API key do Gemini.'
    )
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
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY não configurada')
    }
    
    if (!apiUrl) {
      throw new Error('GEMINI_API_URL não configurada')
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
    
    if (error.response) {
      const errorMessage = error.response.data?.error?.message || error.response.statusText
      throw new Error(`Erro na API Gemini: ${errorMessage}`)
    }
    
    throw new Error(
      error.message || 'Erro ao processar áudio. Verifique sua API key do Gemini.'
    )
  }
}

