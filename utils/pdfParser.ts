import pdfParse from 'pdf-parse'

export interface PDFData {
  text: string
  numPages: number
  info: any
}

export async function parsePDF(buffer: Buffer): Promise<PDFData> {
  try {
    const data = await pdfParse(buffer)
    return {
      text: data.text,
      numPages: data.numpages,
      info: data.info,
    }
  } catch (error) {
    console.error('Erro ao fazer parse do PDF:', error)
    throw new Error('Erro ao processar arquivo PDF')
  }
}

