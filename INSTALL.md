# Instruções de Instalação - CM LabAi

## Pré-requisitos

- Node.js 18+ instalado
- API Key do Google Gemini (obtenha em: https://aistudio.google.com/apikey)

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API do Google Gemini (OBRIGATÓRIA)
# Obtenha sua chave em: https://aistudio.google.com/apikey
GEMINI_API_KEY=AIzaSyARk5dpYYZ6T8Rd1oYdYPsOUQOsIjodkv4

# URL da API Gemini (OBRIGATÓRIA)
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent
```

**Importante:** 
- O sistema usa exclusivamente a API do Google Gemini
- Ambas as variáveis (`GEMINI_API_KEY` e `GEMINI_API_URL`) são obrigatórias

### 3. Executar o Projeto

```bash
npm run dev
```

### 4. Acessar a Aplicação

Abra seu navegador em: `http://localhost:3000`

## Funcionalidades Disponíveis

### ✅ Resumo e Transformação de Texto
- Resumir textos longos
- Melhorar escrita
- Gerar commits
- Traduzir textos
- Reorganizar conteúdo

### ✅ Análise Automática de Documentos
- Extrair dados de PDFs
- Classificar documentos
- Encontrar informações
- Verificar inconsistências

### ✅ Chat IA Especializado
- Explicar códigos
- Resolver problemas técnicos
- Interpretar documentação
- Ajudar com lógica de programação

### ✅ Automação Inteligente
- Gerar textos automaticamente
- Criar commits
- Organizar conteúdo
- Criar padrões e templates

## Troubleshooting

### Erro: "Cannot find module 'next/server'"
- Execute `npm install` novamente
- Certifique-se de estar usando Node.js 18+

### Erro: "GEMINI_API_KEY não configurada"
- Verifique se o arquivo `.env.local` existe
- Certifique-se de que `GEMINI_API_KEY` está configurada
- Certifique-se de que `GEMINI_API_URL` está configurada
- Reinicie o servidor após criar/editar o `.env.local`

### Erro ao processar PDF
- Certifique-se de que o arquivo é um PDF válido
- Verifique o tamanho do arquivo (recomendado: < 10MB)

## Build para Produção

```bash
npm run build
npm start
```

