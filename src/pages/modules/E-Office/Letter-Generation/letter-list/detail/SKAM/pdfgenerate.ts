import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISKAMLettter } from './types.ts'
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

interface IGenerateLetterSKAM {
  logo?: string
  data: ISKAMLettter
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

export const GenerateLetterSKAM = ({
  logo,
  data,
  header,
}: IGenerateLetterSKAM): TDocumentDefinitions => {
  const tempatTanggal = `${data.tempat_surat || ''}, ${formatDate(data.tanggal_surat)}`.trim()
  const kopContent = buildKopSuratContent(header, logo)

  return {
    pageSize: 'A4',
    pageMargins: [20, 30, 30, 20],

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 12,
      alignment: 'justify',
      lineHeight: 1.35,
    },

    content: [
      ...(kopContent ?? []),

      {
        text: 'Surat Keterangan Aktif Kuliah',
        alignment: 'center',
        bold: true,
        fontSize: 15,
        margin: [0, 0, 0, 5],
      },

      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center',
        bold: false,
        margin: [0, 0, 0, 10],
      },

      {
        text: 'Yang bertanda tangan di bawah ini:',
        margin: [0, 0, 0, 10],
      },

      {
        table: {
          widths: [95, 10, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_penandatangan],
            [
              { text: 'NIP/NIDN', bold: true },
              ':',
              `${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
            ],
            [{ text: 'Jabatan', bold: true }, ':', data.jabatan_penandatangan],
            [
              { text: 'Universitas', bold: true },
              ':',
              data.nama_satuan_kerja_penandatangan,
            ],
          ],
        },
        layout: 'noBorders',
      },

      {
        text: 'Dengan ini menerangkan bahwa:',
        margin: [0, 15, 0, 10],
      },

      {
        table: {
          widths: [95, 10, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_mahasiswa],
            [{ text: 'NPM/NIM', bold: true }, ':', data.nim],
            [
              { text: 'Program Studi', bold: true },
              ':',
              data.nama_prodi || '-',
            ],
            [
              { text: 'Fakultas', bold: true },
              ':',
              data.nama_fakultas || '-',
            ],
            [{ text: 'Jenjang', bold: true }, ':', data.nama_jenjang || '-'],
            [
              { text: 'Semester', bold: true },
              ':',
              data.semester_masuk_label || String(data.semester_masuk),
            ],
            [
              { text: 'Tahun Akademik', bold: true },
              ':',
              data.tahun_akademik,
            ],
          ],
        },
        layout: 'noBorders',
      },

      {
        margin: [0, 12, 0, 0],
        alignment: 'justify',
        text: [
          'Adalah benar mahasiswa ',
          {
            text: data.nama_satuan_kerja_penandatangan,
            bold: true,
          },
          ' yang hingga saat ini diterbitkan masih ',
          {
            text: 'berstatus Aktif',
            bold: true,
          },
          ' dan terdaftar sebagai mahasiswa pada semester tersebut.',
        ],
      },

      {
        text: `Surat keterangan ini dibuat untuk keperluan : ${data.keperluan_surat}.`,
        alignment: 'justify',
        margin: [0, 10, 0, 0],
      },

      ...buildPenutup(data.penutup),

      {
        table: {
          widths: ['*', 200],
          body: [
            [
              '',
              {
                stack: [
                  {
                    text: tempatTanggal,
                  },
                  {
                    text: data.jabatan_penandatangan,
                    bold: true,
                    margin: [0, 0, 0, 50],
                  },
                  {
                    text: data.nama_penandatangan,
                    bold: true,
                  },
                  {
                    text: `NIP/NIDN.\n${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
                    bold: true,
                  },
                ],
              },
            ],
          ],
        },
        layout: 'noBorders',
      },
    ],
  }
}
