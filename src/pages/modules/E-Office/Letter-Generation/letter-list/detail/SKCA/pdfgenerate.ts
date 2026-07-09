import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISKCALetter } from './types.ts'
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

interface IGenerateLetterSKCA {
  logo?: string
  data: ISKCALetter
  header: ILetterHeader
}

const buildPenutup = (penutup: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(penutup || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Demikian surat keterangan ini dibuat agar dapat dipergunakan sebagaimana mestinya.',
        alignment: 'justify' as const,
        margin: [0, 5, 0, 10] as [number, number, number, number],
      },
    ]
  }

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    fontSize: 12,
    alignment: 'justify' as const,
    margin: [0, 5, 0, 10] as [number, number, number, number],
  }))
}

export const GenerateLetterSKCA = ({
  logo,
  data,
  header,
}: IGenerateLetterSKCA): TDocumentDefinitions => {
  const tempatTanggal = `${data.tempat_surat || ''}, ${formatDate(data.tanggal_surat)}`.trim()
  const kopContent = buildKopSuratContent(header, logo)

  return {
    pageSize: 'A4',
    pageMargins: [20, 30, 30, 20],

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 12,
      alignment: 'justify',
      lineHeight: 1.2,
    },

    content: [
      ...(kopContent ?? []),
      {
        text: data?.nama_jenis_template.toUpperCase() || 'SURAT KETERANGAN CUTI AKADEMIK',
        alignment: 'center',
        bold: true,
        fontSize: 15,
        margin: [0, 0, 0, 0],
      },

      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center',
        bold: false,
        margin: [0, 0, 0, 5],
      },

      {
        text: 'Yang bertanda tangan di bawah ini:',
        margin: [0, 0, 0, 5],
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
            [{ text: 'Universitas', bold: true }, ':', data.nama_satuan_kerja_penandatangan],
          ],
        },
        layout: 'noBorders',
      },

      {
        text: 'Dengan ini menerangkan bahwa:',
        margin: [0, 10, 0, 5],
      },

      {
        table: {
          widths: [95, 10, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_mahasiswa],
            [{ text: 'NPM/NIM', bold: true }, ':', data.nim],
            [{ text: 'Program Studi', bold: true }, ':', data.nama_prodi || '-'],
            [{ text: 'Fakultas', bold: true }, ':', data.nama_fakultas || '-'],
            [{ text: 'Jenjang', bold: true }, ':', data.nama_jenjang || '-'],
          ],
        },
        layout: 'noBorders',
      },

      {
        text: [
          'Berdasarkan persetujuan pimpinan fakultas dan ketentuan akademik yang berlaku di ',
          {
            text: data.nama_satuan_kerja_penandatangan,
            bold: true,
          },
          ', mahasiswa tersebut diberikan izin Cuti Akademik pada:',
        ],
        margin: [0, 5, 0, 5],
      },

      {
        margin: [15, 0, 0, 5],
        ul: [
          {
            columns: [
              { text: 'Semester', bold: true, width: 95 },
              { text: ':', width: 10 },
              { text: data.semester_cuti, width: '*' },
            ],
          },
          {
            columns: [
              { text: 'Tahun Akademik', bold: true, width: 95 },
              { text: ':', width: 10 },
              { text: data.tahun_akademik, width: '*' },
            ],
          },
          {
            columns: [
              { text: 'Periode', bold: true, width: 95 },
              { text: ':', width: 10 },
              { text: `${data.periode_cuti} Semester`, width: '*' },
            ],
          },
          {
            columns: [
              { text: 'Alasan', bold: true, width: 95 },
              { text: ':', width: 10 },
              { text: data.alasan_cuti, width: '*' },
            ],
          },
        ],
      },

      {
        text:
          'Selama menjalani cuti akademik, mahasiswa tidak diperkenankan mengikuti kegiatan akademik sebagaimana diatur dalam peraturan akademik ' +
          `${data.nama_satuan_kerja_penandatangan}. ` +
          'Setelah masa cuti berakhir, mahasiswa wajib melakukan registrasi kembali sesuai dengan jadwal yang telah ditetapkan agar dapat melanjutkan studi.',
        alignment: 'justify',
        margin: [0, 0, 0, 5],
      },
      ...buildPenutup(data.penutup),

      {
        table: {
          widths: ['*', 250],
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
                    margin: [0, 0, 0, 50],
                  },
                  {
                    text: data.nama_penandatangan,
                  },
                  {
                    text: `${data?.nip_penandatangan ? 'NIP' : 'NIDN'}.${data?.nip_penandatangan ?? data?.nidn_penandatangan}`,
                    // text: `NIP/NIDN.${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
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
