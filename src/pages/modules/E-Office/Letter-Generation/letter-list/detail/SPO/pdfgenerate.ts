import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISPOLetter } from './types.tsx'
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

interface IGenerateLetterSPO {
  logo?: string
  data: ISPOLetter
  header: ILetterHeader
}

const buildPenutup = (penutup: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(penutup || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Demikian surat pengantar ini dibuat agar dapat dipergunakan sebagaimana mestinya.',
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

export const GenerateLetterSPO = ({
  logo,
  data,
  header,
}: IGenerateLetterSPO): TDocumentDefinitions => {
  const tempatTanggal = `${data.tempat_surat || ''}, ${formatDate(data.tanggal_surat)}`.trim()
  const kopContent = buildKopSuratContent(header, logo)

  return {
    pageSize: 'A4',
    pageMargins: [40, 20, 40, 20],

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 12,
      alignment: 'justify',
      lineHeight: 1.1,
    },

    content: [
      ...(kopContent ?? []),

      {
        text: data?.nama_jenis_template.toUpperCase(),
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

      // ===========================
      // PENANDATANGAN
      // ===========================

      {
        text: 'Yang bertanda tangan di bawah ini:',
        margin: [0, 0, 0, 5],
      },

      {
        table: {
          widths: [95, 5, '*'],
          body: [
            [{ text: 'Nama', bold: true }, ':', data.nama_penandatangan],
            [
              { text: 'NIP/NIDN', bold: true },
              ':',
              `${data.nip_penandatangan || '-'} / ${data.nidn_penandatangan || '-'}`,
            ],
            [{ text: 'Jabatan', bold: true }, ':', data.jabatan_penandatangan],
            [{ text: 'Perguruan Tinggi', bold: true }, ':', data.nama_satuan_kerja_penandatangan],
          ],
        },
        layout: 'noBorders',
        margin: [0, 0, 0, 5],
      },

      {
        text: 'Dengan ini menerangkan bahwa mahasiswa berikut:',
        margin: [0, 0, 0, 5],
      },

      // ===========================
      // TABEL MAHASISWA
      // ===========================

      {
        table: {
          headerRows: 1,
          widths: [15, '*', 90, 170],
          body: [
            [
              { text: 'No', bold: true },
              { text: 'Nama', bold: true },
              { text: 'NIM', bold: true },
              { text: 'Program Studi', bold: true },
            ],
            ...data.mahasiswa_list.map((mhs, index) => [
              index + 1,
              mhs.nama_mahasiswa,
              mhs.nim,
              `${mhs.kode_jenjang} - ${mhs.nama_prodi}`,
            ]),
          ],
        },
        margin: [0, 0, 0, 5],
      },

      // ===========================
      // PARAGRAF
      // ===========================

      {
        alignment: 'justify',
        margin: [0, 0, 0, 5],
        text: [
          'Adalah mahasiswa aktif pada ',
          {
            text: `${data.mahasiswa_list[0]?.nama_prodi || data.nama_prodi}, ${data.mahasiswa_list[0]?.nama_fakultas || data.nama_fakultas}`,
            bold: true,
          },
          ', yang akan melaksanakan kegiatan Observasi sebagai bagian dari proses pembelajaran dan/atau penyusunan tugas akademik.',
        ],
      },

      {
        alignment: 'justify',
        margin: [0, 0, 0, 5],
        text: [
          'Sehubungan dengan hal tersebut, kami memohon kesediaan Bapak/Ibu Pimpinan ',
          {
            text: data.tempat_observasi,
            bold: true,
          },
          ' untuk memberikan izin kepada mahasiswa tersebut dalam melaksanakan kegiatan observasi di instansi yang Bapak/Ibu pimpin.',
        ],
      },

      {
        text: 'Adapun pelaksanaan observasi direncanakan pada:',
        margin: [0, 0, 0, 5],
      },

      // ===========================
      // DETAIL OBSERVASI
      // ===========================

      {
        margin: [20, 0, 0, 5],
        ul: [
          {
            text: [
              { text: 'Hari/Tanggal', bold: true },
              {
                text: ` : ${format(new Date(data.tanggal_observasi), 'EEEE, dd MMMM yyyy', {
                  locale: id,
                })}`,
              },
            ],
          },
          {
            text: [{ text: 'Waktu', bold: true }, { text: ` : ${data.waktu_observasi}` }],
          },
          {
            text: [{ text: 'Tempat', bold: true }, { text: ` : ${data.tempat_observasi}` }],
          },
          {
            text: [{ text: 'Topik Observasi', bold: true }, { text: ` : ${data.topik_observasi}` }],
          },
        ],
      },

      // ===========================
      // PENUTUP
      // ===========================

      ...buildPenutup(data.penutup),

      // ===========================
      // TTD
      // ===========================

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
