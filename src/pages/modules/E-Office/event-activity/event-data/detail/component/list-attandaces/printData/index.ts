import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { AttendanceSettingType } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/resolver.tsx'
import type {
  ILetterHeader,
  ISettingLetterHeader,
} from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import type {
  ICetakConfig,
  IDaftarHadir,
} from '@/pages/modules/E-Office/event-activity/event-data/detail/component/list-attandaces/printData/types.ts'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

// ─── Types ───────────────────────────────────────────────────────────────────
interface GenerateAttendancePdfProps {
  event: IEvent
  values: ICetakConfig
  header?: ILetterHeader
  attendance: IDaftarHadir[]
  imageUrl?: string
}

type PdfOrientation = 'portrait' | 'landscape'

interface ColumnDef {
  key: keyof AttendanceSettingType
  label: string
  width: string | number
}

interface SignatoryItem {
  label: string
  nama: string
  jabatan: string
}

interface PaginationMetrics {
  firstPageWithSignature: number
  firstPageWithoutSignature: number
  nextPageWithoutSignature: number
  finalPageWithSignature: number
}

interface RowChunk {
  rowCount: number
  targetRowCount: number
}

// ─── Constants ───────────────────────────────────────────────────────────────
const MIN_SIGNATURE_PAGE_ROWS = 3
const DEFAULT_CELL_FONT_SIZE = 9
const DEFAULT_ROW_VERTICAL_PADDING = 4

const HEADER_TOP_MARGIN: Record<PdfOrientation, number> = {
  portrait: 300,
  landscape: 110,
}

const PAGE_MARGINS: Record<PdfOrientation, [number, number, number, number]> = {
  portrait: [40, HEADER_TOP_MARGIN.portrait, 40, 20],
  landscape: [40, HEADER_TOP_MARGIN.landscape, 40, 20],
}

const COLUMN_MAP: ColumnDef[] = [
  { key: 'nomor', label: 'No', width: 'auto' },
  { key: 'nama_peserta', label: 'Nama Peserta', width: '*' },
  { key: 'instansi', label: 'Instansi/Alamat', width: '*' },
  { key: 'hp', label: 'HP', width: 'auto' },
  { key: 'email', label: 'Email', width: 75 },
  { key: 'jabatan', label: 'Jabatan', width: 60 },
  { key: 'tanda_tangan', label: 'TTD', width: 40 },
  { key: 'keterangan', label: 'Keterangan', width: 55 },
]

const LOGO_SIZE = 72
// const LOGO_COLUMN_WIDTH = 90
//
// const mapStyle = ({ font, style, size }: { font: string; style: string; size: string }) => {
//   const safeFont = font && font.trim() !== '' ? font : 'Roboto'
//
//   return {
//     font: safeFont,
//     bold: style?.toLowerCase() === 'bold',
//     italics: style?.toLowerCase() === 'italic',
//     fontSize: parseInt(size) || 10,
//   }
// }

// ─── Utility: get valid pdfmake font name ────────────────────────────────────
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

// ─── Dynamic table padding based on row count ────────────────────────────────
const getDynamicTablePadding = (rowCount: number, targetRowCount?: number): number => {
  const safeRowCount = Math.max(rowCount, 1)
  const safeTargetRowCount = Math.max(targetRowCount || rowCount, safeRowCount)

  if (safeTargetRowCount <= safeRowCount) {
    return DEFAULT_ROW_VERTICAL_PADDING
  }

  const missingRows = safeTargetRowCount - safeRowCount
  const baselineRowHeight = DEFAULT_CELL_FONT_SIZE + DEFAULT_ROW_VERTICAL_PADDING * 2
  const extraHeightPerRenderedRow = (missingRows * baselineRowHeight) / safeRowCount
  const extraPaddingPerSide = extraHeightPerRenderedRow / 2

  return Number((DEFAULT_ROW_VERTICAL_PADDING + extraPaddingPerSide).toFixed(2))
}

// ─── Build table element from column map + row count ─────────────────────────
const buildTable = (
  values: AttendanceSettingType,
  attendance: IDaftarHadir[],
  options: {
    startIndex?: number
    rowCount?: number
    showHeader?: boolean
    targetRowCount?: number
    verticalPadding?: number
  } = {}
) => {
  const activeColumns = COLUMN_MAP.filter((col) => {
    return Boolean(values[col.key])
  })

  const totalRows = Math.max(attendance.length || 0, 0)
  const startIndex = Math.max(options.startIndex || 0, 0)
  const showHeader = options.showHeader ?? true
  const availableRows = Math.max(totalRows - startIndex, 0)
  const rowCount = Math.min(options.rowCount ?? availableRows, availableRows)
  const verticalPadding =
    options.verticalPadding ?? getDynamicTablePadding(rowCount, options.targetRowCount)

  const headerRow = activeColumns.map((col) => ({
    text: col.label,
    style: 'tableHeader',
    alignment: 'center' as const,
  }))

  // Slice attendance data for this page
  const dataForPage = attendance.slice(startIndex, startIndex + rowCount)

  const bodyRows = dataForPage.map((item, idx) =>
    activeColumns.map((col) => {
      const displayIdx = startIndex + idx

      switch (col.key) {
        case 'nomor':
          return {
            text: String(displayIdx + 1),
            alignment: 'center' as const,
            style: 'tableCell' as const,
          }
        case 'nama_peserta':
          return { text: item.nama_lengkap || ' ', style: 'tableCell' as const }
        case 'instansi':
          return {
            text: item.nama_unit_kerja || item.nama_unit || ' ',
            style: 'tableCell' as const,
          }
        case 'hp':
          return { text: item.no_hp || ' ', style: 'tableCell' as const }
        case 'email':
          return { text: ' ', style: 'tableCell' as const }
        case 'jabatan':
          return { text: item.jabatan || ' ', style: 'tableCell' as const }
        case 'tanda_tangan':
          return { text: ' ', style: 'tableCell' as const }
        case 'keterangan':
          return { text: ' ', style: 'tableCell' as const }
        default:
          return { text: ' ', style: 'tableCell' as const }
      }
    })
  )

  // Fill remaining rows (padding) if less data than rowCount
  const remainingRows = Math.max(rowCount - dataForPage.length, 0)
  for (let i = 0; i < remainingRows; i++) {
    const emptyIdx = startIndex + dataForPage.length + i
    bodyRows.push(
      activeColumns.map((col) => {
        if (col.key === 'nomor') {
          return {
            text: String(emptyIdx + 1),
            alignment: 'center' as const,
            style: 'tableCell' as const,
          }
        }
        return { text: ' ', style: 'tableCell' as const }
      })
    )
  }

  return {
    table: {
      headerRows: showHeader ? 1 : 0,
      widths: activeColumns.map((c) => c.width),
      body: showHeader ? [headerRow, ...bodyRows] : bodyRows,
      dontBreakRows: true,
      keepWithHeaderRows: showHeader ? 1 : 0,
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => verticalPadding,
      paddingBottom: () => verticalPadding,
    },
  }
}

// ─── Build kop surat header (letterhead with logo + text lines) ──────────────
const buildKopSuratHeader = (header?: ILetterHeader, imageUrl?: string) => {
  if (!header) return null

  const contentTexts = (header.pengaturan || []).map((setting: ISettingLetterHeader) => ({
    text: setting.isi,
    alignment: 'center' as const,
    font: getValidFont(setting.jenis_font),
    fontSize: Number(setting.ukuran_font) || 12,
  }))

  if (contentTexts.length === 0 && !imageUrl) return null

  // Shared separator line
  const separatorLine = {
    table: {
      widths: ['*'],
      body: [
        [
          {
            text: '',
            border: [false, false, false, true] as [boolean, boolean, boolean, boolean],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 1.5,
      vLineWidth: () => 0,
    },
    margin: [0, 0, 0, 20] as [number, number, number, number],
  }

  // ── No image: just text centered ──
  if (!imageUrl) {
    return {
      margin: [40, 30, 40, 0] as [number, number, number, number],
      stack: [
        {
          width: '*',
          alignment: 'center' as const,
          stack: contentTexts,
        },
        separatorLine,
      ],
    }
  }

  // ── With image: table with verticalAlignment to center logo + text ──
  return {
    margin: [40, 30, 40, 0] as [number, number, number, number],
    stack: [
      {
        table: {
          widths: [LOGO_SIZE, '*'],
          body: [
            [
              {
                image: imageUrl,
                width: LOGO_SIZE,
                height: LOGO_SIZE,
                alignment: 'center' as const,
                verticalAlignment: 'middle' as const,
              },
              {
                stack: contentTexts,
                alignment: 'center' as const,
                verticalAlignment: 'middle' as const,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: () => 0,
          paddingLeft: () => 0,
          paddingRight: () => 0,
          paddingTop: () => 0,
          paddingBottom: () => 0,
        },
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },
      separatorLine,
    ],
  }
}

// ─── Build event info section ────────────────────────────────────────────────
const buildAcaraInfoSection = (nama_kegiatan: string, event: any, isPortrait: boolean) => ({
  margin: [0, 0, 0, 10] as [number, number, number, number],
  stack: [
    {
      text: nama_kegiatan?.toUpperCase() || '',
      style: 'title' as const,
      alignment: 'center' as const,
      fontSize: 14,
      margin: [40, 0, 40, 5] as [number, number, number, number],
    },
    {
      table: {
        widths: ['auto', '*'],
        body: [
          [
            { text: 'Tanggal', alignment: 'left' as const, noWrap: true, fontSize: 10 },
            {
              text: `: ${
                event?.tanggal_mulai
                  ? format(new Date(event.tanggal_mulai), 'dd MMMM yyyy', { locale: id })
                  : ''
              }${
                event?.tanggal_mulai &&
                event?.tanggal_selesai &&
                event.tanggal_mulai !== event.tanggal_selesai
                  ? ` s.d ${format(new Date(event.tanggal_selesai), 'dd MMMM yyyy', { locale: id })}`
                  : ''
              }`,
              alignment: 'left' as const,
              fontSize: 10,
            },
          ],
          [
            { text: 'Waktu', alignment: 'left' as const, noWrap: true, fontSize: 10 },
            { text: `: ${event?.waktu || '-'}`, alignment: 'left' as const, fontSize: 10 },
          ],
          [
            { text: 'Tempat', alignment: 'left' as const, noWrap: true, fontSize: 10 },
            { text: `: ${event?.tempat || '-'}`, alignment: 'left' as const, fontSize: 10 },
          ],
          [
            { text: 'Penyelenggara', alignment: 'left' as const, noWrap: true, fontSize: 10 },
            { text: `: ${event?.penyelenggara || '-'}`, alignment: 'left' as const, fontSize: 10 },
          ],
        ],
      },
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingLeft: () => (isPortrait ? 40 : 0),
        paddingRight: () => 4,
        paddingTop: () => 2,
        paddingBottom: () => 2,
      },
    },
  ],
})

// ─── Split array into chunks ─────────────────────────────────────────────────
const chunkArray = <T>(arr: T[], size: number): T[][] => {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

// ─── Filter out empty signatories ────────────────────────────────────────────
const getVisiblePenandatanganList = (list: SignatoryItem[] = []) =>
  list.filter((item) =>
    [item.label, item.nama, item.jabatan].some((value) => value && value.trim() !== '')
  )

// ─── Pagination metrics per orientation ──────────────────────────────────────
const getPaginationMetrics = (
  orientation: PdfOrientation,
  additionalPenandatanganRowCount: number
): PaginationMetrics => {
  if (orientation === 'landscape') {
    return {
      firstPageWithSignature: Math.max(1, 8 - additionalPenandatanganRowCount * 2),
      firstPageWithoutSignature: 12,
      nextPageWithoutSignature: 12,
      finalPageWithSignature: Math.max(
        MIN_SIGNATURE_PAGE_ROWS,
        5 - additionalPenandatanganRowCount * 2
      ),
    }
  }

  return {
    firstPageWithSignature: Math.max(1, 18 - additionalPenandatanganRowCount * 3),
    firstPageWithoutSignature: 24,
    nextPageWithoutSignature: 32,
    finalPageWithSignature: Math.max(
      MIN_SIGNATURE_PAGE_ROWS,
      12 - additionalPenandatanganRowCount * 3
    ),
  }
}

// ─── Distribute rows across pages using actual page capacities ───────────────
// Non-last pages always fill to max capacity; last page gets the remainder + signatures.
const buildRowChunks = (totalRows: number, metrics: PaginationMetrics): RowChunk[] => {
  if (totalRows <= 0) return []

  // Everything fits on the first page with signature
  if (totalRows <= metrics.firstPageWithSignature) {
    return [{ rowCount: totalRows, targetRowCount: metrics.firstPageWithSignature }]
  }

  const chunks: RowChunk[] = []
  let remaining = totalRows

  // First page: fill to firstPageWithoutSignature capacity
  const firstPageRows = Math.min(remaining, metrics.firstPageWithoutSignature)
  chunks.push({ rowCount: firstPageRows, targetRowCount: metrics.firstPageWithoutSignature })
  remaining -= firstPageRows

  // Intermediate pages (no signature): fill to capacity, leave at least 1 row for final page
  while (remaining > metrics.finalPageWithSignature) {
    const maxRowsThisPage = Math.min(
      remaining - 1, // reserve minimum 1 row for final page
      metrics.nextPageWithoutSignature
    )
    chunks.push({ rowCount: maxRowsThisPage, targetRowCount: metrics.nextPageWithoutSignature })
    remaining -= maxRowsThisPage
  }

  // Final page (with signature): remaining rows (1 to finalPageWithSignature)
  // Use finalPageWithSignature as target — it's calculated to leave room for TTD on same page
  if (remaining > 0) {
    chunks.push({ rowCount: remaining, targetRowCount: metrics.finalPageWithSignature })
  }

  return chunks
}

// ─── Build additional penandatangan (saksi) section ──────────────────────────
const buildPenandatanganSection = (list: SignatoryItem[], orientation: PdfOrientation) => {
  const visibleList = getVisiblePenandatanganList(list)

  if (!visibleList.length) return null

  const maxPerRow = orientation === 'landscape' ? 5 : 3
  const rows = chunkArray(visibleList, maxPerRow)

  return {
    margin: [0, 24, 0, 0] as [number, number, number, number],
    stack: rows.map((row, rowIndex) => {
      const rowMargin: [number, number, number, number] = [
        0,
        0,
        0,
        rowIndex === rows.length - 1 ? 0 : 20,
      ]

      if (row.length === 1) {
        return {
          unbreakable: true,
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              stack: [
                { text: row[0].label || '', bold: true, alignment: 'center' as const },
                {
                  text: row[0].jabatan ? `${row[0].jabatan},` : '',
                  alignment: 'center' as const,
                  bold: true,
                  margin: [0, 0, 0, 48] as [number, number, number, number],
                },
                { text: row[0].nama || '', bold: true, alignment: 'center' as const },
              ],
            },
            { width: '*', text: '' },
          ],
          margin: rowMargin,
        }
      }

      return {
        unbreakable: true,
        columns: row.map((item) => ({
          width: '*',
          stack: [
            { text: item.label || '', bold: true, alignment: 'center' as const },
            {
              text: item.jabatan ? `${item.jabatan},` : '',
              alignment: 'center' as const,
              bold: true,
              margin: [0, 0, 0, 48] as [number, number, number, number],
            },
            { text: item.nama || '', bold: true, alignment: 'center' as const },
          ],
        })),
        columnGap: 20,
        margin: rowMargin,
      }
    }),
  }
}

// ─── Build main penandatangan (diketahui / mengetahui) columns ───────────────
const buildMainPenandatangan = (
  values: AttendanceSettingType,
  orientation: PdfOrientation,
  hasAdditionalPenandatangan: boolean
) => {
  const penandatangan = [
    {
      label: values.label_mengetahui || '',
      nama: values.nama_mengetahui || '',
      jabatan: values.jabatan_mengetahui || '',
    },
    {
      label: values.label_diketahui || '',
      nama: values.nama_diketahui || '',
      jabatan: values.jabatan_diketahui || '',
    },
  ]

  // If "mengetahui" is empty, only show "diketahui"
  const isMengetahuiValid = !!(values.nama_mengetahui && values.jabatan_mengetahui)

  const activePenandatangan = isMengetahuiValid ? penandatangan : [penandatangan[1]]

  const columnGap = orientation === 'landscape' ? 40 : 20

  return {
    unbreakable: true,
    columns: activePenandatangan.map((item) => ({
      width: '*',
      alignment: 'center' as const,
      stack: [
        {
          text: item.label || '',
          bold: true,
          alignment: activePenandatangan.length === 1 ? 'left' : ('center' as const),
          margin: [
            activePenandatangan.length === 1 && orientation === 'portrait'
              ? 220
              : activePenandatangan.length === 1 && orientation === 'landscape'
                ? 330
                : 0,
            0,
            0,
            0,
          ] as [number, number, number, number],
        },
        {
          text: item.jabatan ? `${item.jabatan},` : '',
          alignment: activePenandatangan.length === 1 ? 'left' : ('center' as const),
          bold: true,
          margin: [
            activePenandatangan.length === 1 && orientation === 'portrait'
              ? 220
              : activePenandatangan.length === 1 && orientation === 'landscape'
                ? 330
                : 0,
            0,
            0,
            48,
          ] as [number, number, number, number],
        },
        {
          text: item.nama || '',
          bold: true,
          alignment: activePenandatangan.length === 1 ? 'left' : ('center' as const),
          margin: [
            activePenandatangan.length === 1 && orientation === 'portrait'
              ? 220
              : activePenandatangan.length === 1 && orientation === 'landscape'
                ? 330
                : 0,
            0,
            0,
            0,
          ] as [number, number, number, number],
        },
      ],
    })),
    columnGap,
    margin: [0, 24, 0, hasAdditionalPenandatangan ? 24 : 0] as [number, number, number, number],
  }
}

export const GenerateListAttendance = ({
  event,
  values,
  header,
  imageUrl,
  attendance,
}: GenerateAttendancePdfProps) => {
  // ─── 1. Resolve imageUrl ─────────────────────────────────────────────────────
  const resolvedImageUrl =
    imageUrl || (header?.url_logo?.startsWith('data:') ? header.url_logo : undefined)

  // ─── 2. Orientation ──────────────────────────────────────────────────────────
  const isPortrait = values.hasil_cetak === 'PORTRAIT'
  const orientation: PdfOrientation = isPortrait ? 'portrait' : 'landscape'

  // ─── 3. Letter header ─────────────────────────────────────────────────────────
  const kopSuratHeader = buildKopSuratHeader(header, resolvedImageUrl)

  // ─── 4. Additional penandatangan (saksi) ─────────────────────────────────────
  const additionalPenandatangan: SignatoryItem[] = (values.saksi_pendatang || []).map((s) => ({
    label: s.label || '',
    nama: s.nama || '',
    jabatan: s.jabatan || '',
  }))

  const visibleAdditionalPenandatangan = getVisiblePenandatanganList(additionalPenandatangan)
  const maxPenandatanganPerRow = orientation === 'landscape' ? 5 : 3
  const additionalPenandatanganRowCount = Math.ceil(
    visibleAdditionalPenandatangan.length / maxPenandatanganPerRow
  )

  // ─── 5. Pagination metrics ───────────────────────────────────────────────────
  const paginationMetrics = getPaginationMetrics(orientation, additionalPenandatanganRowCount)
  const additionalPenandatanganSection = buildPenandatanganSection(
    visibleAdditionalPenandatangan,
    orientation
  )

  // ─── 6. Row chunks ───────────────────────────────────────────────────────────
  const totalRows = Math.max(attendance?.length || 0, 0)
  const rowChunks = buildRowChunks(totalRows, paginationMetrics)

  // ─── 7. Build content (tables + signatures) ──────────────────────────────────
  const tableAndSignatureContent: any[] = []

  // Helper: build items for one page, optionally prepending event info (landscape)
  const buildPageItems = (
    chunkRowCount: number,
    chunkStartIndex: number,
    chunkTargetRowCount: number,
    includeSignature: boolean
  ) => {
    const items: any[] = []

    // Landscape: event info di setiap halaman via content (bukan header)
    if (!isPortrait) {
      items.push(buildAcaraInfoSection(event?.nama_kegiatan || 'DAFTAR HADIR', event, isPortrait))
    }

    items.push(
      buildTable(values, attendance, {
        startIndex: chunkStartIndex,
        rowCount: chunkRowCount,
        showHeader: true,
        targetRowCount: chunkTargetRowCount,
      })
    )

    if (includeSignature) {
      items.push(buildMainPenandatangan(values, orientation, !!additionalPenandatanganSection))
      items.push(additionalPenandatanganSection)
    }

    return items.filter(Boolean)
  }

  if (rowChunks.length) {
    let startIndex = 0

    rowChunks.forEach((currentChunk, index) => {
      const isLastChunk = index === rowChunks.length - 1

      if (isLastChunk) {
        tableAndSignatureContent.push(
          ...buildPageItems(currentChunk.rowCount, startIndex, currentChunk.targetRowCount, true)
        )
      } else {
        tableAndSignatureContent.push({
          stack: buildPageItems(
            currentChunk.rowCount,
            startIndex,
            currentChunk.targetRowCount,
            false
          ),
          pageBreak: 'after',
        })
      }

      startIndex += currentChunk.rowCount
    })
  } else {
    tableAndSignatureContent.push(...buildPageItems(0, 0, 0, true))
  }

  // ─── 8. Assemble document definition ────────────────────────────────────────
  const now = new Date()
  const formattedDate = format(now, 'EEEE, dd MMMM yyyy HH:mm', { locale: id })

  const docDefinition: any = {
    pageSize: 'A4',
    pageOrientation: orientation,
    pageMargins: PAGE_MARGINS[orientation],

    // ── Repeating header on EVERY page ──────────────────────────────────────
    header: () => {
      const headerItems: any[] = []

      // Kop surat header (logo + text lines)
      if (kopSuratHeader) {
        headerItems.push(kopSuratHeader)
      }

      // Title
      headerItems.push({
        text: 'DAFTAR HADIR',
        style: 'title',
        fontSize: 12,
        alignment: 'center' as const,
        margin: [40, 0, 40, 5],
      })

      // Portrait: event info di header (cukup ruang dgn 300pt margin)
      if (isPortrait) {
        headerItems.push(
          buildAcaraInfoSection(event?.nama_kegiatan || 'DAFTAR HADIR', event, isPortrait)
        )
      }

      return headerItems
    },

    // ── Footer ──────────────────────────────────────────────────────────────
    footer: (currentPage: number, pageCount: number) => ({
      margin: [30, 0, 30, 0] as [number, number, number, number],
      columns: [
        {
          text: `Dicetak Pada : ${formattedDate}`,
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

    content: tableAndSignatureContent,

    styles: {
      title: {
        fontSize: 12,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        alignment: 'center' as const,
      },
      tableCell: {
        fontSize: 9,
      },
    },

    defaultStyle: {
      fontSize: 9,
    },
  }

  return { docDefinition }
}
