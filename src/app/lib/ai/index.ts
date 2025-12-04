
import { generateTextWithGemini } from './gemini-audio'

export async function generateText(prompt: string, systemPrompt?: string): Promise<string> {
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

