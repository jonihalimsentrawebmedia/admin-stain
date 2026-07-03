import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { ISPMLetter } from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM/types.ts'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'
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
    margin: [80, 5, 0, 0] as [number, number, number, number],
    alignment: 'justify' as const,
    ...(margin ? { margin } : {}),
  }))
}

export const generateSPMLetter = (data: ISPMLetter, logoBase64?: string): TDocumentDefinitions => {
  const kopContent = buildKopSuratContent(data.kop_surat, logoBase64)

  const filteredLampiran = (data.detail_lampiran || []).filter((l) => l && l.trim())
  const lampiranSections: any[] = []

  filteredLampiran.forEach((content, idx) => {
    const judul = filteredLampiran.length > 1 ? `Lampiran ${idx + 1}` : 'Lampiran'
    const clean = DOMPurify.sanitize(content)

    if (!clean || clean === '<p><br></p>') {
      lampiranSections.push({
        text: judul,
        style: 'lampiranTitle',
        pageBreak: 'before' as const,
        alignment: 'center' as const,
        margin: [0, 30, 0, 24] as [number, number, number, number],
      })
      return
    }

    const isHtml = /<[a-z][\s\S]*>/i.test(clean)
    const items = isHtml
      ? (() => {
          const parsed = htmlToPdfmake(clean, { window })
          return (Array.isArray(parsed) ? parsed : [parsed]) as any[]
        })()
      : [{ text: clean, fontSize: 11 }]

    lampiranSections.push({
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
    })
  })

  return {
    pageSize: 'A4',

    pageMargins: [40, 35, 40, 40],

    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.25,
    },

    content: [
      ...(kopContent ?? []),

      // INFORMASI SURAT
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

      {
        margin: [80, 0, 0, 0],
        stack: [
          {
            text: 'Kepada Yth.',
          },
          {
            text: data.instansi_pimpinan,
            bold: true,
          },
          {
            text: data.alamat_instansi,
          },
          {
            text: data.masukan_di,
          },
        ],
      },

      {
        margin: [80, 10, 0, 0],
        text: 'Dengan hormat,',
      },

      ...(buildHtmlContent(data.pembuka) ?? [
        {
          text: data.pembuka || '',
          alignment: 'justify' as const,
        },
      ]),

      {
        margin: [80, 0, 0, 0],
        text: 'Adapun data mahasiswa tersebut adalah sebagai berikut:',
      },

      // ==========================
      // TABEL MAHASISWA
      // ==========================

      {
        margin: [80, 10, 0, 0],
        table: {
          headerRows: 1,
          widths: [20, '*', 90, 180],
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

            ...data.mahasiswa_list.map((mhs, index) => [
              index + 1,
              mhs.nama_mahasiswa,
              mhs.nim,
              `${mhs.nama_jenjang_pendidikan} - ${mhs.nama_prodi}`,
            ]),
          ],
        },
      },

      {
        margin: [80, 5, 0, 0],
        text: 'Pelaksanaan Magang/PKL direncanakan pada:',
      },

      {
        margin: [80, 5, 0, 0],
        table: {
          widths: [110, 10, '*'],
          body: [
            [
              {
                text: 'a. Periode',
                bold: true,
              },
              ':',
              `${format(new Date(data.tanggal_mulai), 'dd MMMM yyyy', {
                locale: id,
              })} s.d ${format(new Date(data.tanggal_selesai), 'dd MMMM yyyy', {
                locale: id,
              })}`,
            ],
            [
              {
                text: 'b. Lama Pelaksanaan',
                bold: true,
              },
              ':',
              `${data.lama_kegiatan} bulan`,
            ],
          ],
        },
        layout: 'noBorders',
      },

      ...(buildHtmlContent(data.penutup) ?? [
        {
          text: data.penutup || '',
          alignment: 'justify' as const,
        },
      ]),

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
                    margin: [0, 0, 0, 0],
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
        margin: [0, 25, 0, 0],
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
