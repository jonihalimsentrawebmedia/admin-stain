import { format } from 'date-fns'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake from '@/utils/pdfmake.ts'
import type { IInvoiceInPatient } from '../types'

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

function formatDate(value?: string | null) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '-'
  return format(date, 'dd-MM-yyyy HH:mm')
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

const m = (
  top: number,
  right: number,
  bottom: number,
  left: number
): [number, number, number, number] => [top, right, bottom, left]

const tableLayout = {
  hLineWidth: () => 0.4,
  vLineWidth: () => 0.4,
  hLineColor: () => '#111111',
  vLineColor: () => '#111111',
  paddingLeft: () => 4,
  paddingRight: () => 4,
  paddingTop: () => 3,
  paddingBottom: () => 3,
}

export function GeneratePdfInvoiceInPatient(invoice: IInvoiceInPatient) {
  const totalRuangan = (invoice.informasi_ruangan ?? []).reduce(
    (sum, r) => sum + (r.lama_dirawat ?? 0) * r.harga_per_hari,
    0
  )
  const totalTindakan = (invoice.daftar_tindakan ?? []).reduce((sum, t) => sum + (t.harga ?? 0), 0)
  const totalObat = (invoice.daftar_obat ?? []).reduce((sum, o) => sum + (o.total ?? 0), 0)
  const totalRingkasan = (invoice.ringkasan_perawatan ?? []).reduce(
    (sum, r) => sum + (r.harga ?? 0),
    0
  )
  const grandTotal =
    invoice.ringkasan?.total_tagihan ?? totalRuangan + totalRingkasan + totalTindakan + totalObat
  const hasRuangan = (invoice.informasi_ruangan ?? []).length > 0
  const hasRingkasanPerawatan = (invoice.ringkasan_perawatan ?? []).length > 0
  const hasTindakan = (invoice.daftar_tindakan ?? []).length > 0
  const hasObat = (invoice.daftar_obat ?? []).length > 0
  const hasRingkasanPembayaran = (invoice.ringkasan?.detail_pembayaran ?? []).length > 0

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [20, 20, 20, 20],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 10,
    },
    info: {
      title: `TAGIHAN_${invoice.no_pendaftaran}`,
      author: 'Admin Web',
      subject: 'Tagihan Rawat Inap',
      keywords: 'tagihan, invoice, rawat inap',
      creator: 'Admin Web',
      producer: 'Admin Web',
    },
    content: [
      {
        columns: [
          { width: 120, text: 'TAGIHAN', fontSize: 12, bold: true, color: '#0E874E' },
          {
            width: '*',
            text: 'RAWAT INAP',
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
            [...infoRow('Nama Pasien', invoice.nama_pasien), ...infoRow('Poli', invoice.nama_poli)],
            [
              ...infoRow('Nama Dokter', invoice.nama_dokter),
              ...infoRow('Tanggal Pendaftaran', formatDate(invoice.tanggal_pendaftaran)),
            ],
            [
              ...infoRow('Status', statusLabel(invoice.status)),
              ...infoRow('Tanggal Selesai', formatDate(invoice.tanggal_selesai)),
            ],
          ],
        },
        layout: 'noBorders',
        margin: m(0, 0, 0, 20),
      },

      ...(hasRuangan
        ? [
            { text: 'Informasi Ruangan', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: [28, 72, 55, 78, 78, 35, 72, 76],
                body: [
                  [
                    { text: 'No', bold: true, alignment: 'center' },
                    { text: 'Ruangan', bold: true, alignment: 'center' },
                    { text: 'Jenis', bold: true, alignment: 'center' },
                    { text: 'Tanggal Masuk', bold: true, alignment: 'center' },
                    { text: 'Tanggal Keluar', bold: true, alignment: 'center' },
                    { text: 'Lama (Hari)', bold: true, alignment: 'center' },
                    { text: 'Harga/Hari', bold: true, alignment: 'center' },
                    { text: 'Total Biaya', bold: true, alignment: 'center' },
                  ],
                  ...(invoice.informasi_ruangan ?? []).map((item, index) => [
                    { text: String(index + 1), alignment: 'center' },
                    `${item.nama_ruangan} (${item.nomor_ruangan})`,
                    item.nama_jenis_ruangan || '-',
                    { text: formatDate(item.tanggal_masuk), alignment: 'center' },
                    { text: formatDate(item.tanggal_keluar), alignment: 'center' },
                    { text: String(item.lama_dirawat ?? '-'), alignment: 'center' },
                    { text: formatRupiah(item.harga_per_hari), alignment: 'right' },
                    {
                      text: formatRupiah((item.lama_dirawat ?? 0) * item.harga_per_hari),
                      alignment: 'right',
                    },
                  ]),
                  [
                    { text: 'Total Ruangan', colSpan: 7, bold: true, alignment: 'right' },
                    {},
                    {},
                    {},
                    {},
                    {},
                    {},
                    { text: formatRupiah(totalRuangan), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 20),
            },
          ]
        : []),

      ...(hasRingkasanPerawatan
        ? [
            { text: 'Ringkasan Perawatan', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: [30, 90, 90, '*', 100],
                body: [
                  [
                    { text: 'No', bold: true, alignment: 'center' },
                    { text: 'Tanggal', bold: true, alignment: 'center' },
                    { text: 'Kode', bold: true, alignment: 'center' },
                    { text: 'Nama', bold: true, alignment: 'center' },
                    { text: 'Harga', bold: true, alignment: 'center' },
                  ],
                  ...(invoice.ringkasan_perawatan ?? []).map((item, index) => [
                    { text: String(index + 1), alignment: 'center' },
                    { text: formatDate(item.tanggal), alignment: 'center' },
                    item.kode || '-',
                    item.nama || '-',
                    { text: formatRupiah(item.harga), alignment: 'right' },
                  ]),
                  [
                    {
                      text: 'Total Ringkasan Perawatan',
                      colSpan: 4,
                      bold: true,
                      alignment: 'right',
                    },
                    {},
                    {},
                    {},
                    { text: formatRupiah(totalRingkasan), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 20),
            },
          ]
        : []),

      ...(hasTindakan
        ? [
            { text: 'Daftar Tindakan', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: [30, 90, 90, '*', 100],
                body: [
                  [
                    { text: 'No', bold: true, alignment: 'center' },
                    { text: 'Tanggal', bold: true, alignment: 'center' },
                    { text: 'Kode', bold: true, alignment: 'center' },
                    { text: 'Nama Tindakan', bold: true, alignment: 'center' },
                    { text: 'Harga', bold: true, alignment: 'center' },
                  ],
                  ...(invoice.daftar_tindakan ?? []).map((item, index) => [
                    { text: String(index + 1), alignment: 'center' },
                    { text: formatDate(item.tanggal), alignment: 'center' },
                    item.kode || '-',
                    item.nama || '-',
                    { text: formatRupiah(item.harga), alignment: 'right' },
                  ]),
                  [
                    { text: 'Total Tindakan', colSpan: 4, bold: true, alignment: 'right' },
                    {},
                    {},
                    {},
                    { text: formatRupiah(totalTindakan), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 20),
            },
          ]
        : []),

      ...(hasObat
        ? [
            { text: 'Daftar Obat', bold: true, fontSize: 12, margin: m(0, 0, 0, 8) },
            {
              table: {
                headerRows: 1,
                widths: [30, '*', 60, 50, 80, 80],
                body: [
                  [
                    { text: 'No', bold: true, alignment: 'center' },
                    { text: 'Nama Obat', bold: true, alignment: 'center' },
                    { text: 'Satuan', bold: true, alignment: 'center' },
                    { text: 'Jumlah', bold: true, alignment: 'center' },
                    { text: 'Harga Satuan', bold: true, alignment: 'center' },
                    { text: 'Total', bold: true, alignment: 'center' },
                  ],
                  ...(invoice.daftar_obat ?? []).map((item, index) => [
                    { text: String(index + 1), alignment: 'center' },
                    item.nama_obat || '-',
                    { text: item.satuan || '-', alignment: 'center' },
                    { text: String(item.jumlah ?? 0), alignment: 'center' },
                    { text: formatRupiah(item.harga_satuan), alignment: 'right' },
                    { text: formatRupiah(item.total), alignment: 'right' },
                  ]),
                  [
                    { text: 'Total Obat', colSpan: 5, bold: true, alignment: 'right' },
                    {},
                    {},
                    {},
                    {},
                    { text: formatRupiah(totalObat), bold: true, alignment: 'right' },
                  ],
                ],
              },
              layout: tableLayout,
              margin: m(0, 0, 0, 20),
            },
          ]
        : []),

      ...(hasRingkasanPembayaran
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
                  ...(invoice.ringkasan?.detail_pembayaran ?? []).map((item) => [
                    item.nama_sumber_biaya || '-',
                    { text: String(item.persentase ?? 0), alignment: 'center' },
                    { text: formatRupiah(item.jumlah), alignment: 'right' },
                  ]),
                  [
                    { text: 'Grand Total', colSpan: 2, bold: true, alignment: 'right' },
                    {},
                    { text: formatRupiah(grandTotal), bold: true, alignment: 'right' },
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
