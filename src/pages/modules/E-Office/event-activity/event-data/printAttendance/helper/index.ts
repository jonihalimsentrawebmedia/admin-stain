import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Content } from 'pdfmake/interfaces'
import type { AttendanceSettingType } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/resolver.tsx'
import type {
  ILetterHeader,
  ISettingLetterHeader,
} from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

interface GenerateAttendancePdfProps {
  event: any
  values: AttendanceSettingType
  header?: ILetterHeader
  imageUrl?: string
}

const LOGO_SIZE = 72
const LOGO_COLUMN_WIDTH = 90

const getValidFont = (jenis_font?: string): string => {
  if (!jenis_font) return 'Roboto'

  switch (jenis_font.trim().toLowerCase()) {
    case 'times new roman':
      return 'TimesNewRoman'

    case 'roboto':
      return 'Roboto'

    default:
      return 'Roboto'
  }
}

const buildLetterHeaderContent = (header?: ILetterHeader, imageUrl?: string): Content[] => {
  if (!header) return []

  const settings = header?.pengaturan || []

  return [
    {
      columns: [
        {
          width: imageUrl ? LOGO_COLUMN_WIDTH : 0,
          stack: imageUrl
            ? [
                {
                  image: imageUrl,
                  fit: [LOGO_SIZE, LOGO_SIZE],
                  alignment: 'center',
                  margin: [0, 0, 0, 0],
                },
              ]
            : [],
        },
        {
          width: '*',
          stack: settings.map((setting: ISettingLetterHeader, index: number) => ({
            text: setting.isi,
            alignment: 'center',
            font: getValidFont(setting.jenis_font),
            fontSize: Number(setting.ukuran_font) || 12,
            margin: [0, index === 0 ? 0 : 1, 0, 0] as [number, number, number, number],
          })),
          margin: [0, 2, 0, 0],
        },
      ],

      columnGap: 5,
      margin: [20, 10, 20, 10],
    },

    {
      table: {
        widths: ['*'],
        body: [['']],
      },
      layout: {
        hLineWidth: (i: number) => {
          if (i === 0) return 1.5
          return 0
        },
        hLineColor: () => '#000000',
        vLineWidth: () => 0,
        paddingLeft: () => 0,
        paddingRight: () => 0,
        paddingTop: () => 0,
        paddingBottom: () => 2,
      },
      margin: [0, 0, 0, 8],
    },
  ]
}

// ─── Page dimension constants for height estimation ──────────────────────────
const PAGE_DIM = {
  PORTRAIT: { width: 595.28, height: 841.89 },
  LANDSCAPE: { width: 841.89, height: 595.28 },
}

const MARGIN_PAGE = { top: 30, bottom: 50, left: 30, right: 30 }

const ESTIMATED = {
  title: 25,
  eventInfo: 74,
  tableHeader: 34,
  tableRow: 14,
  tablePadding: 4,
  bottomSpacing: 10,
}

/**
 * Estimate letter header height (points).
 * Sum of text lines height, logo height, container padding, and horizontal line.
 *
 * Margins (matching buildLetterHeaderContent):
 *   - Columns container: margin [0,0,0,5]
 *   - Separator line:    margin [0,0,0,8]
 */
const estimateHeaderHeight = (header?: ILetterHeader, imageUrl?: string): number => {
  if (!header) return 0
  const settings = header.pengaturan || []
  // Each text line: font ~12pt + 2pt gap = ~14pt
  const textHeight = settings.length * 14
  // Logo area: 72px logo + container vertical padding ~10pt
  const logoHeight = imageUrl ? 72 + 10 : 0
  // Column area height = max(text, logo) + container margin bottom [0,0,0,5]
  const columnArea = Math.max(textHeight, logoHeight) + 5
  // Horizontal line: ~13pt (border 1.5 + paddingBottom 2 + margin [0,0,0,8])
  return columnArea + 13
}

/**
 * Estimate signature block height (points).
 */
const estimateSignatureHeight = (signatories: Signatory[], isPortrait: boolean): number => {
  if (signatories.length === 0) return 0
  const sigSpace = isPortrait ? 60 : 40
  const rowMargin = isPortrait ? 45 : 20
  const topMargin = isPortrait ? 60 : 40
  const pairs = Math.ceil(signatories.length / 2)
  // Per column (signatory): label ~18pt + jabatan ~16pt + sigSpace gap + nama ~18pt
  const perSignatoryTotal = 18 + 16 + sigSpace + 18
  return topMargin + pairs * perSignatoryTotal + (pairs - 1) * rowMargin
}

interface Signatory {
  label: string
  jabatan: string
  nama: string
}

/**
 * Build header columns and widths based on user-selected fields.
 */
const buildTableColumns = (values: AttendanceSettingType) => {
  const columns: any[] = []
  const widths: any[] = []

  if (values.nomor) {
    columns.push({ text: 'No.', style: 'tableHeader', fontSize: 10 })
    widths.push('auto')
  }
  if (values.nama_peserta) {
    columns.push({ text: 'Nama Peserta', style: 'tableHeader', fontSize: 10 })
    widths.push('*')
  }
  if (values.instansi) {
    columns.push({ text: 'Instansi/Alamat', style: 'tableHeader', fontSize: 10 })
    widths.push('*')
  }
  if (values.hp) {
    columns.push({ text: 'HP', style: 'tableHeader', fontSize: 10 })
    widths.push(values.hasil_cetak === 'PORTRAIT' ? 50 : 100)
  }
  if (values.email) {
    columns.push({ text: 'Email', style: 'tableHeader', fontSize: 10 })
    widths.push(values.hasil_cetak === 'PORTRAIT' ? 50 : 100)
  }
  if (values.jabatan) {
    columns.push({ text: 'Jabatan', style: 'tableHeader', fontSize: 10 })
    widths.push(values.hasil_cetak === 'PORTRAIT' ? 50 : 100)
  }
  if (values.tanda_tangan) {
    columns.push({ text: 'TTD', style: 'tableHeader', fontSize: 10 })
    widths.push(values.hasil_cetak === 'PORTRAIT' ? 50 : 100)
  }
  if (values.keterangan) {
    columns.push({ text: 'Keterangan', style: 'tableHeader', fontSize: 10 })
    widths.push(values.hasil_cetak === 'PORTRAIT' ? 60 : 100)
  }

  return { columns, widths }
}

/**
 * Generate all participant data rows (empty, for attendees to fill).
 */
const generateParticipantRows = (values: AttendanceSettingType) => {
  const total = Number(values.jumlah_peserta || 0)
  const rows: any[] = []

  for (let i = 0; i < total; i++) {
    const row: any[] = []
    if (values.nomor) row.push({ text: `${i + 1}`, alignment: 'center' })
    if (values.nama_peserta) row.push('')
    if (values.instansi) row.push('')
    if (values.hp) row.push('')
    if (values.email) row.push('')
    if (values.jabatan) row.push('')
    if (values.tanda_tangan) row.push('')
    if (values.keterangan) row.push('')
    rows.push(row)
  }

  return rows
}

/**
 * Collect all signatories (diketahui + mengetahui + saksi_pendatang).
 */
const collectSignatories = (values: AttendanceSettingType): Signatory[] => {
  const list: Signatory[] = []

  // Diketahui (always required)
  list.push({
    label: values.label_diketahui || '',
    jabatan: values.jabatan_diketahui || '',
    nama: values.nama_diketahui || '',
  })
  // Mengetahui (always pushed, even if empty — matches original behaviour)
  if (values.label_mengetahui || values.jabatan_mengetahui || values.nama_mengetahui) {
    list.push({
      label: values.label_mengetahui || '',
      jabatan: values.jabatan_mengetahui || '',
      nama: values.nama_mengetahui || '',
    })
  }

  if (values.saksi_pendatang && Array.isArray(values.saksi_pendatang)) {
    values.saksi_pendatang.forEach((s) => {
      const label = s.label?.trim()
      const jabatan = s.jabatan?.trim()
      const nama = s.nama?.trim()

      if (label || jabatan || nama) {
        list.push({
          label: label || '',
          jabatan: jabatan || '',
          nama: nama || '',
        })
      }
    })
  }

  return list
}

/**
 * Split an array into chunks of the given size.
 */
const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

/**
 * Build the event info section (common to all modes).
 *
 * Uses a borderless TABLE with custom layout that matches the participant
 * table's padding (paddingLeft: 4) so the event detail labels start at
 * the exact same x-coordinate as the table — achieving flush alignment.
 */
const buildEventInfo = (event: any) => ({
  margin: [30, 10, 30, 10] as [number, number, number, number],
  table: {
    widths: ['auto', '*'],
    body: [
      [
        { text: 'Nama Kegiatan', alignment: 'left' as const, noWrap: true },
        { text: `: ${event?.nama_kegiatan || ''}`, alignment: 'left' as const },
      ],
      [
        { text: 'Hari / Tanggal', alignment: 'left' as const, noWrap: true },
        {
          text: `: ${
            event?.tanggal_mulai
              ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
              : ''
          }`,
          alignment: 'left' as const,
        },
      ],
      [
        { text: 'Waktu', alignment: 'left' as const, noWrap: true },
        { text: `: ${event?.waktu || ''}`, alignment: 'left' as const },
      ],
      [
        { text: 'Tempat', alignment: 'left' as const, noWrap: true },
        { text: `: ${event?.tempat || ''}`, alignment: 'left' as const },
      ],
      [
        { text: 'Penyelenggara', alignment: 'left' as const, noWrap: true },
        { text: `: ${event?.penyelenggara || ''}`, alignment: 'left' as const },
      ],
    ],
  },
  layout: {
    hLineWidth: () => 0,
    vLineWidth: () => 0,
    hLineColor: () => 'transparent',
    vLineColor: () => 'transparent',
    paddingLeft: () => 4,
    paddingRight: () => 4,
    paddingTop: () => 2,
    paddingBottom: () => 2,
  },
})

/**
 * Build a table element for a single page of participants.
 */
const buildParticipantTable = (
  headerColumns: any[],
  widths: any[],
  rows: any[],
  layout: any
): any => ({
  table: {
    headerRows: 1,
    dontBreakRows: true,
    widths: [...widths],
    body: [headerColumns, ...rows],
  },
  layout,
})

/**
 * Build the signature block.
 *
 * Signatories are displayed in pairs (max 2 columns per row).
 * The entire block is designed to stay unbroken.
 */
const buildSignatureBlock = (signatories: Signatory[], isPortrait: boolean) => {
  if (signatories.length === 0) return { text: '' }

  const sigSpace = isPortrait ? 40 : 40
  const rowMargin = isPortrait ? 40 : 20
  const topMargin = isPortrait ? 60 : 40

  // Group into pairs (max 2 per row)
  const pairs: Signatory[][] = []
  for (let i = 0; i < signatories.length; i += 2) {
    pairs.push(signatories.slice(i, i + 2))
  }

  const items = pairs.map((pair, idx) => {
    console.log(pair)
    // Single signatory on a row → center across full width using 3 columns
    const isOnlyOneSignatory = signatories.length === 1
    if (pair.length === 1) {
      const sig = pair[0]
      // hanya 1 penandatangan total
      if (isOnlyOneSignatory) {
        return {
          columns: [
            { width: '*', text: '' },
            {
              width: '*',
              alignment: 'center',
              margin: [0, 0, 0, 0],
              stack: [
                {
                  text: sig.label,
                  bold: true,
                  alignment: 'left',
                },
                {
                  text: sig.jabatan ? sig.jabatan + ',' : '',
                  margin: [0, 0, 0, sigSpace],
                  alignment: 'left',
                },
                {
                  text: sig.nama,
                  bold: true,
                  alignment: 'left',
                },
              ],
            },
          ],
          margin: [-70, idx > 0 ? 0 : 0, 0, 0],
        }
      }
      // sisa ganjil (3,5,7,dst)
      return {
        columns: [
          { width: '*', text: '' },
          {
            width: '*',
            alignment: 'center',
            stack: [
              {
                text: sig.label,
                bold: true,
                alignment: 'center',
              },
              {
                text: sig.jabatan ? sig.jabatan + ',' : '',
                margin: [0, 0, 0, sigSpace],
                alignment: 'center',
              },
              {
                text: sig.nama,
                bold: true,
                alignment: 'center',
              },
            ],
          },
          { width: '*', text: '' },
        ],
        margin: [0, idx > 0 ? rowMargin : 0, 0, 0],
      }
    }

    // Two signatories on a row → equally split
    const cols = pair.map((sig) => ({
      width: '*',
      alignment: 'center' as const,
      stack: [
        { text: sig.label, bold: true, alignment: 'center' as const },
        {
          text: sig.jabatan ? sig.jabatan + ',' : '',
          margin: [0, 5, 0, sigSpace] as [number, number, number, number],
          alignment: 'center' as const,
        },
        {
          text: sig.nama,
          bold: true,
          alignment: 'center' as const,
        },
      ],
    }))

    return {
      columns: cols,
      margin: [0, idx > 0 ? rowMargin : 0, 0, 0] as [number, number, number, number],
    }
  })

  return {
    margin: [0, topMargin, 0, 0] as [number, number, number, number],
    stack: items,
    unbreakable: true,
  }
}

export const generatePreviewAttendancePdf2 = ({
  event,
  values,
  header,
  imageUrl,
}: GenerateAttendancePdfProps) => {
  // ─── 1. Resolve imageUrl from header.url_logo if not explicitly passed ──────
  const resolvedImageUrl =
    imageUrl || (header?.url_logo?.startsWith('data:') ? header.url_logo : undefined)

  // ─── 2. Build letter header content once ────────────────────────────────────
  const letterHeaderContent = buildLetterHeaderContent(header, resolvedImageUrl)

  // ─── 3. Orientation & page constants ────────────────────────────────────────
  const isPortrait = values.hasil_cetak === 'PORTRAIT'
  const pageHeight = isPortrait ? PAGE_DIM.PORTRAIT.height : PAGE_DIM.LANDSCAPE.height

  // ─── 4. Estimate the height of the repeating header zone ────────────────────
  //  The header zone (letter header + title + event info) is rendered by
  //  pdfmake's built-in `header` property on EVERY page.  We set
  //  `pageMargins.top` to the estimated height so that the content area
  //  starts right below it — preventing overlap.
  const headerHeightVal = estimateHeaderHeight(header, resolvedImageUrl)
  const headerZoneHeight = headerHeightVal + ESTIMATED.title + ESTIMATED.eventInfo
  const topMargin = headerZoneHeight + 15 // 15pt buffer

  // ─── 5. Dynamic row padding & content area dimensions ───────────────────────
  //  • jumlah_peserta <= 13 → padding kecil (4pt)   agar tabel compact
  //  • jumlah_peserta >  13 → padding besar (15pt)  agar baris lebih lega
  const jumlahPeserta = Number(values.jumlah_peserta || 0)
  const rowPadding = jumlahPeserta <= 13 ? 4 : 15

  const contentAreaHeight = pageHeight - topMargin - MARGIN_PAGE.bottom
  const availableForContent = contentAreaHeight - ESTIMATED.tableHeader
  // Setiap baris punya paddingTop + paddingBottom → kalikan rowPadding × 2
  const rowUnitCost = ESTIMATED.tableRow + rowPadding * 2

  // ─── 6. Max rows per page ───────────────────────────────────────────────────
  const maxRowsPerPage = Math.max(1, Math.floor(availableForContent / rowUnitCost))

  // ─── 7. Table definition ────────────────────────────────────────────────────
  const { columns: headerColumns, widths } = buildTableColumns(values)

  // ─── 8. All participant rows (empty placeholder rows) ────────────────────────
  const participantRows = generateParticipantRows(values)
  const totalParticipants = participantRows.length

  // ─── 9. Signatories ──────────────────────────────────────────────────────────
  const signatories = collectSignatories(values)
  const totalSignatories = signatories.length
  const signatureBlock: any = buildSignatureBlock(signatories, isPortrait)
  const signatureHeightVal = estimateSignatureHeight(signatories, isPortrait)

  // ─── 10. Pagination algorithm ────────────────────────────────────────────────
  //
  //  STRATEGY:
  //    • Pages 1 … (n-1) → FULL  (maxRowsPerPage baris per halaman)
  //    • Page n (terakhir) → LEBIH SEDIKIT baris + blok tanda tangan
  //    • Jika baris sisa di halaman terakhir melebihi kapasitas + tanda tangan,
  //      tanda tangan dipindah ke halaman khusus tersendiri.
  //
  //  maxRowsPerPage  = jumlah baris yang muat di halaman penuh (tanpa tanda tangan)
  //  maxRowsWithSig  = jumlah baris yang muat di halaman BERSAMAAN tanda tangan

  let participantPages: any[][] = []
  let signatureOnLastDataPage = false
  let needsDedicatedSigPage = false

  if (totalParticipants === 0 && totalSignatories === 0) {
    // ── Kasus 1: Kosong total ──
    participantPages = [[]]
  } else if (totalSignatories === 0) {
    // ── Kasus 2: Tidak ada tanda tangan → isi penuh semua halaman ──
    participantPages = chunkArray(participantRows, maxRowsPerPage)
  } else {
    // ── Kasus 3: Ada tanda tangan ──
    const maxRowsWithSig = Math.max(
      0,
      Math.floor((availableForContent - ESTIMATED.tableHeader - signatureHeightVal) / rowUnitCost)
    )

    if (totalParticipants === 0) {
      // Tidak ada data peserta, hanya tanda tangan
      participantPages = [[]]
      signatureOnLastDataPage = true
    } else if (totalParticipants <= maxRowsWithSig) {
      // Semua muat di satu halaman bersama tanda tangan
      participantPages = [participantRows]
      signatureOnLastDataPage = true
    } else {
      // ── Perlu beberapa halaman ──
      //  Isi halaman 1..(n-1) penuh dengan maxRowsPerPage baris.
      //  Sisa baris → halaman terakhir bersama tanda tangan.
      //  Jika sisa > maxRowsWithSig → kurangi jumlah halaman penuh
      //  sampai sisa muat untuk tanda tangan, atau fallback ke halaman khusus.

      let numFullPages = Math.floor(totalParticipants / maxRowsPerPage)
      let lastPageRows = totalParticipants - numFullPages * maxRowsPerPage

      // Kurangi halaman penuh sampai halaman terakhir muat tanda tangan
      while (lastPageRows > maxRowsWithSig && numFullPages > 0) {
        numFullPages--
        lastPageRows = totalParticipants - numFullPages * maxRowsPerPage
      }

      if (lastPageRows > maxRowsWithSig) {
        // ── Fallback: bahkan satu halaman pun tidak cukup untuk semua baris + tanda tangan
        //    → isi semua halaman penuh, tanda tangan di halaman khusus.
        //    → ambil 3 baris terakhir dari halaman terakhir → gabung di halaman tanda tangan
        //      agar halaman tanda tangan tidak kosong.
        participantPages = chunkArray(participantRows, maxRowsPerPage)
        needsDedicatedSigPage = true
      } else {
        // ── Normal: halaman 1..(n-1) penuh, halaman terakhir sisa + tanda tangan ──
        participantPages = []
        for (let i = 0; i < numFullPages; i++) {
          participantPages.push(participantRows.slice(i * maxRowsPerPage, (i + 1) * maxRowsPerPage))
        }
        // Halaman terakhir: sisa baris (<= maxRowsWithSig)
        participantPages.push(participantRows.slice(numFullPages * maxRowsPerPage))
        signatureOnLastDataPage = true
      }
    }
  }

  // ─── 11. Table layout config ──────────────────────────────────────────────────
  const tableLayout = {
    paddingTop: (index: any) => (index === 0 ? 10 : rowPadding),
    paddingBottom: (index: any) => (index === 0 ? 10 : rowPadding),
    paddingLeft: () => 4,
    paddingRight: () => 4,
  }

  // ─── 12. Build content — tables + signature only ────────────────────────────
  //
  //  The repeating elements (letter header, title, event info) are handled by
  //  the `header` property of docDefinition — pdfmake renders them on EVERY
  //  page automatically.  This is the most reliable approach because the
  //  `header` zone is separate from the content flow and is never affected by
  //  page breaks or pagination.
  //
  //  The content array only contains participant tables and the signature block.
  //  Each table gets `pageBreak: 'before'` (except the first) so pdfmake
  //  places each table on its own page.

  const content: any[] = []

  participantPages.forEach((pageRows, pageIdx) => {
    const freshHeaders = headerColumns.map((col) => ({ ...col }))
    const freshWidths = [...widths]
    const table = buildParticipantTable(freshHeaders, freshWidths, pageRows, tableLayout)

    // Page break for all pages after the first
    if (pageIdx > 0) {
      table.pageBreak = 'before'
    }

    // Participant table (every page)
    if (pageRows.length > 0 || totalParticipants === 0) {
      content.push(table)
    }

    // Signature block on the last data page
    const isLastPage = pageIdx === participantPages.length - 1
    if (isLastPage && signatureOnLastDataPage && totalSignatories > 0) {
      content.push(signatureBlock)
    }
  })

  // ── Dedicated signature page (if needed) ──
  //  Ambil 3 baris terakhir dari halaman data terakhir → pindahkan ke halaman
  //  tanda tangan agar tidak kosong.  Tampilkan sebagai tabel mini + tanda tangan.
  if (needsDedicatedSigPage && totalSignatories > 0) {
    const LAST_ROWS_MOVE_COUNT = 3
    const lastPageIndex = participantPages.length - 1
    const lastPage = participantPages[lastPageIndex]

    // Ambil 3 baris terakhir (atau lebih sedikit jika kurang dari 3)
    const moveCount = Math.min(LAST_ROWS_MOVE_COUNT, lastPage.length)
    const movedRows = lastPage.splice(lastPage.length - moveCount, moveCount)

    // Hapus halaman terakhir jika kosong setelah dipindah
    if (lastPage.length === 0) {
      participantPages.pop()
    }

    // Render ulang content: semua halaman data (yang sudah dikurangi)
    // ────────────────────────── re-render tables ──────────────────────────
    content.length = 0

    participantPages.forEach((pageRows, pageIdx) => {
      const freshHeaders = headerColumns.map((col) => ({ ...col }))
      const freshWidths = [...widths]
      const table = buildParticipantTable(freshHeaders, freshWidths, pageRows, tableLayout)

      if (pageIdx > 0) {
        table.pageBreak = 'before'
      }

      if (pageRows.length > 0 || totalParticipants === 0) {
        content.push(table)
      }
    })

    // ── Halaman khusus tanda tangan: 3 baris data + tanda tangan ──
    if (movedRows.length > 0) {
      // Buat tabel mini dari baris yang dipindah + header kolom
      const freshHeaders = headerColumns.map((col) => ({ ...col }))
      const freshWidths = [...widths]
      const miniTable = buildParticipantTable(freshHeaders, freshWidths, movedRows, tableLayout)
      miniTable.pageBreak = 'before'
      content.push(miniTable)
    } else {
      // Tidak ada baris yang bisa dipindah (semua peserta = 0 tapi ada tanda tangan)
      content.push({ text: '', pageBreak: 'before' })
    }

    // Tanda tangan di bawah tabel mini
    content.push(signatureBlock)
  }

  // ─── 13. Assemble document definition ────────────────────────────────────────
  const now = new Date()
  const formattedDate = format(now, 'EEEE, dd MMMM yyyy HH:mm', { locale: id })

  const docDefinition: any = {
    pageOrientation: values.hasil_cetak,
    pageMargins: [MARGIN_PAGE.left, topMargin, MARGIN_PAGE.right, MARGIN_PAGE.bottom],

    // ── Repeating header on EVERY page ────────────────────────────────────────
    //  pdfmake calls this function for each page.  The returned elements are
    //  rendered at the top of the page in the header zone (above content area).
    //  This guarantees the letter header, title, and event info appear on ALL
    //  pages — regardless of page breaks, content overflow, or pagination.
    header: (_currentPage: number) => {
      const headerItems: any[] = []
      if (letterHeaderContent.length > 0) {
        headerItems.push(...letterHeaderContent)
      }
      headerItems.push({ text: 'DAFTAR HADIR', style: 'title', margin: [0, 0, 0, 5] })
      headerItems.push(buildEventInfo(event))
      return headerItems
    },

    // ── Footer ────────────────────────────────────────────────────────────────
    footer: (currentPage: number, pageCount: number) => ({
      margin: [30, 0, 30, 0] as [number, number, number, number],
      columns: [
        {
          text: `Dicetak Pada : , ${formattedDate}`,
          fontSize: 9,
          color: '#666',
        },
        {
          text: `Halaman ${currentPage} dari ${pageCount}`,
          alignment: 'right' as const,
          fontSize: 9,
          color: '#666',
        },
      ],
    }),

    content,

    styles: {
      title: {
        fontSize: 16,
        bold: true,
        alignment: 'center' as const,
      },
      tableHeader: {
        bold: true,
        alignment: 'center' as const,
      },
    },
  }

  return { docDefinition }
}
