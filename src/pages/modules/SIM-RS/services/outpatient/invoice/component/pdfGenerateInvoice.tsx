import { format } from 'date-fns'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake from '@/utils/pdfmake.ts'
import type { IInvoiceOutPatient } from '../../data/types'

function formatRupiah(value?: string | number) {
  const amount = Number(value ?? 0)
  if (Number.isNaN(amount)) return String(value ?? '-')
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount)
}

function statusLabel(status?: string) {
  if (status === 'SELESAI') return 'Selesai'
  if (status === 'MENUNGGU') return 'Menunggu'
  if (status === 'DIPANGGIL') return 'Dipanggil'
  return 'Dibatalkan'
}

const infoRow = (label: string, value?: string | null) => [
  { text: label, bold: true, color: '#6b7280' },
  { text: value || '-' },
]

const m = (top: number, right: number, bottom: number, left: number): [number, number, number, number] => [top, right, bottom, left]

const tableLayout = {
  hLineWidth: () => 0.8,
  vLineWidth: () => 0.8,
  hLineColor: () => '#111111',
  vLineColor: () => '#111111',
  paddingLeft: () => 8,
  paddingRight: () => 8,
  paddingTop: () => 6,
  paddingBottom: () => 6,
}

export function GeneratePdfInvoice(invoice: IInvoiceOutPatient) {
  const hasDaftarTagihan = (invoice.daftar_tagihan ?? []).length > 0
  const hasRingkasan = (invoice.ringkasan?.detail_pembayaran ?? []).length > 0

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [48, 48, 48, 48],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 12,
    },
    info: {
      title: `TAGIHAN_${invoice.no_pendaftaran}`,
      author: 'Admin Web',
      subject: 'Tagihan Rawat Jalan',
      keywords: 'tagihan, invoice, rawat jalan',
      creator: 'Admin Web',
      producer: 'Admin Web',
    },
    content: [
      {
        columns: [
          { width: 120, text: 'TAGIHAN', fontSize: 12, bold: true, color: '#0E874E' },
          {
            width: '*',
            text: 'RAWAT JALAN',
            fontSize: 12,
            bold: true,
            color: '#0E874E',
            alignment: 'right',
          },
        ],
        margin: m(0, 0, 0, 20),
      },

      { text: 'Informasi Registrasi', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
      {
        table: {
          widths: [170, '*', 170, '*'],
          body: [
            [
              ...infoRow('No. Pendaftaran', invoice.no_pendaftaran),
              ...infoRow('No. Rekam Medis', invoice.no_rekam_medis),
            ],
            [
              ...infoRow('Nama Pasien', invoice.nama_pasien),
              ...infoRow('Poli', invoice.nama_poli),
            ],
            [
              ...infoRow('Nama Dokter', invoice.nama_dokter),
              ...infoRow(
                'Tanggal Pendaftaran',
                invoice.tanggal_pendaftaran
                  ? format(new Date(invoice.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')
                  : '-'
              ),
            ],
            [
              { text: 'Status', bold: true, color: '#6b7280' },
              { text: statusLabel(invoice.status) },
              { text: '' },
              { text: '' },
            ],
          ],
        },
        layout: 'noBorders',
        margin: m(0, 0, 0, 20),
      },

      ...(hasDaftarTagihan
        ? [
            { text: 'Daftar Tagihan', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: [32, 90, '*', 55, 85, 95],
                body: [
                  [
                    { text: 'No', bold: true, alignment: 'center' },
                    { text: 'Komponen', bold: true, alignment: 'center' },
                    { text: 'Nama', bold: true, alignment: 'center' },
                    { text: 'Jumlah', bold: true, alignment: 'center' },
                    { text: 'Harga', bold: true, alignment: 'center' },
                    { text: 'Subtotal', bold: true, alignment: 'center' },
                  ],
                  ...invoice.daftar_tagihan.map((item, index) => [
                    { text: String(index + 1), alignment: 'center' },
                    item.komponen || '-',
                    item.nama || '-',
                    { text: String(item.jumlah), alignment: 'center' },
                    { text: formatRupiah(item.harga), alignment: 'right' },
                    { text: formatRupiah(item.subtotal), alignment: 'right' },
                  ]),
                  [
                    { text: 'Total', colSpan: 5, bold: true, alignment: 'right' },
                    {},
                    {},
                    {},
                    {},
                    { text: formatRupiah(invoice.total_tagihan), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 20),
            },
          ]
        : []),

      ...(hasRingkasan
        ? [
            { text: 'Ringkasan Pembayaran', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: ['*', 70, 140],
                body: [
                  [
                    { text: 'Sumber Biaya Pengobatan', bold: true, alignment: 'center' },
                    { text: '(%)', bold: true, alignment: 'center' },
                    { text: 'Jlh. Dibayar', bold: true, alignment: 'center' },
                  ],
                  ...invoice.ringkasan.detail_pembayaran.map((item) => [
                    item.nama_sumber_biaya || '-',
                    { text: `${item.persentase ?? 0}`, alignment: 'center' },
                    { text: formatRupiah(item.jumlah), alignment: 'right' },
                  ]),
                  [
                    { text: 'Total Tagihan', colSpan: 2, bold: true, alignment: 'right' },
                    {},
                    { text: formatRupiah(invoice.ringkasan.total_tagihan), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 48),
            },
          ]
        : []),

      {
        columns: [
          {
            width: '45%',
            stack: [
              { text: 'Pasien', alignment: 'center' },
              { text: '\n\n\n\n........................', alignment: 'center' },
            ],
          },
          { text: '', width: '*' },
          {
            width: '45%',
            stack: [
              { text: 'Petugas', alignment: 'center' },
              { text: '\n\n\n\n.....................', alignment: 'center' },
            ],
          },
        ],
      },
    ],
  }

  return pdfMake.createPdf(docDefinition as TDocumentDefinitions)
}
