/* eslint-disable @typescript-eslint/no-explicit-any */
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { AttendanceSettingType } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/resolver.tsx'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types.ts'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

// ─── Types ──────────────────────────────────────────────────────────────────

interface GenerateAttendancePdfProps {
  event: any
  values: AttendanceSettingType
  header?: ILetterHeader
  imageUrl?: string
}

type PdfOrientation = 'portrait' | 'landscape'

type ColumnDef = {
  key: keyof AttendanceSettingType
  label: string
  width?: string | number
}

type BuildTableOptions = {
  startIndex?: number
  rowCount?: number
  showHeader?: boolean
  targetRowCount?: number
  maxLineCount?: number
  rowHeight?: number
}

type SignatoryItem = {
  label: string
  nama: string
  jabatan: string
}

type PaginationMetrics = {
  firstPageWithSignature: number
  firstPageWithoutSignature: number
  nextPageWithoutSignature: number
  finalPageWithSignature: number
}

type RowChunk = {
  rowCount: number
  targetRowCount: number
  totalLineCount: number
  maxLineCount: number
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MIN_SIGNATURE_PAGE_ROWS = 3
const DEFAULT_CELL_FONT_SIZE = 9
const DEFAULT_ROW_VERTICAL_PADDING = 4
const LINE_HEIGHT_MULTIPLIER = 1.5

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
  { key: 'instansi', label: 'Instansi/Alamat', width: '18%' },
  { key: 'hp', label: 'No. HP', width: 60 },
  { key: 'email', label: 'Email', width: 60 },
  { key: 'jabatan', label: 'Jabatan', width: 60 },
  { key: 'tanda_tangan', label: 'TTD', width: 40 },
  { key: 'keterangan', label: 'Keterangan', width: 70 },
]

// ─── Row height helpers ─────────────────────────────────────────────────────

export function getBaseRowHeight(maxLineCount = 1) {
  return (
    Math.max(maxLineCount, 1) *
    DEFAULT_CELL_FONT_SIZE *
    LINE_HEIGHT_MULTIPLIER +
    2 * DEFAULT_ROW_VERTICAL_PADDING
  )
}

export function getDynamicRowHeight(
  rowCount: number,
  targetRowCount?: number,
  maxLineCount = 1,
) {
  const safeRowCount = Math.max(rowCount, 1)
  const safeTargetRowCount = Math.max(targetRowCount || rowCount, safeRowCount)
  const baseRowHeight = getBaseRowHeight(maxLineCount)

  if (safeTargetRowCount <= safeRowCount) {
    return baseRowHeight
  }

  const missingRows = safeTargetRowCount - safeRowCount
  const extraHeightPerRenderedRow = (missingRows * baseRowHeight) / safeRowCount

  return Number((baseRowHeight + extraHeightPerRenderedRow).toFixed(2))
}

// ─── Build table element from column map + row count ────────────────────────

function buildTable(values: AttendanceSettingType, options: BuildTableOptions = {}) {
  const activeColumns = COLUMN_MAP.filter((col) => Boolean(values[col.key]))
  const totalRows = Math.max(Number(values.jumlah_peserta) || 0, 0)
  const startIndex = Math.max(options.startIndex || 0, 0)
  const showHeader = options.showHeader ?? true
  const availableRows = Math.max(totalRows - startIndex, 0)
  const rowCount = Math.min(options.rowCount ?? availableRows, availableRows)
  const fixedRowHeight =
    options.rowHeight ??
    getDynamicRowHeight(rowCount, options.targetRowCount, options.maxLineCount)

  const headerRow = activeColumns.map((col) => ({
    text: col.label,
    style: 'tableHeader',
    alignment: 'center' as const,
  }))

  const bodyRows = Array.from({ length: rowCount }).map((_, idx) =>
    activeColumns.map((col) => {
      if (col.key === 'nomor') {
        return {
          text: String(startIndex + idx + 1),
          alignment: 'center' as const,
          style: 'tableCell' as const,
        }
      }

      return { text: ' ', style: 'tableCell' as const }
    }),
  )

  return {
    table: {
      headerRows: showHeader ? 1 : 0,
      widths: activeColumns.map((c) => c.width ?? '*'),
      body: showHeader ? [headerRow, ...bodyRows] : bodyRows,
      dontBreakRows: true,
      keepWithHeaderRows: showHeader ? 1 : 0,
      heights: (rowIndex: number) => {
        if (showHeader && rowIndex === 0) return 'auto' as any
        return fixedRowHeight
      },
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 4,
      paddingRight: () => 4,
      paddingTop: () => DEFAULT_ROW_VERTICAL_PADDING,
      paddingBottom: () => DEFAULT_ROW_VERTICAL_PADDING,
    },
  }
}

// ─── Build kop surat header (letterhead with logo + text lines) ──────────────

function buildKopSuratHeader(header?: ILetterHeader, imageUrl?: string) {
  const kopContent = buildKopSuratContent(header ?? null, imageUrl)
  if (!kopContent) return null

  return {
    margin: [40, 30, 40, 0] as [number, number, number, number],
    stack: kopContent,
  }
}

// ─── Build event info section ────────────────────────────────────────────────

function buildAcaraInfoSection(nama_kegiatan: string, event: any) {
  return {
    margin: [0, 0, 0, 10] as [number, number, number, number],
    stack: [
      {
        text: 'DAFTAR HADIR',
        style: 'title' as const,
        alignment: 'center' as const,
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },
      {
        text: `${nama_kegiatan?.toUpperCase() || ''}`,
        style: 'title' as const,
        alignment: 'center' as const,
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },
      {
        table: {
          widths: ['20%', '*'],
          body: [
            [
              { text: 'Tanggal', fontSize: 10 },
              {
                text: `: ${
                  event?.tanggal_mulai
                    ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
                    : '-'
                }${
                  event?.tanggal_mulai &&
                  event?.tanggal_selesai &&
                  event.tanggal_mulai !== event.tanggal_selesai
                    ? ` s.d ${format(new Date(event.tanggal_selesai), 'EEEE, dd MMMM yyyy', { locale: id })}`
                    : ''
                }`,
                fontSize: 10,
              },
            ],
            [
              { text: 'Waktu', fontSize: 10 },
              { text: `: ${event?.waktu || '-'}`, fontSize: 10 },
            ],
            [
              { text: 'Tempat', fontSize: 10 },
              { text: `: ${event?.tempat || '-'}`, fontSize: 10 },
            ],
            [
              { text: 'Penyelenggara', fontSize: 10 },
              { text: `: ${event?.penyelenggara || '-'}`, fontSize: 10 },
            ],
          ],
        },
        layout: 'noBorders',
      },
    ],
  }
}

// ─── Split array into chunks ─────────────────────────────────────────────────

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = []

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }

  return result
}

// ─── Filter out empty signatories ────────────────────────────────────────────

function getVisiblePenandatanganList(list: SignatoryItem[] = []) {
  return list.filter((item) => {
    return [item?.label, item?.nama, item?.jabatan].some(
      (value) => value && value.trim() !== '',
    )
  })
}

// ─── Pagination metrics per orientation ──────────────────────────────────────

function getPaginationMetrics(
  orientation: PdfOrientation,
  additionalPenandatanganRowCount: number,
): PaginationMetrics {
  if (orientation === 'landscape') {
    return {
      firstPageWithSignature: Math.max(
        1,
        8 - additionalPenandatanganRowCount * 2,
      ),
      firstPageWithoutSignature: 12,
      nextPageWithoutSignature: 12,
      finalPageWithSignature: Math.max(
        MIN_SIGNATURE_PAGE_ROWS,
        5 - additionalPenandatanganRowCount * 2,
      ),
    }
  }

  const portraitPageWithoutSignature = Math.max(
    MIN_SIGNATURE_PAGE_ROWS,
    16 - additionalPenandatanganRowCount * 2,
  )

  return {
    firstPageWithSignature: Math.max(
      MIN_SIGNATURE_PAGE_ROWS,
      12 - additionalPenandatanganRowCount * 3,
    ),
    firstPageWithoutSignature: portraitPageWithoutSignature,
    nextPageWithoutSignature: portraitPageWithoutSignature,
    finalPageWithSignature: Math.max(
      MIN_SIGNATURE_PAGE_ROWS,
      12 - additionalPenandatanganRowCount * 3,
    ),
  }
}

// ─── Distribute rows across pages ────────────────────────────────────────────

function buildRowChunks(
  totalRows: number,
  rowLineCounts: number[],
  metrics: PaginationMetrics,
): RowChunk[] {
  if (totalRows <= 0) return []

  const totalLineCount = rowLineCounts.reduce((a, b) => a + b, 0)
  const maxLineCount = Math.max(...rowLineCounts, 1)

  if (totalRows <= metrics.firstPageWithSignature) {
    return [
      {
        rowCount: totalRows,
        targetRowCount: metrics.firstPageWithSignature,
        totalLineCount,
        maxLineCount,
      },
    ]
  }

  const chunks: RowChunk[] = []
  let currentIdx = 0

  const pushChunk = (rowCount: number, targetRowCount: number) => {
    if (rowCount <= 0) return

    const chunkLines = rowLineCounts.slice(currentIdx, currentIdx + rowCount)
    chunks.push({
      rowCount,
      targetRowCount,
      totalLineCount: chunkLines.reduce((a, b) => a + b, 0),
      maxLineCount: Math.max(...chunkLines, 1),
    })
    currentIdx += rowCount
  }

  const getCapacities = (pageCount: number) => [
    metrics.firstPageWithoutSignature,
    ...Array.from(
      { length: Math.max(pageCount - 2, 0) },
      () => metrics.nextPageWithoutSignature,
    ),
    metrics.finalPageWithSignature,
  ]

  let pageCount = 2
  let capacities = getCapacities(pageCount)

  while (totalRows > capacities.reduce((sum, value) => sum + value, 0)) {
    pageCount += 1
    capacities = getCapacities(pageCount)
  }

  const capacitiesBeforeLast = capacities.slice(0, -1)
  const maxRowsBeforeLast = capacitiesBeforeLast.reduce(
    (sum, value) => sum + value,
    0,
  )
  const minFinalRows = Math.max(1, totalRows - maxRowsBeforeLast)
  const preferredFinalRows = Math.min(
    3,
    metrics.finalPageWithSignature,
    totalRows - 1,
  )
  const finalPageRows = Math.max(minFinalRows, preferredFinalRows)

  let rowsBeforeLast = totalRows - finalPageRows

  capacitiesBeforeLast.forEach((capacity, index) => {
    const rowCount = Math.min(rowsBeforeLast, capacity)
    pushChunk(
      rowCount,
      index === 0
        ? metrics.firstPageWithoutSignature
        : metrics.nextPageWithoutSignature,
    )
    rowsBeforeLast -= rowCount
  })

  pushChunk(finalPageRows, metrics.finalPageWithSignature)

  return chunks
}

// ─── Build additional penandatangan (saksi) section ──────────────────────────

function buildPenandatanganSection(list: SignatoryItem[], orientation: PdfOrientation) {
  const visibleList = getVisiblePenandatanganList(list)

  if (!visibleList.length) return null

  const maxPerRow = orientation === 'landscape' ? 5 : 3
  const rows = chunkArray(visibleList, maxPerRow)

  return {
    margin: [0, 24, 0, 0] as [number, number, number, number],
    stack: rows.map((row, rowIndex) => {
      const itemCount = row.length
      const rowMargin = [0, 0, 0, rowIndex === rows.length - 1 ? 0 : 20] as [
        number,
        number,
        number,
        number,
      ]

      if (itemCount === 1) {
        return {
          unbreakable: true,
          columns: [
            { width: '*', text: '' },
            {
              width: 'auto',
              stack: [
                {
                  text: row[0]?.label || '',
                  bold: true,
                  alignment: 'center' as const,
                },
                {
                  text: row[0]?.jabatan ? `${row[0].jabatan},` : '',
                  alignment: 'center' as const,
                  bold: true,
                  margin: [0, 0, 0, 48] as [number, number, number, number],
                },
                {
                  text: row[0]?.nama || '',
                  bold: true,
                  alignment: 'center' as const,
                },
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
            {
              text: item?.label || '',
              bold: true,
              alignment: 'center' as const,
            },
            {
              text: item?.jabatan ? `${item.jabatan},` : '',
              alignment: 'center' as const,
              bold: true,
              margin: [0, 0, 0, 48] as [number, number, number, number],
            },
            {
              text: item?.nama || '',
              bold: true,
              alignment: 'center' as const,
            },
          ],
        })),
        columnGap: 20,
        margin: rowMargin,
      }
    }),
  }
}

// ─── Build main penandatangan (diketahui / mengetahui) columns ───────────────

function buildMainPenandatangan(
  values: AttendanceSettingType,
  orientation: PdfOrientation,
  hasAdditionalPenandatangan: boolean,
) {
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

  const isMengetahuiValid = !!(
    values.nama_mengetahui && values.jabatan_mengetahui
  )

  const activePenandatangan = isMengetahuiValid ? penandatangan : [penandatangan[1]]
  const columnGap = orientation === 'landscape' ? 40 : 20

  return {
    unbreakable: true,
    columns: activePenandatangan.map((item) => ({
      width: '*',
      stack: [
        {
          text: item?.label || '',
          alignment: 'center' as const,
        },
        {
          text: item?.jabatan ? `${item.jabatan},` : '',
          alignment: 'center' as const,
          bold: true,
          margin: [0, 0, 0, 48] as [number, number, number, number],
        },
        {
          text: item?.nama || '',
          bold: true,
          alignment: 'center' as const,
        },
      ],
    })),
    columnGap,
    margin: [0, 24, 0, hasAdditionalPenandatangan ? 24 : 0] as [
      number,
      number,
      number,
      number,
    ],
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

export const generatePreviewAttendancePdf2 = ({
  event,
  values,
  header,
  imageUrl,
}: GenerateAttendancePdfProps) => {
  // ─── 1. Resolve imageUrl ──────────────────────────────────────────────────
  const resolvedImageUrl =
    imageUrl || (header?.url_logo?.startsWith('data:') ? header.url_logo : undefined)

  // ─── 2. Orientation ───────────────────────────────────────────────────────
  const orientation: PdfOrientation =
    values.hasil_cetak === 'PORTRAIT' ? 'portrait' : 'landscape'

  // ─── 3. Kop surat resolved data (rebuilt fresh per page in header) ────────

  // ─── 4. Additional penandatangan (saksi) ──────────────────────────────────
  const additionalPenandatangan: SignatoryItem[] = (values.saksi_pendatang || []).map((s) => ({
    label: s.label || '',
    nama: s.nama || '',
    jabatan: s.jabatan || '',
  }))

  const visibleAdditionalPenandatangan = getVisiblePenandatanganList(additionalPenandatangan)
  const maxPenandatanganPerRow = orientation === 'landscape' ? 5 : 3
  const additionalPenandatanganRowCount = Math.ceil(
    visibleAdditionalPenandatangan.length / maxPenandatanganPerRow,
  )

  // ─── 5. Pagination metrics ────────────────────────────────────────────────
  const paginationMetrics = getPaginationMetrics(orientation, additionalPenandatanganRowCount)
  const additionalPenandatanganSection = buildPenandatanganSection(
    visibleAdditionalPenandatangan,
    orientation,
  )

  // ─── 6. Row chunks ────────────────────────────────────────────────────────
  const totalRows = Math.max(Number(values.jumlah_peserta) || 0, 0)
  const rowLineCounts = Array.from({ length: totalRows }, () => 1)
  const globalMaxLineCount = Math.max(...rowLineCounts, 1)
  const rowChunks = buildRowChunks(totalRows, rowLineCounts, paginationMetrics)

  const uniformRowHeight =
    rowChunks.length <= 1
      ? getDynamicRowHeight(
          rowChunks[0]?.rowCount || 0,
          rowChunks[0]?.targetRowCount || paginationMetrics.firstPageWithSignature,
          globalMaxLineCount,
        )
      : getBaseRowHeight(globalMaxLineCount)

  // ─── 7. Build content (tables + signatures) ───────────────────────────────
  const tableAndSignatureContent: any[] = []

  if (orientation === 'landscape') {
    tableAndSignatureContent.push(
      buildAcaraInfoSection(event?.nama_kegiatan || 'DAFTAR HADIR', event),
    )
  }

  if (rowChunks.length) {
    let startIndex = 0

    rowChunks.forEach((currentChunk, index) => {
      const isLastChunk = index === rowChunks.length - 1
      const tableBlock = buildTable(values, {
        startIndex,
        rowCount: currentChunk.rowCount,
        showHeader: true,
        targetRowCount: currentChunk.targetRowCount,
        maxLineCount: Math.max(currentChunk.maxLineCount, globalMaxLineCount),
        rowHeight: uniformRowHeight,
      })

      if (isLastChunk) {
        tableAndSignatureContent.push(
          ...[
            tableBlock,
            buildMainPenandatangan(
              values,
              orientation,
              !!additionalPenandatanganSection,
            ),
            additionalPenandatanganSection,
          ].filter(Boolean),
        )
      } else {
        tableAndSignatureContent.push({
          ...tableBlock,
          pageBreak: 'after',
        })
      }

      startIndex += currentChunk.rowCount
    })
  } else {
    tableAndSignatureContent.push(
      ...[
        buildTable(values, {
          rowCount: 0,
          showHeader: true,
          targetRowCount: paginationMetrics.firstPageWithSignature,
          maxLineCount: 1,
          rowHeight: uniformRowHeight,
        }),
        buildMainPenandatangan(
          values,
          orientation,
          !!additionalPenandatanganSection,
        ),
        additionalPenandatanganSection,
      ].filter(Boolean),
    )
  }

  // ─── 8. Assemble document definition ──────────────────────────────────────
  const docDefinition: any = {
    pageSize: 'A4',
    pageOrientation: orientation,
    pageMargins: PAGE_MARGINS[orientation],

    header: () => {
      const freshKop = buildKopSuratHeader(header, resolvedImageUrl)

      if (orientation === 'portrait') {
        return {
          ...(freshKop ?? {}),
          stack: [
            ...(freshKop?.stack ?? []),
            buildAcaraInfoSection(event?.nama_kegiatan || 'DAFTAR HADIR', event),
          ],
        }
      }

      return freshKop
    },

    content: tableAndSignatureContent,

    footer: (currentPage: number, pageCount: number) => ({
      margin: [40, 0, 40, 10] as [number, number, number, number],
      columns: [
        {
          text: `Dicetak pada ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`,
          fontSize: 8,
          color: '#666666',
        },
        {
          text: `Halaman ${currentPage} dari ${pageCount}`,
          alignment: 'right' as const,
          fontSize: 8,
          bold: true,
          color: '#666666',
        },
      ],
    }),

    styles: {
      title: {
        fontSize: 12,
        bold: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
      },
    },

    defaultStyle: {
      fontSize: 9,
    },
  }

  return { docDefinition }
}
