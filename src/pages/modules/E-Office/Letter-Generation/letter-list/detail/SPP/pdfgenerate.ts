import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ISPPLetter } from './types.ts'
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

interface IGenerateLetterSPP {
  data: ISPPLetter
  header: ILetterHeader
  logo?: string
}

const infoRow = (label: string, value: string | number | null) => [
  {
    text: label,
    bold: true,
    border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
  },
  {
    text: ':',
    border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
    alignment: 'center' as const,
  },
  {
    text: value ? String(value) : '-',
    border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
  },
]

const buildPembuka = (pembuka: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(pembuka || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Dengan hormat,',
        margin: [80, 0, 0, 0] as [number, number, number, number],
      },
    ]
  }

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    fontSize: 12,
    alignment: 'justify' as const,
    margin: [80, 0, 0, 0] as [number, number, number, number],
  }))
}

const buildPenutup = (penutup: string | undefined | null) => {
  const cleanHtml = DOMPurify.sanitize(penutup || '')
  if (!cleanHtml || cleanHtml === '<p><br></p>') {
    return [
      {
        text: 'Demikian surat pengantar ini kami sampaikan. Atas perhatian dan kerja sama yang baik, kami ucapkan terima kasih.',
        alignment: 'justify' as const,
        margin: [80, 0, 0, 5] as [number, number, number, number],
      },
    ]
  }

  const parsed = htmlToPdfmake(cleanHtml, { window })
  const items = Array.isArray(parsed) ? parsed : [parsed]

  return items.map((item: any) => ({
    ...item,
    fontSize: 11,
    alignment: 'justify' as const,
    margin: [80, 0, 0, 5] as [number, number, number, number],
  }))
}

export const GenerateLetterSKPP = ({
  data,
  header,
  logo,
}: IGenerateLetterSPP): TDocumentDefinitions => {
  const tempatTanggal = `${data.tempat_surat || ''}, ${formatDate(data.tanggal_surat)}`.trim()
  const kopContent = buildKopSuratContent(header, logo)

  const metadataSection = {
    table: {
      widths: [65, 5, '*'],
      body: [
        [
          {
            text: 'Lampiran',
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
          },
          {
            text: ':',
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
            alignment: 'center' as const,
          },
          {
            text:
              data.detail_lampiran.length > 0
                ? `${data.detail_lampiran.length} Lampiran`
                : `${data.lampiran} Lampiran`,
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
          },
        ],
        [
          {
            text: 'Perihal',
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
          },
          {
            text: ':',
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
            alignment: 'center' as const,
          },
          {
            text: data.perihal,
            border: [false, false, false, false] as [boolean, boolean, boolean, boolean],
          },
        ],
      ],
    },
    layout: 'noBorders' as const,
    margin: [0, 0, 0, 0] as [number, number, number, number],
  }
  const lampiranSections: any[] = []
  const filteredLampiran = (data.detail_lampiran || []).filter((l) => l && l.trim())

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
    pageMargins: [40, 20, 40, 20],

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 11,
      lineHeight: 1.1,
      alignment: 'justify' as const,
    },

    content: [
      ...(kopContent ?? []),

      {
        text: data?.nama_jenis_template.toUpperCase(),
        bold: true,
        alignment: 'center',
        fontSize: 15,
        margin: [0, 0, 0, 0],
      },

      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center',
        margin: [0, 0, 0, 5],
      },
      metadataSection,
      {
        text: 'Kepada Yth.',
      },
      {
        margin: [80, 5, 0, 5] as [number, number, number, number],
        stack: [
          { text: data.instansi_pimpinan, bold: true },
          { text: 'Di' },
          { text: data.masukan_di },
        ],
      },

      ...buildPembuka(data.pembuka),

      {
        text: 'Sehubungan dengan pelaksanaan penelitian dalam rangka penyusunan Skripsi/Tesis/Disertasi, kami mohon kesediaan Bapak/Ibu untuk memberikan izin kepada mahasiswa berikut:',
        alignment: 'justify',
        margin: [80, 0, 0, 5] as [number, number, number, number],
      },

      {
        table: {
          widths: [100, 10, '*'],
          body: [
            infoRow('Nama', data.nama_mahasiswa),
            infoRow('NPM/NIM', data.nim),
            infoRow('Program Studi', data.nama_prodi),
            infoRow('Fakultas', data.nama_fakultas),
            infoRow('Jenjang', `${data.kode_jenjang} - ${data.nama_jenjang}`),
          ],
        },
        layout: 'noBorders' as const,
        margin: [80, 0, 0, 5] as [number, number, number, number],
      },

      {
        text: [
          'untuk melaksanakan penelitian pada instansi yang Bapak/Ibu pimpin dengan judul: ',
          { text: data.judul_penelitian, bold: true },
          '. Adapun pelaksanaan penelitian direncanakan pada:',
        ],
        alignment: 'justify',
        margin: [80, 0, 0, 5] as [number, number, number, number],
      },

      {
        margin: [90, 0, 0, 5] as [number, number, number, number],
        table: {
          widths: [140, 10, '*'],
          body: [
            infoRow('a. Lokasi Penelitian', data.lokasi_penelitian),
            infoRow('b. Periode Penelitian', data.lama_penelitian),
            infoRow('c. Metode Pengumpulan Data', data.metode_pengumpulan_data.join(' / ')),
          ],
        },
        layout: 'noBorders' as const,
      },

      {
        text: 'Kami berharap Bapak/Ibu berkenan memberikan izin serta bantuan yang diperlukan selama proses penelitian berlangsung. Seluruh data yang diperoleh akan digunakan semata-mata untuk kepentingan akademik dan dijaga kerahasiaannya sesuai dengan ketentuan yang berlaku.',
        alignment: 'justify',
        margin: [80, 0, 0, 5] as [number, number, number, number],
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
        layout: 'noBorders' as const,
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
