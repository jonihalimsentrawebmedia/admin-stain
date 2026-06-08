import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'

const createImageGrid = (images: string[]) => {
  const rows: any[] = []

  for (let i = 0; i < images.length; i += 2) {
    rows.push({
      columns: [
        {
          width: '*',
          stack: [
            {
              image: images[i],
              fit: [240, 170],
              alignment: 'center',
            },
          ],
        },

        images[i + 1]
          ? {
              width: '*',
              stack: [
                {
                  image: images[i + 1],
                  fit: [240, 170],
                  alignment: 'center',
                },
              ],
            }
          : {
              width: '*',
              text: '',
            },
      ],

      columnGap: 10,
      margin: [0, 0, 0, 10],
    })
  }

  return rows
}

const createDocumentationContent = (images: string[]) => {
  const content: any[] = []

  // ======================
  // HALAMAN PERTAMA
  // ======================

  const firstPageImages = images.slice(0, 6)

  content.push(...createImageGrid(firstPageImages))

  // ======================
  // HALAMAN SELANJUTNYA
  // ======================

  let currentIndex = 6

  while (currentIndex < images.length) {
    const nextImages = images.slice(currentIndex, currentIndex + 8)

    content.push({
      text: '',
      pageBreak: 'before',
    })

    content.push(...createImageGrid(nextImages))

    currentIndex += 8
  }

  return content
}

interface props {
  documentation: {
    url_file: string
    key_file?: string
  }[]
  detail?: IEvent
}

export const generateDocumentationPdf = async (props: props) => {
  const { documentation, detail } = props
  const images = await Promise.all(
    documentation.map(async (item) => {
      return await GetBase64FromUrl(item.url_file)
    })
  )

  const buildEventInfo = (event?: IEvent) => {
    if (!event) return { text: '' }

    return {
      margin: [0, 0, 0, 20] as [number, number, number, number],

      table: {
        widths: [140, '*'],

        body: [
          ['Nama Kegiatan', `: ${event.nama_kegiatan}`],
          [
            'Hari / Tanggal',
            `: ${
              event.tanggal_mulai
                ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
                : '-'
            }`,
          ],
          ['Waktu', `: ${event.waktu ?? '-'}`],
          ['Tempat', `: ${event.tempat ?? '-'}`],
          ['Penyelenggara', `: ${event.penyelenggara ?? '-'}`],
        ],
      },

      layout: 'noBorders',
    }
  }

  const docDefinition: any = {
    pageSize: 'A4',

    pageMargins: [30, 30, 30, 30],

    footer: (currentPage: number, pageCount: number) => ({
      margin: [30, 0, 30, 10],

      columns: [
        {
          text: `Dicetak ${format(new Date(), 'dd MMMM yyyy HH:mm', {
            locale: id,
          })}`,
          fontSize: 8,
        },

        {
          text: `Halaman ${currentPage} dari ${pageCount}`,
          alignment: 'right',
          fontSize: 8,
        },
      ],
    }),

    content: [
      buildEventInfo(detail),
      {
        text: 'DOKUMENTASI KEGIATAN',
        fontSize: 16,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20],
      },

      ...createDocumentationContent(images),
    ],
  }

  return { docDefinition }
}
