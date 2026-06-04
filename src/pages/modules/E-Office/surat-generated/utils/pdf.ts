import pdfMake from '@/utils/pdfmake'
import htmlToPdfmake from 'html-to-pdfmake'
import type { ISuratGeneratedDetail } from '@/pages/modules/E-Office/surat-generated/data/types'

/**
 * Konversi HTML string ke pdfmake content definition.
 * html-to-pdfmake membutuhkan DOMParser yang tersedia di browser.
 */
function htmlToContent(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  return htmlToPdfmake(doc.body.innerHTML, {
    defaultStyles: {
      p: { margin: [0, 0, 0, 8] },
      div: { margin: [0, 0, 0, 8] },
    },
  })
}

/**
 * Generate dan download PDF untuk surat generated.
 * Konten diambil dari konten_render tiap section_value,
 * dirender berurutan dari atas ke bawah.
 *
 * @param detail  Data detail surat dari API
 */
export function generatePdfSurat(detail: ISuratGeneratedDetail): void {
  const { surat_generated: mainData, section_values: sectionValues = [] } = detail

  const content: any[] = []

  // Konten dari konten_render per section
  sectionValues.forEach((section) => {
    if (section.konten_render) {
      const parsedContent = htmlToContent(section.konten_render)
      content.push({
        stack: [parsedContent],
        margin: [0, 0, 0, 12],
      })
    }
  })

  const docDefinition: any = {
    content,
    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.5,
    },
    pageMargins: [60, 60, 60, 60],
  }

  pdfMake.createPdf(docDefinition).download(`${mainData.judul || 'surat'}.pdf`)
}
