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

interface LetterHeaderProps {
  header: ILetterHeader
  imageUrl?: string
}

const LOGO_SIZE = 72
const LOGO_COLUMN_WIDTH = 90

const getValidFont = (jenis_font?: string): string => {
  if (!jenis_font) return 'Roboto'

  // Find the matching font key in FONT_MAP (case-insensitive)
  const matchedKey = Object.keys(FONT_MAP).find(
    (key) => key.toLowerCase() === jenis_font.trim().toLowerCase()
  )

  return matchedKey || 'Roboto'
}

/**
 * Normalisasi format warna agar kompatibel dengan pdfmake.
 * - Menambahkan prefix # jika tidak ada
 * - Memotong alpha channel (8 digit → 6 digit) jika ada
 * Contoh: "18279AFF" → "#18279A", "#18279A" → "#18279A"
 */
const normalizeColor = (warna?: string): string | undefined => {
  if (!warna || warna.trim() === '') return undefined

  let color = warna.trim()

  // Hapus prefix # jika ada, untuk normalisasi
  color = color.replace(/^#/, '')

  // Jika 8 digit (RRGGBBAA), buang alpha channel (AA)
  if (color.length === 8) {
    color = color.slice(0, 6)
  }

  // Valid: harus 6 digit hex
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) return undefined

  return `#${color.toUpperCase()}`
}

export default function LetterHeaderPDF({ header, imageUrl }: LetterHeaderProps) {
  const generateContent = (): Content[] => {
    const settings = header?.pengaturan || []

    const textItems = settings.map((setting: ISettingLetterHeader, index: number) => {
      const textStyle: any = {
        text: setting.isi,
        alignment: 'center',
        font: getValidFont(setting.jenis_font),
        fontSize: Number(setting.ukuran_font) || 12,
        bold: setting.gaya_font?.toLowerCase().includes('bold'),
        italics: setting.gaya_font?.toLowerCase().includes('italic'),
        margin: [0, index === 0 ? 0 : 1, 0, 0] as [number, number, number, number],
      }

      // Terapkan warna jika user menentukan warna khusus
      const normalizedColor = normalizeColor(setting.warna)
      if (normalizedColor) {
        textStyle.color = normalizedColor
      }

      return textStyle
    })

    // ── Estimasi tinggi text untuk middle center logo ──
    // Available width untuk text column = total halaman - margins - logo width - gap
    // A4 width = 595.28pt, pageMargins: [40, 40, 40, 60] (dari index.tsx)
    // textColWidth ≈ 595.28 - 40 - 40 - LOGO_COLUMN_WIDTH - 0 (columnGap = 0) ≈ 425
    const TEXT_COL_WIDTH = 515 - LOGO_COLUMN_WIDTH
    const avgCharWidth = (fs: number) => fs * 0.55

    const estimatedTextHeight = textItems.reduce((total: number, item: any) => {
      const text = item.text ?? ''
      const fontSize = item.fontSize || 12
      const topMargin = item.margin?.[1] || 0
      const explicitLines = text.split('\n').length
      const charsPerLine = Math.max(1, Math.floor(TEXT_COL_WIDTH / avgCharWidth(fontSize)))
      const wrappedLines = Math.max(explicitLines, Math.ceil(text.length / charsPerLine))
      return total + topMargin + fontSize * 1.25 * wrappedLines
    }, 0)

    const logoTopMargin = Math.max((estimatedTextHeight - LOGO_SIZE) / 2, 0)

    return [
      {
        columns: [
          {
            width: imageUrl ? LOGO_COLUMN_WIDTH : 0,
            stack: imageUrl
              ? [
                  {
                    image: imageUrl,
                    fit: [LOGO_SIZE, LOGO_SIZE],
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
        columnGap: 0,
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          widths: ['*'],
          body: [['']],
        },
        layout: {
          hLineWidth: (i: number) => {
            if (i === 0) return 1.5
            return 0
          },
          hLineColor: () => '#000000',
          vLineWidth: () => 0,
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 2,
        },
        margin: [0, 0, 0, 15],
      },
    ]
  }

  return {
    generateContent,
  }
}
