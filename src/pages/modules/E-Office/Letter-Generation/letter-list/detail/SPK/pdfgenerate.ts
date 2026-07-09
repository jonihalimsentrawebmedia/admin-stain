import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'
import type { ISPKLetter } from './types.ts'
import htmlToPdfmake from 'html-to-pdfmake'
import DOMPurify from 'dompurify'

const buildHtmlContent = (
  html: string | undefined | null,
  margin?: [number, number, number, number]
) => {
  const cleanHtml = DOMPurify.sanitize(html || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') return null

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    alignment: 'justify' as const,
    margin: [80, 0, 0, 0] as [number, number, number, number],
    ...(margin ? { margin } : {}),
  }))
}

const buildLampiranSection = (content: string, judul: string): any => {
  const clean = DOMPurify.sanitize(content)

  if (!clean || clean === '<p><br></p>') {
    return {
      text: judul,
      style: 'lampiranTitle',
      pageBreak: 'before' as const,
      alignment: 'center' as const,
      margin: [0, 30, 0, 24] as [number, number, number, number],
    }
  }

  const isHtml = /<[a-z][\s\S]*>/i.test(clean)
  const items = isHtml
    ? (() => {
        const parsed = htmlToPdfmake(clean, { window })
        return (Array.isArray(parsed) ? parsed : [parsed]) as any[]
      })()
    : [{ text: clean, fontSize: 11 }]

  return {
    stack: [
      {
        text: judul,
        style: 'lampiranTitle',
        alignment: 'center' as const,
        margin: [0, 30, 0, 24] as [number, number, number, number],
      },
      ...items.map((item: any) => ({
        ...item,
        fontSize: 11,
      })),
    ],
    pageBreak: 'before' as const,
  }
}

export const generateSPKLetter = (data: ISPKLetter, logoBase64?: string): TDocumentDefinitions => {
  const kopContent = buildKopSuratContent(data.kop_surat, logoBase64)

  const filteredLampiran = (data.detail_lampiran || []).filter((l) => l && l.trim())
  const lampiranSections = filteredLampiran.map((content, idx) => {
    const judul = filteredLampiran.length > 1 ? `Lampiran ${idx + 1}` : 'Lampiran'
    return buildLampiranSection(content, judul)
  })

  return {
    pageSize: 'A4',
    pageMargins: [40, 20, 40, 20],
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.2,
    },
    content: [
      ...(kopContent ?? []),

      {
        columns: [
          {
            width: '*',
            table: {
              widths: [60, 5, '*'],
              body: [
                ['Nomor', ':', data.nomor_surat],
                ['Lampiran', ':', data.lampiran === 0 ? '-' : `${data.lampiran}`],
                ['Perihal', ':', data.perihal],
              ],
            },
            layout: 'noBorders',
          },
          {
            width: 180,
            alignment: 'right',
            text: `${data.tempat_surat}, ${format(new Date(data.tanggal_surat), 'dd MMMM yyyy', {
              locale: id,
            })}`,
          },
        ],
      },

      // =========================
      // TUJUAN
      // =========================

      {
        margin: [80, 0, 0, 0],
        stack: [
          {
            text: 'Kepada Yth.',
            margin: [0, 0, 0, 0],
          },
          {
            text: `Kecamatan ${data.kecamatan}`,
          },
          {
            text: data.kabupaten,
          },
          {
            text: data.masukan_di ?? '',
            bold: true,
          },
        ],
      },
      {
        margin: [80, 5, 0, 0],
        text: 'Dengan hormat,',
      },
      // =========================
      // PEMBUKA
      // =========================

      ...(buildHtmlContent(data.pembuka) ?? [
        {
          text: data.pembuka || '',
          alignment: 'justify' as const,
        },
      ]),

      {
        margin: [80, 10, 0, 5],

        text: 'Adapun data mahasiswa tersebut adalah sebagai berikut:',
      },

      // =========================
      // TABEL MAHASISWA
      // =========================

      {
        margin: [80, 5, 0, 5],
        table: {
          headerRows: 1,
          widths: [28, '*', 80, 180],
          body: [
            [
              {
                text: 'No',
                bold: true,
              },
              {
                text: 'Nama',
                bold: true,
              },
              {
                text: 'NIM',
                bold: true,
              },
              {
                text: 'Program Studi',
                bold: true,
              },
            ],

            ...data.mahasiswa_list.map((item, index) => [
              index + 1,
              item.nama_mahasiswa,
              item.nim,
              `${item.nama_jenjang} - ${item.nama_prodi}`,
            ]),
          ],
        },
      },

      {
        margin: [80, 5, 0, 0],
        text: 'Pelaksanaan KKN direncanakan pada:',
      },

      // =========================
      // DETAIL KKN
      // =========================

      {
        margin: [90, 0, 0, 0],
        ul: [
          {
            text: [
              { text: 'Periode', bold: true },
              {
                text: ` : ${format(new Date(data.tanggal_mulai), 'dd MMMM yyyy', {
                  locale: id,
                })} s.d ${format(new Date(data.tanggal_selesai), 'dd MMMM yyyy', { locale: id })}`,
              },
            ],
          },
          {
            text: [
              { text: 'Lokasi', bold: true },
              {
                text: ` : Desa ${data.nama_desa}, Kecamatan ${data.kecamatan}, ${data.kabupaten}`,
              },
            ],
          },

          {
            text: [
              {
                text: 'Dosen Pembimbing Lapangan (DPL)',
                bold: true,
              },
            ],
            margin: [0, 0, 0, 0],
          },
        ],
      },
      {
        margin: [110, 0, 0, 0],
        type: 'lower-alpha',
        ol: data.dpl_detail.map((dpl) => ({
          text: dpl.nama,
        })),
      },

      // =========================
      // PENUTUP
      // =========================

      ...(buildHtmlContent(data.penutup) ?? [
        {
          text: data.penutup || '',
          alignment: 'justify' as const,
        },
      ]),

      // =========================
      // TTD
      // =========================

      {
        table: {
          widths: ['*', 220],

          body: [
            [
              '',

              {
                stack: [
                  {
                    text: 'Hormat Kami',
                    alignment: 'left',
                  },

                  {
                    margin: [0, 12, 0, 0],

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
                    text: `NIP/NIDN\n${data.nip_penandatangan}/${data.nidn_penandatangan}`,
                    alignment: 'left',
                  },
                ],
              },
            ],
          ],
        },

        layout: 'noBorders',
        margin: [0, 20, 0, 0],
      },

      ...lampiranSections,
    ],

    styles: {
      lampiranTitle: {
        fontSize: 14,
        bold: true,
        decoration: 'underline' as const,
      },
    },
  }
}
