# CM LabAi 🚀

Uma plataforma inteligente de IA com múltiplas funcionalidades para transformação de texto, análise de documentos, chat especializado e automação.

## Funcionalidades

### 1. Resumo e Transformação Inteligente de Texto
- Resume textos longos
- Melhora escrita
- Gera commits
- Traduz e reorganiza textos

### 2. Análise Automática de Documentos
- Extrai dados de PDFs
- Classifica por tipo
- Encontra informações importantes
- Verifica inconsistências

### 3. Chat IA Especializado (Assistente Técnico)
- Explica códigos
- Responde dúvidas
- Interpreta regras e documentos
- Ajuda em lógica e problemas técnicos

### 4. Automação Inteligente
- Gera textos e padrões automaticamente
- Cria commits
- Organiza conteúdo
- Faz pequenas tarefas repetitivas sozinho

## Tecnologias

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Google Gemini API
- PDF Parse

## Como usar

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com:
```env
# API do Google Gemini (OBRIGATÓRIA)
# Obtenha sua chave em: https://aistudio.google.com/apikey
GEMINI_API_KEY=AIzaSyARk5dpYYZ6T8Rd1oYdYPsOUQOsIjodkv4

# URL da API Gemini (OBRIGATÓRIA)
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

**Arquivo pronto para copiar:** Veja o arquivo `ENV_EXAMPLE.txt` na raiz do projeto.

**Nota:** O sistema usa exclusivamente a API do Google Gemini. Ambas as variáveis são obrigatórias.

3. Execute o projeto:
```bash
npm run dev
```

4. Acesse `http://localhost:3000`

## Estrutura do Projeto

```
cm_labAi/
├── app/              # App Router do Next.js
├── components/        # Componentes React
├── lib/              # Utilitários e funções
├── public/           # Arquivos estáticos
└── types/            # Tipos TypeScript
```

