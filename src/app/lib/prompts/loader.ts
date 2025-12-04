import promptsData from './prompts.json'

type Language = 'pt' | 'en' | 'es'

interface Prompts {
  [lang: string]: {
    textTransform: {
      [key: string]: { system: string; user: string }
    }
    documentAnalysis: {
      [key: string]: { system: string; user: string }
    }
    technicalChat: {
      system: string
      user: string
    }
    automation: {
      [key: string]: { system: string; user: string }
    }
    audioTranslate: {
      system: string
      user: string
    }
  }
}

const prompts = promptsData as Prompts

function getLanguage(lang?: string): Language {
  const validLanguages: Language[] = ['pt', 'en', 'es']
  if (lang && validLanguages.includes(lang as Language)) {
    return lang as Language
  }
  return 'pt'
}

function getPromptsByLanguage(lang?: string) {
  const language = getLanguage(lang)
  const langPrompts = prompts[language]
  
  if (!langPrompts) {
    console.warn(`Prompts não encontrados para idioma '${language}', usando português como fallback`)
    return prompts['pt']
  }
  
  return langPrompts
}

export function getTextTransformPrompt(
  operation: string,
  text: string,
  language?: string
): { system: string; user: string } {
  const langPrompts = getPromptsByLanguage(language)
  const prompt = langPrompts.textTransform[operation]
  
  if (!prompt) {
    throw new Error(`Operação de transformação de texto inválida: ${operation}`)
  }

  return {
    system: prompt.system,
    user: prompt.user.replace('{text}', text),
  }
}

export function getDocumentAnalysisPrompt(
  operation: string,
  document: string,
  language?: string
): { system: string; user: string } {
  const langPrompts = getPromptsByLanguage(language)
  const prompt = langPrompts.documentAnalysis[operation]
  
  if (!prompt) {
    throw new Error(`Operação de análise de documento inválida: ${operation}`)
  }

  return {
    system: prompt.system,
    user: prompt.user.replace('{document}', document),
  }
}

export function getTechnicalChatPrompt(
  message: string,
  context?: string,
  language?: string
): { system: string; user: string } {
  const langPrompts = getPromptsByLanguage(language)
  let userPrompt = langPrompts.technicalChat.user
  
  if (context && context.trim()) {
    userPrompt = userPrompt
      .replace('{context}', context)
      .replace('{message}', message)
  } else {
    userPrompt = userPrompt
      .replace(/Contexto (fornecido|proporcionado|provided):\s*\{context\}\s*\n\n/i, '')
      .replace('{message}', message)
  }

  return {
    system: langPrompts.technicalChat.system,
    user: userPrompt,
  }
}

export function getAutomationPrompt(
  type: string,
  task: string,
  input: string,
  language?: string
): { system: string; user: string } {
  const langPrompts = getPromptsByLanguage(language)
  const prompt = langPrompts.automation[type]
  
  if (!prompt) {
    throw new Error(`Tipo de automação inválido: ${type}`)
  }

  return {
    system: prompt.system,
    user: prompt.user
      .replace('{task}', task)
      .replace('{input}', input),
  }
}

export function getAudioTranslatePrompt(
  targetLanguage: string,
  language?: string
): { system: string; user: string } {
  const langPrompts = getPromptsByLanguage(language)
  const prompt = langPrompts.audioTranslate
  
  if (!prompt) {
    throw new Error('Prompt de tradução de áudio não encontrado')
  }

  const targetLangNames: { [key: string]: string } = {
    'pt': 'português brasileiro',
    'en': 'inglês',
    'es': 'espanhol',
  }

  const targetLangName = targetLangNames[targetLanguage] || targetLanguage

  return {
    system: prompt.system,
    user: prompt.user.replace('{targetLanguage}', targetLangName),
  }
}

export function getValidLanguage(lang?: string): Language {
  return getLanguage(lang)
}

