import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { PrintExpenditure } from '@/pages/modules/E-Office/event-activity/event-data/detail/component/expenditure/printExpenditure/types.ts'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

export const formatCurrency = (value: string | number) => {
  return Number(value || 0).toLocaleString('id-ID')
}
interface props {
  data: PrintExpenditure
  logoBase64?: string
  event: IEvent
}

export const GenerateExpenditurePdf = (props: props): TDocumentDefinitions => {
  const { data, logoBase64, event } = props
  const { cetak_config, pengeluaran } = data

  const kop = cetak_config.kop_surat

  const totalPengeluaran = pengeluaran.reduce(
    (total, item) => total + Number(item.jumlah_pengeluaran || 0),
    0
  )

  const body: any[] = [
    [
      { text: 'No.', bold: true, alignment: 'center' },
      { text: 'Uraian', bold: true, alignment: 'center' },
      { text: 'Tanggal', bold: true, alignment: 'center' },
      { text: 'Dibayarkan', bold: true, alignment: 'center' },
      { text: 'Penerima', bold: true, alignment: 'center' },
      { text: 'Jumlah', bold: true, alignment: 'center' },
    ],
    [
      { text: '1', alignment: 'center', color: '#666' },
      { text: '2', alignment: 'center', color: '#666' },
      { text: '3', alignment: 'center', color: '#666' },
      { text: '4', alignment: 'center', color: '#666' },
      { text: '5', alignment: 'center', color: '#666' },
      { text: '6', alignment: 'center', color: '#666' },
    ],
  ]

  pengeluaran.forEach((item, index) => {
    body.push([
      {
        text: index + 1,
        alignment: 'center',
      },
      {
        text: item.uraian_pengeluaran,
      },
      {
        text: format(new Date(item.tanggal_pengeluaran), 'dd-MM-yyyy'),
        alignment: 'center',
      },
      {
        text: item.yang_membayar,
      },
      {
        text: item.tempat_pembelian,
      },
      {
        text: formatCurrency(item.jumlah_pengeluaran),
        alignment: 'right',
      },
    ])
  })

  body.push([
    {
      text: 'Jumlah Pengeluaran',
      colSpan: 5,
      alignment: 'right',
      bold: true,
      margin: [0, 5, 10, 5],
    },
    {},
    {},
    {},
    {},
    {
      text: formatCurrency(totalPengeluaran),
      bold: true,
      alignment: 'right',
    },
  ])

  return {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    pageMargins: [30, 30, 30, 40],
    // pageOrientation: cetak_config.hasil_cetak === 'LANDSCAPE' ? 'landscape' : 'portrait',

    footer: (currentPage, pageCount) => ({
      margin: [30, 5],
      columns: [
        {
          text: `Dicetak pada ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`,
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
      // KOP SURAT (shared helper)
      ...(buildKopSuratContent(kop as any, logoBase64) ?? []),

      // JUDUL
      {
        text: 'DAFTAR PENGELUARAN',
        alignment: 'center',
        bold: true,
        fontSize: 16,
        margin: [0, 0, 0, 10],
      },

      {
        text: event.nama_kegiatan ?? '',
        alignment: 'center',
        bold: true,
        fontSize: 12,
        margin: [0, 0, 0, 5],
      },

      {
        text: event.tanggal_mulai
          ? `TANGGAL : ${format(new Date(event.tanggal_mulai), 'dd MMMM yyyy', {
              locale: id,
            }).toUpperCase()}`
          : '',
        alignment: 'center',
        bold: true,
        margin: [0, 0, 0, 20],
      },

      // TABEL
      {
        table: {
          headerRows: 2,
          widths: [25, '*', 70, 100, '*', 90],
          body,
        },

        layout: {
          fillColor: (rowIndex) => {
            if (rowIndex === 0) return '#F5F5F5'
            if (rowIndex === body.length - 1) return '#F5F5F5'
            return null
          },

          hLineColor: () => '#BDBDBD',
          vLineColor: () => '#BDBDBD',

          paddingTop: () => 5,
          paddingBottom: () => 5,
          paddingLeft: () => 5,
          paddingRight: () => 5,
        },
      },
    ],

    defaultStyle: {
      fontSize: 10,
    },
  }
}
