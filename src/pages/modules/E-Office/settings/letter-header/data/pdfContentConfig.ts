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

// const PAGE_WIDTH = 515
const LOGO_SIZE = 72

const getValidFont = (jenis_font?: string): string => {
  if (!jenis_font) return 'Roboto'

  const fontName = Object.keys(FONT_MAP).find(
    (key) => key.toLowerCase() === jenis_font.trim().toLowerCase()
  )

  return fontName === 'Roboto' ? 'Roboto' : 'Roboto'
}

export default function LetterHeaderPDF({ header, imageUrl }: LetterHeaderProps) {
  const generateContent = (): Content[] => {
    const settings = header?.pengaturan || []

    const columns: any[] = []

    // Logo kiri
    if (imageUrl) {
      columns.push({
        width: LOGO_SIZE,
        image: imageUrl,
        fit: [LOGO_SIZE, LOGO_SIZE] as [number, number],
        alignment: 'center',
        margin: [0, 0, 10, 0],
      })
    }

    // Teks kop surat
    columns.push({
      width: '*',
      stack: settings.map((setting: ISettingLetterHeader, index: number) => ({
        text: setting.isi,
        alignment: 'center',
        font: getValidFont(setting.jenis_font),
        fontSize: Number(setting.ukuran_font) || 12,
        bold: setting.gaya_font?.toLowerCase().includes('bold'),
        italics: setting.gaya_font?.toLowerCase().includes('italic'),

        // jarak antar baris lebih rapat dan rapi
        margin: [0, index === 0 ? 0 : 1, 0, 0] as [number, number, number, number],
      })),
    })

    // Spacer kanan agar teks tetap center
    if (imageUrl) {
      columns.push({
        width: LOGO_SIZE,
        text: '',
      })
    }

    return [
      {
        table: {
          widths: ['*'],
          body: [['']],
        },
        layout: {
          hLineWidth: (i: number) => (i === 0 ? 0 : i === 1 ? 0 : 0),
          hLineColor: () => '#000',
          vLineWidth: () => 0,
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0,
        },
        margin: [0, 0, 0, 0],
      },
      {
        columns,
        columnGap: 12,
        margin: [0, 0, 0, 8] as [number, number, number, number],
      },
      {
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
        margin: [0, 0, 0, 15] as [number, number, number, number],
      },
    ]
  }

  return {
    generateContent,
  }
}
