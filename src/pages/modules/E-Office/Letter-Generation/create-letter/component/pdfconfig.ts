import type { IMailInvitationLetter } from '@/pages/modules/E-Office/Letter-Generation/create-letter/data/types.ts'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import htmlToPdfmake from 'html-to-pdfmake'
import DOMPurify from 'dompurify'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

// ═════════════════════════════════════════════════════════════════════════════
//  HELPER
// ═════════════════════════════════════════════════════════════════════════════

const formatDate = (dateStr: string): string => {
  if (!dateStr) return ''
  try {
    return format(new Date(dateStr), 'dd MMMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}

const formatDayDate = (dateStr: string): string => {
  if (!dateStr) return ''
  try {
    return format(new Date(dateStr), 'EEEE, dd MMMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}

const YTH_OPTIONS = ['Bapak', 'Ibu', 'Bapak/Ibu']

/** Buat cell label bold + fontSize 10 */
const labelCell = (text: string) => ({
  text,
  bold: true as const,
  fontSize: 10,
})

/** Buat cell colon */
const colonCell = () => ({
  text: ':' as const,
  fontSize: 10,
})

/** Buat cell nilai */
const valueCell = (text: string | number | undefined | null, fallback = '-') => ({
  text: text ? String(text) : fallback,
  fontSize: 10,
})

/** Layout zero‑padding untuk nested table */
const zeroPadLayout = {
  paddingLeft: () => 0,
  paddingRight: () => 0,
  paddingTop: () => 0,
  paddingBottom: () => 0,
  hLineWidth: () => 0,
  vLineWidth: () => 0,
}

// ═════════════════════════════════════════════════════════════════════════════
//  MAIN
// ═════════════════════════════════════════════════════════════════════════════

export const GenerateLetterPdfDefinition = (
  letterData: IMailInvitationLetter,
  headerData: ILetterHeader,
  logoBase64?: string
) => {
  // ── Variabel umum ────────────────────────────────────────────────
  const tanggalSurat = formatDate(letterData.tanggal_surat)
  const tempatTanggal = `${letterData.tempat_surat || ''}, ${tanggalSurat}`.trim()

  const isYthOption = YTH_OPTIONS.includes(letterData.yang_terhormat || '')

  // 1 =================================================================
  // KOP SURAT  (menggunakan shared helper)
  // ==================================================================

  const kopContent = buildKopSuratContent(headerData, logoBase64)

  // 2 =================================================================
  // METADATA — Nomor / Lampiran / Perihal (label | : | nilai)
  // ==================================================================

  const tampilkanLampiran =
    letterData.lampiran > 0 && letterData.lampiran !== 0

  const metadataSection = {
    columns: [
      {
        width: '60%',
        columns: [
          // Kolom label
          {
            width: '15%',
            stack: [
              {
                table: {
                  widths: ['*'],
                  body: [
                    [labelCell('Nomor')],
                    ...(tampilkanLampiran ? [[labelCell('Lampiran')]] : []),
                    [labelCell('Perihal')],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
          },
          // Kolom titik dua
          {
            width: '3%',
            stack: [
              {
                table: {
                  widths: ['*'],
                  body: [
                    [colonCell()],
                    ...(tampilkanLampiran ? [[colonCell()]] : []),
                    [colonCell()],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
            alignment: 'center' as const,
          },
          // Kolom nilai
          {
            width: '82%',
            stack: [
              {
                table: {
                  widths: ['*'],
                  body: [
                    [valueCell(letterData.nomor_surat)],
                    ...(tampilkanLampiran
                      ? [[valueCell(`${letterData.lampiran} lembar`)]]
                      : []),
                    [valueCell(letterData.perihal)],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
          },
        ],
        columnGap: 0,
      },
      // Tempat / Tanggal (kanan)
      {
        width: '40%',
        text: tempatTanggal || '-',
        fontSize: 10,
        alignment: 'right' as const,
      },
    ],
    columnGap: 10,
    margin: [0, 0, 0, 10] as [number, number, number, number],
  }

  // 3 =================================================================
  // YTH / PENERIMA
  // ==================================================================

  const buildYth = () => {
    if (isYthOption) {
      return [
        {
          text: `Yth\n${letterData.yang_terhormat}\nDi ${letterData.di}`,
          fontSize: 10,
          alignment: 'justify' as const,
          margin: [0, 0, 0, 5] as [number, number, number, number],
        },
      ]
    }

    // Multi‑baris → strip HTML dan render sebagai stack agar lineHeight rapat
    const ythLines = (letterData.yang_terhormat || '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&nbsp;/g, ' ')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l)

    return [
      { text: 'Yth', fontSize: 10, alignment: 'justify' as const, margin: [0, 0, 0, 0] as [number, number, number, number] },
      {
        stack: ythLines.map((line) => ({
          text: `     ${line}`,
          fontSize: 10,
          margin: [0, 0, 0, 1] as [number, number, number, number],
        })),
      },
      {
        text: `Di ${letterData.di || ''}`,
        fontSize: 10,
        alignment: 'justify' as const,
        margin: [0, 1, 0, 5] as [number, number, number, number],
      },
    ]
  }

  // 4 =================================================================
  // PEMBUKA
  // ==================================================================

  const buildPembuka = () => {
    const cleanHtml = DOMPurify.sanitize(letterData.pembuka || '')
    if (!cleanHtml || cleanHtml === '<p><br></p>') return []

    const parsed = htmlToPdfmake(cleanHtml, { window })
    const items = Array.isArray(parsed) ? parsed : [parsed]

    return items.map((item: any) => ({
      ...item,
      fontSize: 10,
      alignment: 'justify' as const,
      margin: [0, 0, 0, 0] as [number, number, number, number],
    }))
  }

  // 5 =================================================================
  // ISI — Hari/Tanggal, Waktu, Tempat, Agenda
  // ==================================================================

  const eventDate =
    letterData.is_lebih_dari_satu_hari && letterData.hari_akhir
      ? `${formatDayDate(letterData.hari_mulai)} s/d ${formatDayDate(letterData.hari_akhir)}`
      : formatDayDate(letterData.hari_mulai)

  const agendaItems = (letterData.agenda || []).filter((a) => a.trim())

  /** Bangun cell agenda → nested table jika > 1 item */
  const buildAgendaCell = () => {
    if (agendaItems.length === 0) return { text: ': -', fontSize: 10 }

    if (agendaItems.length === 1) {
      return { text: `: ${agendaItems[0]}`, fontSize: 10 }
    }

    // Multi item → nested table
    const nestedBody: any[] = []
    nestedBody.push([':', `${1}. ${agendaItems[0]}`])
    for (let i = 1; i < agendaItems.length; i++) {
      nestedBody.push(['', `${i + 1}. ${agendaItems[i]}`])
    }

    return {
      table: {
        widths: ['2%', '*'],
        body: nestedBody,
      },
      layout: zeroPadLayout,
      fontSize: 10,
    }
  }

  const eventInfoSection = {
    margin: [0, 8, 0, 8] as [number, number, number, number],
    table: {
      widths: ['15%', '*'],
      body: [
        [labelCell('Hari/Tanggal'), { text: `: ${eventDate || '-'}`, fontSize: 10 }],
        [labelCell('Waktu'), { text: `: ${letterData.waktu || '-'}`, fontSize: 10 }],
        [labelCell('Tempat'), { text: `: ${letterData.tempat || '-'}`, fontSize: 10 }],
        [labelCell('Agenda'), buildAgendaCell()],
      ],
    },
    layout: {
      paddingLeft: () => 0,
      paddingRight: () => 0,
      paddingTop: () => 2,
      paddingBottom: () => 2,
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    } as any,
    fontSize: 10,
  }

  // 6 =================================================================
  // PENUTUP
  // ==================================================================

  const buildPenutup = () => {
    const cleanHtml = DOMPurify.sanitize(letterData.penutup || '')
    if (!cleanHtml || cleanHtml === '<p><br></p>') return []

    const parsed = htmlToPdfmake(cleanHtml, { window })
    const items = Array.isArray(parsed) ? parsed : [parsed]

    return items.map((item: any) => ({
      ...item,
      fontSize: 10,
      alignment: 'justify' as const,
      margin: [0, 0, 0, 10] as [number, number, number, number],
    }))
  }

  // 7 =================================================================
  // TANDA TANGAN
  // ==================================================================

  const signatureSection = {
    columns: [
      { width: '*', text: '' },
      {
        width: '50%',
        stack: [
          { text: 'Yang terhormat,', fontSize: 10, margin: [0, 0, 0, 0] as [number, number, number, number] },
          { text: '', margin: [0, 0, 0, 60] as [number, number, number, number] },
          { text: letterData.nama_disahkan_oleh || '-', bold: true, fontSize: 10 },
        ],
        alignment: 'left' as const,
      },
    ],
    columnGap: 0,
    margin: [0, 10, 0, 0] as [number, number, number, number],
  }

  // 8 =================================================================
  // TEMBUSAN
  // ==================================================================

  const tembusanList = (letterData.tembusan || []).filter((t) => t.trim())

  const tembusanSection: any[] =
    letterData.is_ada_tembusan && tembusanList.length > 0
      ? [
          { text: 'Tembusan', fontSize: 10, margin: [20, 20, 0, 2] as [number, number, number, number] },
          {
            stack: tembusanList.map(
              (item, idx) => `${idx + 1}. ${item}`,
            ),
            margin: [20, 0, 0, 0] as [number, number, number, number],
            fontSize: 10,
          },
        ]
      : []

  // 9 =================================================================
  // LAMPIRAN (halaman baru)
  // ==================================================================

  const lampiranSections: any[] = []
  const filteredLampiran = (letterData.detail_lampiran || []).filter((l) => l && l.trim())

  filteredLampiran.forEach((html, idx) => {
    const clean = DOMPurify.sanitize(html)
    const judul = filteredLampiran.length > 1 ? `Lampiran ${idx + 1}` : 'Lampiran'

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

    const parsed = htmlToPdfmake(clean, { window })
    const items = Array.isArray(parsed) ? parsed : [parsed]

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
          fontSize: 10,
        })),
      ],
      pageBreak: 'before' as const,
    })
  })

  // ==================================================================
  // ASSEMBLE
  // ==================================================================

  return {
    pageMargins: [50, 50, 50, 50] as [number, number, number, number],

    content: [
      // Kop surat (shared helper)
      ...(kopContent ?? []),

      metadataSection,

      // Body wrapper dengan indent kiri (seperti surat)
      {
        columns: [
          { width: '10.5%', text: '' },
          {
            width: '84%',
            stack: [
              ...buildYth(),
              ...buildPembuka(),
              eventInfoSection,
              ...buildPenutup(),
              signatureSection,
              ...tembusanSection,
              ...lampiranSections,
            ],
          },
        ],
        columnGap: 0,
      },
    ],

    footer: (currentPage: number, pageCount: number) => ({
      columns: [
        {
          text: `Dicetak dari ${headerData.nama_unit || 'Sistem'}`,
          alignment: 'left' as const,
          italics: true,
          fontSize: 8,
        },
        {
          text: `Halaman ${currentPage} dari ${pageCount}`,
          alignment: 'right' as const,
          fontSize: 8,
        },
      ],
      margin: [40, 0, 40, 20] as [number, number, number, number],
    }),

    styles: {
      lampiranTitle: {
        fontSize: 14,
        bold: true,
        decoration: 'underline' as const,
      },
      'ql-align-justify': { alignment: 'justify' as const },
    },

    defaultStyle: {
      font: 'Times New Roman',
      fontSize: 10,
      alignment: 'justify' as const,
      lineHeight: 1.4,
    },
  }
}
