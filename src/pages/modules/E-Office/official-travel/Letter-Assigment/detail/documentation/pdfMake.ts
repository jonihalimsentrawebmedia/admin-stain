import type {
  Alignment,
  ContentImage,
  ContentText,
  Margins,
  TableCell,
  TDocumentDefinitions,
} from 'pdfmake/interfaces'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

interface IDocumentationResponse {
  kop_surat: {
    nama_unit: string
    url_logo: string
    pengaturan: {
      isi: string
      jenis_font: string
      gaya_font: string
      ukuran_font: number
    }[]
  }
  dokumentasi: {
    url_file: string
  }[]
}

interface Props {
  data: IDocumentationResponse
  logoBase64: string
  documentationImages: Record<string, string>
}

export const DocumentationPdf = ({
  data,
  logoBase64,
  documentationImages,
}: Props): TDocumentDefinitions => {
  const imageRows: TableCell[][] = []

  for (let i = 0; i < data.dokumentasi.length; i += 2) {
    const left = data.dokumentasi[i]
    const right = data.dokumentasi[i + 1]

    imageRows.push([
      {
        image: documentationImages[left.url_file],
        width: 240,
        fit: [240, 180] as [number, number],
        alignment: 'center' as Alignment,
        margin: [0, 0, 0, 10] as Margins,
      } satisfies ContentImage,
      right
        ? ({
            image: documentationImages[right.url_file],
            width: 240,
            fit: [240, 180] as [number, number],
            alignment: 'center' as Alignment,
            margin: [0, 0, 0, 10] as Margins,
          } satisfies ContentImage)
        : ({
            text: '',
          } satisfies ContentText),
    ])
  }

  return {
    pageSize: 'A4',
    pageMargins: [30, 30, 30, 30],

    defaultStyle: {
      font: 'Roboto',
    },

    content: [
      // KOP SURAT (shared helper)
      ...(buildKopSuratContent(data.kop_surat as any, logoBase64) ?? []),

      {
        text: 'DOKUMENTASI KEGIATAN',
        alignment: 'center',
        bold: true,
        fontSize: 16,
        margin: [0, 0, 0, 20],
      },

      {
        table: {
          widths: ['50%', '50%'],
          body: imageRows,
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 5,
          paddingRight: () => 5,
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
      },
    ],
  }
}
