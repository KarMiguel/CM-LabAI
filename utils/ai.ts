
import { generateTextWithGemini } from './gemini'

export async function generateText(prompt: string, systemPrompt?: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY não configurada. Configure a chave da API do Gemini no arquivo .env.local')
  }

  return await generateTextWithGemini(prompt, systemPrompt)
}

export async function generateStreamingText(
  prompt: string,
  systemPrompt?: string,
  onChunk?: (chunk: string) => void
): Promise<string> {
  const fullResponse = await generateText(prompt, systemPrompt)
  
  if (onChunk) {
    const words = fullResponse.split(' ')
    for (const word of words) {
      onChunk(word + ' ')
      await new Promise(resolve => setTimeout(resolve, 10))
    }
  }
  
  return fullResponse
}

