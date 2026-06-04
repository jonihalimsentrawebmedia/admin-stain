import pdfMake from '@/utils/pdfmake'
import htmlToPdfmake from 'html-to-pdfmake'
import type { ISuratGeneratedDetail } from '@/pages/modules/E-Office/surat-generated/data/types'

/**
 * Konversi URL gambar ke base64 via backend API.
 * GET {{VITE_API_URL}}/url-to-base64?url=<encoded-url>
 * Response langsung string base64.
 */
async function fetchImageAsBase64(url: string): Promise<string> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}/url-to-base64?url=${encodeURIComponent(url)}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    const response = await fetch(apiUrl, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!response.ok) return ''

    const text = await response.text()
    return text || ''
  } catch {
    return ''
  }
}

/**
 * Parse HTML konten dan ekstrak menjadi array mixed content:
 * - text: konten HTML tanpa img (via html-to-pdfmake)
 * - image: node gambar dengan base64 + ukuran
 */
type ContentBlock =
  | { type: 'text'; html: string }
  | { type: 'image'; base64: string }

async function extractContentBlocks(html: string): Promise<ContentBlock[]> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const body = doc.body
  const blocks: ContentBlock[] = []

  // Iterasi child nodes secara urut
  for (const node of Array.from(body.childNodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim()
      if (text) {
        blocks.push({ type: 'text', html: text })
      }
      continue
    }

    if (node instanceof HTMLElement) {
      // Cek apakah element berisi image
      const imgs = node.querySelectorAll('img')
      if (imgs.length > 0) {
        // Clone node, hapus semua img
        const textClone = node.cloneNode(true) as HTMLElement
        textClone.querySelectorAll('img').forEach((img) => img.remove())

        // Jika masih ada konten text setelah img dihapus
        const textContent = textClone.innerHTML.trim()
        if (textContent) {
          blocks.push({ type: 'text', html: textContent })
        }

        // Proses masing-masing img
        for (const img of Array.from(imgs)) {
          const src = img.getAttribute('src')
          if (!src) continue
          if (src.startsWith('data:')) {
            blocks.push({ type: 'image', base64: src })
          } else {
            const base64 = await fetchImageAsBase64(src)
            if (base64) {
              blocks.push({ type: 'image', base64 })
            }
          }
        }
      } else {
        // Element biasa tanpa gambar
        const htmlContent = node.innerHTML?.trim()
        if (htmlContent) {
          blocks.push({ type: 'text', html: node.outerHTML })
        }
      }
    }
  }

  return blocks
}

/**
 * Konversi HTML ke pdfmake content (text only, tanpa gambar).
 */
function htmlToTextContent(html: string): any {
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
 * Build pdfmake content array dari satu section konten_render.
 */
async function buildSectionContent(html: string): Promise<any[]> {
  const blocks = await extractContentBlocks(html)
  const result: any[] = []

  for (const block of blocks) {
    if (block.type === 'text') {
      const parsed = htmlToTextContent(block.html)
      result.push(parsed)
    } else if (block.type === 'image') {
      result.push({
        image: block.base64,
        width: 500,
        alignment: 'center' as const,
        margin: [0, 8, 0, 8],
      })
    }
  }

  return result
}

/**
 * Build docDefinition dari section_values konten_render (async).
 */
async function buildDocDefinition(detail: ISuratGeneratedDetail) {
  const { section_values: sectionValues = [] } = detail

  const content: any[] = []

  for (const section of sectionValues) {
    if (section.konten_render) {
      const sectionContent = await buildSectionContent(section.konten_render)
      if (sectionContent.length > 0) {
        content.push({
          stack: sectionContent,
          margin: [0, 0, 0, 12],
        })
      }
    }
  }

  return {
    content,
    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.5,
    },
    pageMargins: [60, 60, 60, 60] as [number, number, number, number],
  }
}

/**
 * Generate dan download PDF untuk surat generated.
 */
export async function generatePdfSurat(detail: ISuratGeneratedDetail): Promise<void> {
  const { surat_generated: mainData } = detail
  const docDefinition = await buildDocDefinition(detail)
  ;(pdfMake.createPdf(docDefinition) as any).download(`${mainData.judul || 'surat'}.pdf`)
}

/**
 * Generate PDF dan return blob URL untuk preview di iframe.
 * Caller wajib revoke URL setelah tidak dipakai: URL.revokeObjectURL(url)
 */
export async function generatePdfBlobUrl(detail: ISuratGeneratedDetail): Promise<string> {
  const docDefinition = await buildDocDefinition(detail)
  return new Promise((resolve, reject) => {
    try {
      const pdfDoc = pdfMake.createPdf(docDefinition) as any
      pdfDoc.getBlob((blob: Blob) => {
        const url = URL.createObjectURL(blob)
        resolve(url)
      })
    } catch (err) {
      reject(err)
    }
  })
}
