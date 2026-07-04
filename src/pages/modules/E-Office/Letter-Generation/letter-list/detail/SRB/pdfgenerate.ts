import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISRBLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SRB/types.ts'
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

interface IGenerateLetterSRB {
  logo?: string
  data: ISRBLetter
  header: ILetterHeader
}

const buildPenutup = (penutup: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(penutup || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Demikian surat rekomendasi ini dibuat agar dapat dipergunakan sebagaimana mestinya.',
        alignment: 'justify' as const,
        margin: [0, 5, 0, 5] as [number, number, number, number],
      },
    ]
  }

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    fontSize: 12,
    alignment: 'justify' as const,
    margin: [0, 5, 0, 5] as [number, number, number, number],
  }))
}

export const GenerateSRBLetter = ({
  logo,
  data,
  header,
}: IGenerateLetterSRB): TDocumentDefinitions => {
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
      ...(kopContent ?? []),

      // =========================
      // JUDUL
      // =========================

      {
        text: 'Surat Rekomendasi Beasiswa',
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
        text: 'Yang bertanda tangan di bawah ini:',
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: [80, 5, '*'],

          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_penandatangan],

            [
              { text: 'NIP/NIDN', bold: true },
              ':',
              `${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
            ],

            [{ text: 'Jabatan', bold: true }, ':', data.jabatan_penandatangan],

            [{ text: 'Program Studi', bold: true }, ':', data.nama_prodi],

            [{ text: 'Universitas', bold: true }, ':', data.nama_satuan_kerja_penandatangan],
          ],
        },

        layout: 'noBorders',
      },

      {
        text: 'Dengan ini menerangkan bahwa:',
        margin: [0, 5, 0, 5],
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

            [{ text: 'Program Studi', bold: true }, ':', data.nama_prodi || '-'],

            [{ text: 'Fakultas', bold: true }, ':', data.nama_fakultas || '-'],

            [{ text: 'Jenjang', bold: true }, ':', `${data.kode_jenjang} - ${data.nama_jenjang}`],

            [
              { text: 'Semester', bold: true },
              ':',
              `${new Date().getFullYear() - Number(data.angkatan) + 1}`,
            ],

            [{ text: 'IPK', bold: true }, ':', data.ipk],
          ],
        },

        layout: 'noBorders',
      },

      ...buildPenutup(data.penutup),

      // =========================
      // TANDA TANGAN
      // =========================

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
                    text: 'Yang Memberikan Rekomendasi,',
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
