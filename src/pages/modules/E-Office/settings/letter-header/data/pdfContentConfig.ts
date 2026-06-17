// import type { Content } from 'pdfmake/interfaces'
// import type {
//   ILetterHeader,
//   ISettingLetterHeader,
// } from '@/pages/modules/E-Office/settings/letter-header/data/types'
// import { FONT_MAP } from '@/pages/modules/E-Office/utils/fontConfig'
//
// interface LetterHeaderProps {
//   header: ILetterHeader
//   imageUrl?: string
// }
//
// // const PAGE_WIDTH = 515
// const LOGO_SIZE = 72
//
// const getValidFont = (jenis_font?: string): string => {
//   if (!jenis_font) return 'Roboto'
//
//   const fontName = Object.keys(FONT_MAP).find(
//     (key) => key.toLowerCase() === jenis_font.trim().toLowerCase()
//   )
//
//   return fontName === 'Roboto' ? 'Roboto' : 'Roboto'
// }
//
// export default function LetterHeaderPDF({ header, imageUrl }: LetterHeaderProps) {
//   const generateContent = (): Content[] => {
//     const settings = header?.pengaturan || []
//
//     const columns: any[] = []
//
//     if (imageUrl) {
//       columns.push({
//         width: LOGO_SIZE,
//         image: imageUrl,
//         fit: [LOGO_SIZE, LOGO_SIZE] as [number, number],
//         alignment: 'center',
//         margin: [0, 0, 10, 0],
//       })
//     }
//
//     columns.push({
//       width: '*',
//       stack: settings.map((setting: ISettingLetterHeader, index: number) => ({
//         text: setting.isi,
//         alignment: 'center',
//         font: getValidFont(setting.jenis_font),
//         fontSize: Number(setting.ukuran_font) || 12,
//         bold: setting.gaya_font?.toLowerCase().includes('bold'),
//         italics: setting.gaya_font?.toLowerCase().includes('italic'),
//
//         // jarak antar baris lebih rapat dan rapi
//         margin: [0, index === 0 ? 0 : 1, 0, 0] as [number, number, number, number],
//       })),
//     })
//
//     // Spacer kanan agar teks tetap center
//     if (imageUrl) {
//       columns.push({
//         width: LOGO_SIZE,
//         text: '',
//       })
//     }
//
//     return [
//       {
//         table: {
//           widths: ['*'],
//           body: [['']],
//         },
//         layout: {
//           hLineWidth: (i: number) => (i === 0 ? 0 : i === 1 ? 0 : 0),
//           hLineColor: () => '#000',
//           vLineWidth: () => 0,
//           paddingLeft: () => 0,
//           paddingRight: () => 0,
//           paddingTop: () => 0,
//           paddingBottom: () => 0,
//         },
//         margin: [0, 0, 0, 0],
//       },
//       {
//         columns,
//         columnGap: 12,
//         alignment: 'center',
//         margin: [0, 0, 0, 8] as [number, number, number, number],
//       },
//       {
//         canvas: [
//           {
//             type: 'line',
//             x1: 0,
//             y1: 0,
//             x2: 515,
//             y2: 0,
//             lineWidth: 1.5,
//             lineColor: '#000000',
//           },
//           {
//             type: 'line',
//             x1: 0,
//             y1: 3,
//             x2: 515,
//             y2: 3,
//             lineWidth: 0.5,
//             lineColor: '#000000',
//           },
//         ],
//         margin: [0, 0, 0, 15] as [number, number, number, number],
//       },
//     ]
//   }
//
//   return {
//     generateContent,
//   }
// }

import type { Content } from 'pdfmake/interfaces'
import type {
  ILetterHeader,
  ISettingLetterHeader,
} from '@/pages/modules/E-Office/settings/letter-header/data/types'
import { FONT_MAP } from '@/pages/modules/E-Office/utils/fontConfig'

// ─── Constants ──────────────────────────────────────────────────────────────
const DEFAULT_LOGO_SIZE = 72
const DEFAULT_LOGO_COL_WIDTH = 90

// ─── Public interface untuk caller yang ingin override parameter ─────────────
export interface KopSuratOptions {
  logoSize?: number
  logoColumnWidth?: number
  columnGap?: number
  pageMarginLeft?: number
  pageMarginRight?: number
}

// ─── Helper: get font ───────────────────────────────────────────────────────
export const getValidFont = (jenis_font?: string): string => {
  if (!jenis_font) return 'Roboto'

  const matchedKey = Object.keys(FONT_MAP).find(
    (key) => key.toLowerCase() === jenis_font.trim().toLowerCase()
  )

  return matchedKey || 'Roboto'
}

// ─── Helper: normalize color ────────────────────────────────────────────────
export const normalizeColor = (warna?: string): string | undefined => {
  if (!warna || warna.trim() === '') return undefined

  let color = warna.trim()
  color = color.replace(/^#/, '')
  if (color.length === 8) {
    color = color.slice(0, 6)
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) return undefined
  return `#${color.toUpperCase()}`
}

// ─── Shared: map ISettingLetterHeader ke pdfmake text style ─────────────────
export const mapSettingToTextStyle = (
  setting: ISettingLetterHeader,
  index: number,
): any => {
  const style: any = {
    text: setting.isi,
    alignment: 'center',
    font: getValidFont(setting.jenis_font),
    fontSize: Number(setting.ukuran_font) || 12,
    bold: setting.gaya_font?.toLowerCase().includes('bold'),
    italics: setting.gaya_font?.toLowerCase().includes('italic'),
    margin: [0, index === 0 ? 0 : 1, 0, 0] as [number, number, number, number],
  }

  const normalizedColor = normalizeColor(setting.warna)
  if (normalizedColor) {
    style.color = normalizedColor
  }

  return style
}

/**
 * ── Shared: build kop surat content ─────────────────────────────────────────
 * Mengembalikan array Content yang terdiri dari:
 *   [0] — columns (logo + text) dengan middle center vertikal
 *   [1] — separator line (garis bawah kop surat)
 *
 * Semua file PDF yang membutuhkan kop surat WAJIB menggunakan fungsi ini
 * agar konsisten dalam hal:
 *   - Layout logo + text (columns, middle center)
 *   - Font (FONT_MAP, case-insensitive lookup)
 *   - Warna teks (normalizeColor dari setting.warna)
 *   - Separator line (double-line style)
 */
export const buildKopSuratContent = (
  header: ILetterHeader | null | undefined,
  imageUrl?: string,
  options?: KopSuratOptions,
): Content[] | null => {
  const settings = header?.pengaturan || []
  if (settings.length === 0 && !imageUrl) return null

  const logoSize = options?.logoSize ?? DEFAULT_LOGO_SIZE
  const logoColumnWidth = options?.logoColumnWidth ?? DEFAULT_LOGO_COL_WIDTH
  const colGap = options?.columnGap ?? 0
  const pgMarginL = options?.pageMarginLeft ?? 40
  const pgMarginR = options?.pageMarginRight ?? 40

  // Build text items
  const textItems = settings.map((s: ISettingLetterHeader, i: number) =>
    mapSettingToTextStyle(s, i),
  )

  // Estimasi tinggi text untuk middle center logo
  const TEXT_COL_WIDTH =
    515 - pgMarginL - pgMarginR - logoColumnWidth - colGap
  const avgCharWidth = (fs: number) => fs * 0.55

  const estimatedTextHeight = textItems.reduce(
    (total: number, item: any) => {
      const text = item.text ?? ''
      const fontSize = item.fontSize || 12
      const topMargin = item.margin?.[1] || 0
      const explicitLines = text.split('\n').length
      const charsPerLine = Math.max(
        1,
        Math.floor(TEXT_COL_WIDTH / avgCharWidth(fontSize)),
      )
      const wrappedLines = Math.max(
        explicitLines,
        Math.ceil(text.length / charsPerLine),
      )
      return total + topMargin + fontSize * 1.25 * wrappedLines
    },
    0,
  )

  const logoTopMargin = Math.max(
    (estimatedTextHeight - logoSize) / 2,
    0,
  )

  // Columns: logo + text
  const headerColumns: Content = {
    columns: [
      {
        width: imageUrl ? logoColumnWidth : 0,
        stack: imageUrl
          ? [
              {
                image: imageUrl,
                fit: [logoSize, logoSize] as [number, number],
                alignment: 'center',
                margin: [0, logoTopMargin, 0, 0],
              },
            ]
          : [],
      },
      {
        width: '*',
        stack: textItems,
        alignment: 'center',
      },
    ],
    columnGap: colGap,
    margin: [0, 0, 0, 10],
  }

  // Separator: double-line (garis tebal + tipis)
  const separatorLine: Content = {
    canvas: [
      {
        type: 'line',
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 1.5,
        lineColor: '#000000',
      },
      {
        type: 'line',
        x1: 0,
        y1: 3,
        x2: 515,
        y2: 3,
        lineWidth: 0.5,
        lineColor: '#000000',
      },
    ],
    margin: [0, 0, 0, 15],
  }

  return [headerColumns, separatorLine]
}

// ─── Backward-compatible wrapper untuk index.tsx ────────────────────────────
interface LetterHeaderProps {
  header: ILetterHeader
  imageUrl?: string
}

export default function LetterHeaderPDF({ header, imageUrl }: LetterHeaderProps) {
  const generateContent = (): Content[] => {
    const result = buildKopSuratContent(header, imageUrl)
    return result ?? []
  }

  return {
    generateContent,
  }
}
