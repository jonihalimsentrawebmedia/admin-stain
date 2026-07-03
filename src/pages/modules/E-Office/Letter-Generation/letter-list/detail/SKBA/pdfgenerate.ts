import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISKBALetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBA/types.ts'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import htmlToPdfmake from 'html-to-pdfmake'
import DOMPurify from 'dompurify'

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  try {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}

interface IGenerateLetterSKBA {
  logo?: string
  data: ISKBALetter
  header: ILetterHeader
}

const buildPenutup = (penutup: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(penutup || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya.',
        alignment: 'justify' as const,
        margin: [0, 15, 0, 30] as [number, number, number, number],
      },
    ]
  }

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    fontSize: 12,
    alignment: 'justify' as const,
    margin: [0, 15, 0, 30] as [number, number, number, number],
  }))
}

export const GenerateSKBALetter = ({
  logo,
  data,
  header,
}: IGenerateLetterSKBA): TDocumentDefinitions => {
  const tempatTanggal = `${data.tempat_surat || ''}, ${formatDate(data.tanggal_surat)}`.trim()
  const kopContent = buildKopSuratContent(header, logo)

  return {
    pageSize: 'A4',
    pageMargins: [40, 20, 40, 20],

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 12,
      alignment: 'justify',
      lineHeight: 1.2,
    },

    content: [
      // =========================
      // KOP SURAT (shared)
      // =========================
      ...(kopContent ?? []),

      // =========================
      // JUDUL
      // =========================

      {
        text: 'Surat Keterangan Bebas Akademik',
        alignment: 'center',
        bold: true,
        fontSize: 15,
        margin: [0, 0, 0, 5],
      },

      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center',
        bold: false,
        margin: [0, 0, 0, 5],
      },

      // =========================
      // IDENTITAS PENANDATANGAN
      // =========================

      {
        margin: [0, 0, 0, 5],
        text: 'Yang bertanda tangan di bawah ini:',
      },

      {
        table: {
          widths: [80, 5, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_penandatangan],
            [{ text: 'Jabatan', bold: true }, ':', data.jabatan_penandatangan],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 5],
      },

      {
        text: 'Dengan ini menerangkan bahwa:',
        margin: [0, 0, 0, 5],
      },

      // =========================
      // IDENTITAS MAHASISWA
      // =========================

      {
        table: {
          widths: [80, 5, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_mahasiswa],
            [{ text: 'NPM/NIM', bold: true }, ':', data.nim],
            [{ text: 'Program Studi', bold: true }, ':', data.nama_prodi],
            [{ text: 'Fakultas', bold: true }, ':', data.nama_fakultas],
            [{ text: 'Jenjang', bold: true }, ':', `${data.kode_jenjang} - ${data.nama_jenjang}`],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 5],
      },

      // =========================
      // ISI
      // =========================

      {
        alignment: 'justify',
        margin: [0, 0, 0, 5],

        text: [
          'Berdasarkan hasil pemeriksaan administrasi akademik, mahasiswa tersebut di atas ',

          {
            text: 'dinyatakan telah memenuhi seluruh kewajiban administrasi akademik',
            bold: true,
          },

          ', dengan ketentuan sebagai berikut:',
        ],
      },

      // =========================
      // DAFTAR KEWAJIBAN
      // =========================

      {
        margin: [20, 0, 0, 5],

        ol: data.daftar_kewajiban_akademik.map((item) => ({
          text: item,
          alignment: 'justify',
        })),
      },

      // =========================
      // PERNYATAAN
      // =========================

      {
        alignment: 'justify',
        margin: [0, 0, 0, 5],

        text: [
          'Dengan demikian, mahasiswa yang bersangkutan ',

          {
            text: 'DINYATAKAN BEBAS AKADEMIK',
            bold: true,
          },

          ' dan tidak memiliki tanggungan administrasi akademik pada ',

          {
            text: 'Sekolah Tinggi Agama Islam Negeri Mandailing Natal',
            bold: true,
          },

          '.',
        ],
      },

      // =========================
      // TUJUAN
      // =========================

      {
        text: 'Surat keterangan ini diterbitkan sebagai salah satu persyaratan untuk:',
        margin: [0, 0, 0, 5],
      },

      {
        margin: [20, 0, 0, 5],

        ul: data.tujuan_pembuatan_surat.map((item) => ({
          text: item,
        })),
      },

      // =========================
      // PENUTUP
      // =========================

      ...buildPenutup(data.penutup),

      // =========================
      // TANDA TANGAN
      // =========================

      {
        margin: [310, 5, 0, 0],

        width: 200,

        stack: [
          {
            text: tempatTanggal,
            bold: true,
            alignment: 'left',
          },

          {
            margin: [0, 10, 0, 0],

            text: data.jabatan_penandatangan,
            bold: true,
            alignment: 'left',
          },

          {
            text: data.nama_satuan_kerja_penandatangan,
            alignment: 'left',
          },

          {
            text: '\n\n\n',
          },

          {
            text: data.nama_penandatangan,
            bold: true,
            decoration: 'underline',
            alignment: 'left',
          },

          {
            text: `NIP/NIDN\n${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
            bold: true,
            alignment: 'left',
          },
        ],
      },
    ],
  }
}
