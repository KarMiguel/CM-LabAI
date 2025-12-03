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

Configure as variáveis de ambiente no arquivo `.env.local` na raiz do projeto.

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
- Verifique se o arquivo `.env.local` existe e está configurado corretamente
- Reinicie o servidor após criar/editar o `.env.local`

### Erro ao processar PDF
- Certifique-se de que o arquivo é um PDF válido
- Verifique o tamanho do arquivo (recomendado: < 10MB)

## Build para Produção

```bash
npm run build
npm start
```

