import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { AttendanceSettingType } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/resolver.tsx'

;(pdfMake as any).vfs = (pdfFonts as any).vfs

interface GenerateAttendancePdfProps {
  event: any
  values: AttendanceSettingType
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
    label: values.label_diketahui || 'Yang Diketahui',
    jabatan: values.jabatan_diketahui || '',
    nama: values.nama_diketahui || '',
  })

  // Mengetahui (always shown, even if empty — matches original behaviour)
  list.push({
    label: values.label_mengetahui || 'Diketahui Oleh',
    jabatan: values.jabatan_mengetahui || '',
    nama: values.nama_mengetahui || '',
  })

  // Saksi pendatang
  if (values.saksi_pendatang && Array.isArray(values.saksi_pendatang)) {
    values.saksi_pendatang.forEach((s: any) => {
      list.push({
        label: s.label || '',
        jabatan: s.jabatan || '',
        nama: s.nama || '',
      })
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
 */
const buildEventInfo = (event: any) => ({
  margin: [0, 15, 0, 15] as [number, number, number, number],
  columns: [
    {
      width: 150,
      text: ['Nama Kegiatan\n', 'Hari / Tanggal\n', 'Waktu\n', 'Tempat\n', 'Penyelenggara'],
    },
    {
      text: [
        `: ${event?.nama_kegiatan}\n`,
        `: ${
          event?.tanggal_mulai
            ? format(new Date(event.tanggal_mulai), 'EEEE, dd MMMM yyyy', { locale: id })
            : ''
        }\n`,
        `: ${event?.waktu}\n`,
        `: ${event?.tempat}\n`,
        `: ${event?.penyelenggara}`,
      ],
    },
  ],
})

/**
 * Build a table element for a single page of participants.
 */
const buildParticipantTable = (headerColumns: any[], widths: any[], rows: any[], layout: any) => ({
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

  const sigSpace = isPortrait ? 60 : 40
  const rowMargin = isPortrait ? 30 : 20
  const topMargin = isPortrait ? 60 : 40

  // Group into pairs (max 2 per row)
  const pairs: Signatory[][] = []
  for (let i = 0; i < signatories.length; i += 2) {
    pairs.push(signatories.slice(i, i + 2))
  }

  const items = pairs.map((pair, idx) => {
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

    // Odd number — add empty column to keep layout balanced
    if (pair.length === 1) {
      // @ts-ignore
      cols.push({ width: '*', text: '' })
    }

    return {
      columns: cols,
      margin: [0, idx > 0 ? rowMargin : 0, 0, 0] as [number, number, number, number],
    }
  })

  return {
    margin: [0, topMargin, 0, 0] as [number, number, number, number],
    stack: items,
  }
}

export const generatePreviewAttendancePdf = ({ event, values }: GenerateAttendancePdfProps) => {
  // ─── 1. Table definition ────────────────────────────────────────────────────
  const { columns: headerColumns, widths } = buildTableColumns(values)

  // ─── 2. All participant rows (empty placeholder rows) ────────────────────────
  const participantRows = generateParticipantRows(values)
  const totalParticipants = participantRows.length

  // ─── 3. Signatories ──────────────────────────────────────────────────────────
  const signatories = collectSignatories(values)
  const totalSignatories = signatories.length

  // ─── 4. Capacity logic ───────────────────────────────────────────────────────
  const isPortrait = values.hasil_cetak === 'PORTRAIT'
  const normalCapacity = isPortrait ? 20 : 10
  const reducedCapacity = isPortrait ? 16 : 8

  // Determine pagination strategy
  const signatoriesNeedSeparatePage = totalSignatories > 2
  const reduceCapacity = totalSignatories <= 2 && totalParticipants > normalCapacity
  const capacityPerPage = reduceCapacity ? reducedCapacity : normalCapacity

  // ─── 5. Split participants into pages ────────────────────────────────────────
  const participantPages = chunkArray(participantRows, capacityPerPage)

  // If no participants, still need at least one slot before signature
  if (participantPages.length === 0) {
    participantPages.push([])
  }

  // ─── 6. Table layout config ──────────────────────────────────────────────────
  const tableLayout = {
    paddingTop: (index: any) => (index === 0 ? 10 : 2),
    paddingBottom: (index: any) => (index === 0 ? 10 : 2),
    paddingLeft: () => 4,
    paddingRight: () => 4,
  }

  // ─── 7. Build content ────────────────────────────────────────────────────────
  const content: any[] = [
    // Title (first page only)
    { text: 'DAFTAR HADIR', style: 'title' },
    // Event info (first page only)
    buildEventInfo(event),
  ]

  // Participant tables — each page gets its own fresh copy of header + widths
  participantPages.forEach((pageRows, pageIdx) => {
    const freshHeaders = headerColumns.map((col) => ({ ...col }))
    const freshWidths = [...widths]
    const table: any = buildParticipantTable(freshHeaders, freshWidths, pageRows, tableLayout)

    if (pageIdx > 0) {
      table.pageBreak = 'before'
    }

    content.push(table)
  })

  // Signature block
  const signatureBlock: any = buildSignatureBlock(signatories, isPortrait)

  if (signatoriesNeedSeparatePage && totalParticipants > 0) {
    // Case C / D : signatories > 2 → dedicated page after all participants
    signatureBlock.pageBreak = 'before'
  }
  // else (Case A / B) : signatories stay on the last participant page
  //   reduced capacity ensures enough room

  content.push(signatureBlock)

  // ─── 8. Assemble document definition ─────────────────────────────────────────
  const docDefinition: any = {
    pageOrientation: values.hasil_cetak,
    pageMargins: [30, 30, 30, 30],

    footer: (currentPage: number, pageCount: number) => ({
      margin: [40, 40, 40, 0] as [number, number, number, number],
      columns: [
        {
          text: 'Dicetak melalui aplikasi E-Office',
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
