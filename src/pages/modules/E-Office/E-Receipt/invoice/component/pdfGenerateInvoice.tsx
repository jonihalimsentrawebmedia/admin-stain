import type { IReconciliation } from '@/pages/modules/E-Office/E-Receipt/invoice/data/types.ts'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake from '@/utils/pdfmake.ts'

function formatCurrency(value?: string | number) {
  const amount = Number(value ?? 0)
  if (Number.isNaN(amount)) return String(value || '-')
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function getJumlah(banyak: number, hargaSatuan: number) {
  return Number(banyak || 0) * Number(hargaSatuan || 0)
}

export function GeneratePdfInvoice(reconciliation: IReconciliation) {
  const { kwitansi, items } = reconciliation
  const total = items.reduce((sum, item) => sum + getJumlah(item.banyak, item.harga_satuan), 0)

  const docDefinition = {
    pageSize: 'A4' as const,
    pageMargins: [48, 48, 48, 48] as [number, number, number, number],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 11,
    },
    content: [
      {
        columns: [
          { text: '', width: '*' },
          {
            width: 190,
            stack: [
              { text: `Kepada : ${kwitansi.nama_penerima || '-'}` },
              { text: `Nota No : ${kwitansi.no_kwitansi || kwitansi.id_kwitansi}` },
            ],
          },
        ],
        margin: [0, 0, 0, 28] as [number, number, number, number],
      },
      {
        table: {
          widths: [72, '*', 110, 110],
          headerRows: 1,
          body: [
            [
              { text: 'Banyaknya', bold: true, alignment: 'center' },
              { text: 'Nama Barang', bold: true, alignment: 'center' },
              { text: 'Harga', bold: true, alignment: 'center' },
              { text: 'Jumlah', bold: true, alignment: 'center' },
            ],
            ...items.map((item) => [
              { text: String(item.banyak), alignment: 'center' },
              item.nama_barang || '-',
              { text: formatCurrency(item.harga_satuan), alignment: 'right' },
              { text: formatCurrency(getJumlah(item.banyak, item.harga_satuan)), alignment: 'right' },
            ]),
            [
              { text: 'Total', colSpan: 3, bold: true, alignment: 'right' },
              {},
              {},
              { text: formatCurrency(total), bold: true, alignment: 'right' },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.8,
          vLineWidth: () => 0.8,
          hLineColor: () => '#111111',
          vLineColor: () => '#111111',
          paddingLeft: () => 8,
          paddingRight: () => 8,
          paddingTop: () => 8,
          paddingBottom: () => 8,
        },
        margin: [0, 0, 0, 64] as [number, number, number, number],
      },
      {
        columns: [
          {
            width: '45%',
            stack: [
              { text: 'Tanda Terima', alignment: 'center' },
              { text: '\n\n\n\n........................', alignment: 'center' },
            ],
          },
          { text: '', width: '*' },
          {
            width: '45%',
            stack: [
              { text: 'Hormat Kami,', alignment: 'center' },
              { text: '\n\n\n\n.....................', alignment: 'center' },
            ],
          },
        ],
      },
    ],
    info: {
      title: `FAKTUR_${kwitansi.no_kwitansi || kwitansi.id_kwitansi}`,
      author: 'Admin Web',
      subject: 'Faktur Kwitansi',
      keywords: 'faktur, kwitansi, invoice',
      creator: 'Admin Web',
      producer: 'Admin Web',
    },
  }

  return pdfMake.createPdf(docDefinition as TDocumentDefinitions)
}
