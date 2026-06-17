import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'

import type { ILetterAssignment } from '../data/types'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

interface Props {
  data: ILetterAssignment
  base64Logo: string
  kop_surat: ILetterHeader
}

/**
 * Membuat numbered list sebagai inner table (mengikuti pola contoh code).
 */
function numberedTable(items: string[]) {
  if (!items || items.length === 0) return { text: '-' }
  return {
    table: {
      widths: ['3%', '*'] as string[],
      body: items.map((item, i) => [
        { text: `${i + 1}.`, alignment: 'left' as const },
        { text: item },
      ]),
    },
    layout: 'noBorders' as const,
  }
}

export const GenerateAssignmentLetter = ({
  data,
  kop_surat,
  base64Logo,
}: Props): TDocumentDefinitions => {
  const tanggalSurat = format(new Date(data.tanggal_surat), 'dd MMMM yyyy', { locale: id })
  const tanggalMulai = format(new Date(data.tanggal_mulai), 'dd MMMM yyyy', { locale: id })
  const tanggalAkhir = format(new Date(data.tanggal_akhir), 'dd MMMM yyyy', { locale: id })

  // ─── Tabel Pegawai ───
  const employeeHeader = [
    { text: 'No', bold: true, alignment: 'center' as const },
    { text: 'NIK/NIP', bold: true, alignment: 'center' as const },
    { text: 'Nama', bold: true, alignment: 'center' as const },
    { text: 'Jabatan', bold: true, alignment: 'center' as const },
  ]

  const employeeBody = data.pegawai.map((pegawai, index) => [
    { text: String(index + 1), alignment: 'center' as const },
    { text: pegawai.nik || pegawai.nip || '-' },
    { text: pegawai.nama_lengkap },
    { text: pegawai.jabatan_pegawai || '-' },
  ])

  // ─── Sembunyikan baris NIP jika kosong ───
  const ttdItems: any[] = [
    // Tempat & Tanggal
    {
      table: {
        widths: ['35%', '*'] as string[],
        body: [
          [
            { text: 'Dikeluarkan di', fontSize: 10 },
            { text: `: ${data.tempat_kegiatan}`, fontSize: 10 },
          ],
          [
            { text: 'Pada Tanggal', fontSize: 10 },
            { text: `: ${tanggalSurat}`, fontSize: 10 },
          ],
        ],
      },
      layout: 'noBorders' as const,
      margin: [0, 0, 0, 5] as [number, number, number, number],
    },
    // Separator
    {
      canvas: [
        { type: 'line' as const, x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 0.5 },
      ],
      margin: [0, 0, 0, 5] as [number, number, number, number],
    },
    // Jabatan penandatangan
    {
      text: data.nama_jabatan_struktural ?? 'Pejabat Yang Menugaskan',
      bold: true,
      fontSize: 10,
      margin: [0, 0, 0, 70] as [number, number, number, number],
    },
    // Nama penandatangan (bold, underline)
    {
      text: data.nama_disahkan_oleh,
      bold: true,
      fontSize: 10,
      decoration: 'underline' as const,
    },
  ]

  // NIP (hanya jika ada)
  if (data.nip && data.nip.trim() !== '') {
    ttdItems.push({
      text: `NIP. ${data.nip}`,
      fontSize: 10,
      margin: [0, 2, 0, 0] as [number, number, number, number],
    })
  }

  return {
    pageSize: 'A4',
    pageMargins: [40, 25, 40, 40],

    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.25,
    },

    content: [
      // ═══════════ KOP SURAT (shared helper) ═══════════
      ...(buildKopSuratContent(kop_surat as any, base64Logo) ?? []),

      // ═══════════ JUDUL & NOMOR ═══════════
      {
        text: 'SURAT TUGAS',
        alignment: 'center' as const,
        bold: true,
        fontSize: 12,
        decoration: 'underline',
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },
      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center' as const,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════════ DASAR (table + numbered list) ═══════════
      {
        table: {
          widths: ['10%', '*'] as string[],
          body: [
            [
              { text: 'Dasar :' },
              numberedTable(data.dasar_surat_tugas),
            ],
          ],
        },
        layout: 'noBorders' as const,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════════ MEMBERI TUGAS ═══════════
      {
        text: 'MEMBERI TUGAS',
        alignment: 'center' as const,
        bold: true,
        fontSize: 12,
        margin: [0, 0, 0, 12] as [number, number, number, number],
      },

      // ═══════════ KEPADA (tabel pegawai) ═══════════
      {
        text: 'Kepada :',
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },
      {
        table: {
          headerRows: 1,
          widths: ['5%', '25%', '35%', '35%'] as string[],
          body: [employeeHeader, ...employeeBody],
        },
        fontSize: 10,
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          hLineColor: () => '#CFCFCF',
          vLineColor: () => '#CFCFCF',
          paddingTop: () => 5,
          paddingBottom: () => 5,
        },
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════════ UNTUK (table + numbered list) ═══════════
      {
        table: {
          widths: ['10%', '*'] as string[],
          body: [
            [
              { text: 'Untuk :' },
              numberedTable(data.kegiatan),
            ],
          ],
        },
        layout: 'noBorders' as const,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════════ TEMPAT & TANGGAL ═══════════
      {
        text: `Tempat Kegiatan : ${data.tempat_kegiatan}`,
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },

      ...(tanggalMulai === tanggalAkhir
        ? [
            {
              text: `Surat tugas ini berlaku pada tanggal ${tanggalMulai}.`,
              margin: [0, 0, 0, 5] as [number, number, number, number],
            },
          ]
        : [
            {
              text: `Surat tugas ini berlaku dari tanggal ${tanggalMulai} sampai tanggal ${tanggalAkhir}.`,
              margin: [0, 0, 0, 5] as [number, number, number, number],
            },
          ]),

      {
        text: 'Demikian surat tugas ini dibuat untuk dilaksanakan sebagaimana mestinya.',
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════════ TTD ═══════════
      {
        columns: [
          { width: '*', text: '' },
          {
            width: '40%',
            stack: ttdItems,
            alignment: 'left' as const,
          },
        ],
        columnGap: 0,
      },
    ],
  }
}
