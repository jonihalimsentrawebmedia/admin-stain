/* eslint-disable @typescript-eslint/no-explicit-any */
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import htmlToPdfmake from 'html-to-pdfmake'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { GetBase64FromUrl } from '@/pages/modules/E-Office/settings/letter-header/hooks'
import type { IEvent } from '@/pages/modules/E-Office/event-activity/event-data/data/types.ts'
import type {
  IActivityReport,
  IAttendance,
  IDocument,
  IExpenditure,
  INotulen,
  PrintAllActivity,
} from '@/pages/modules/E-Office/event-activity/event-data/detail/component/report-activity/data/types.ts'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

(pdfMake as any).vfs = (pdfFonts as any).vfs

// ─── Constants ──────────────────────────────────────────────────────────────

const PRIMARY_COLOR = '#1F3A5F'
const SECONDARY_COLOR = '#2F5597'
const BORDER_COLOR = '#D7DEE8'
const LIGHT_BG_COLOR = '#F4F7FB'
const MUTED_COLOR = '#64748B'
const FILE_ICON_COLOR = '#475569'

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']

// ─── Types ──────────────────────────────────────────────────────────────────

interface GenerateReportPdfProps {
  event: IEvent
  printData: PrintAllActivity
  imageUrl?: string
}

// ─── Format currency (IDR) ──────────────────────────────────────────────────

const formatCurrency = (value: string | number): string => {
  const num = Number(value) || 0

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// ─── MIME type from filename ────────────────────────────────────────────────

const getImageMimeType = (filename?: string): string => {
  if (!filename) return 'image/jpeg'

  const ext = filename.split('.').pop()?.toLowerCase() || ''
  const map: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
    gif: 'image/gif',
    svg: 'image/svg+xml',
  }

  return map[ext] || 'image/jpeg'
}

// ─── Convert base64 string to data URL ──────────────────────────────────────

const toDataUrl = (base64: string | null, filename?: string): string | null => {
  if (!base64) return null

  const mime = getImageMimeType(filename)

  return `data:${mime};base64,${base64}`
}

// ─── Check if a filename/path is an image ───────────────────────────────────

const isImageFile = (filename?: string): boolean => {
  if (!filename) return false

  const ext = filename.split('.').pop()?.toLowerCase() || ''

  return IMAGE_EXTENSIONS.includes(ext)
}

// ─── Resolve document item with preview ─────────────────────────────────────

async function resolveDocumentItem(item: IDocument) {
  const url = item.url_file

  if (item.jenis_file === 'GAMBAR' || isImageFile(item.url_file)) {
    try {
      const imageDataUrl = toDataUrl(item.dokumen, item.url_file)

      if (imageDataUrl) {
        return {
          ...item,
          url,
          previewType: 'image' as const,
          previewDataUrl: imageDataUrl,
        }
      }
    } catch {
      // fall through
    }
  }

  return { ...item, url, previewType: 'link' as const }
}

// ─── File icon for document list ────────────────────────────────────────────

function buildFileIcon(size = 16) {
  return {
    canvas: [
      {
        type: 'rect',
        x: 1,
        y: 1,
        w: size - 3,
        h: size + 2,
        r: 1.5,
        lineColor: FILE_ICON_COLOR,
        lineWidth: 0.8,
      },
      {
        type: 'polyline',
        points: [
          { x: size - 6, y: 1 },
          { x: size - 6, y: 6 },
          { x: size - 1, y: 6 },
        ],
        lineColor: FILE_ICON_COLOR,
        lineWidth: 0.8,
      },
      {
        type: 'line',
        x1: 4,
        y1: 10,
        x2: size - 4,
        y2: 10,
        lineColor: FILE_ICON_COLOR,
        lineWidth: 0.6,
      },
      {
        type: 'line',
        x1: 4,
        y1: 13,
        x2: size - 4,
        y2: 13,
        lineColor: FILE_ICON_COLOR,
        lineWidth: 0.6,
      },
    ],
    width: size + 2,
    height: size + 4,
  }
}

function buildLinkedFileName(title: string, url?: string) {
  return {
    columns: [
      { ...buildFileIcon(), width: 22 },
      {
        text: title || '-',
        link: url || undefined,
        decoration: url ? 'underline' : undefined,
        color: url ? SECONDARY_COLOR : '#1F2937',
        style: 'tableCell',
        margin: [0, 1, 0, 0],
      },
    ],
    columnGap: 4,
  }
}

// ─── Empty text placeholder ─────────────────────────────────────────────────

const emptyText = (label = 'Belum diisi') => ({
  text: label,
  italics: true,
  color: MUTED_COLOR,
})

// ─── Formal table layout ────────────────────────────────────────────────────

const formalTableLayout = {
  hLineColor: () => BORDER_COLOR,
  vLineColor: () => BORDER_COLOR,
  hLineWidth: () => 0.6,
  vLineWidth: () => 0.6,
  paddingLeft: () => 7,
  paddingRight: () => 7,
  paddingTop: () => 6,
  paddingBottom: () => 6,
}

// ─── Find report by context in laporan_list ─────────────────────────────────

const getReportByContext = (reports: IActivityReport[], context: string): string | undefined => {
  return reports.find((r) => r.context === context)?.laporan
}

// ─── HTML → pdfmake content ─────────────────────────────────────────────────

function applyJustifyToHtmlContent(content: any): any {
  if (Array.isArray(content)) {
    return content.map((item) => applyJustifyToHtmlContent(item))
  }

  if (!content || typeof content !== 'object') {
    return content
  }

  const result = { ...content }

  if (typeof result.text === 'string' && !result.alignment) {
    result.alignment = 'justify'
  }

  if (result.stack) result.stack = applyJustifyToHtmlContent(result.stack)
  if (result.columns) result.columns = applyJustifyToHtmlContent(result.columns)
  if (result.ul) result.ul = applyJustifyToHtmlContent(result.ul)
  if (result.ol) result.ol = applyJustifyToHtmlContent(result.ol)
  if (result.text && Array.isArray(result.text)) {
    result.text = applyJustifyToHtmlContent(result.text)
  }

  return result
}

function htmlContentToPdfmake(html: string | undefined): any {
  if (!html || html.trim() === '' || html === '<p><br></p>') {
    return emptyText()
  }

  try {
    const cleaned = html.replace(/<p><br><\/p>/g, '').trim()

    if (!cleaned) {
      return emptyText()
    }

    const pdfmakeContent = htmlToPdfmake(cleaned, {
      defaultStyles: {
        b: { bold: true },
        strong: { bold: true },
        i: { italics: true },
        em: { italics: true },
        u: { decoration: 'underline' },
        p: {
          fontSize: 10,
          margin: [0, 1, 0, 3],
          lineHeight: 1.15,
          alignment: 'justify',
        },
        ul: { fontSize: 10, margin: [16, 2, 0, 4] },
        ol: { fontSize: 10, margin: [16, 2, 0, 4] },
        li: {
          fontSize: 10,
          margin: [0, 1, 0, 1],
          lineHeight: 1.15,
          alignment: 'justify',
        },
        h1: { fontSize: 14, bold: true, margin: [0, 5, 0, 3] },
        h2: { fontSize: 12, bold: true, margin: [0, 4, 0, 2] },
        h3: { fontSize: 11, bold: true, margin: [0, 3, 0, 2] },
      },
    })

    return applyJustifyToHtmlContent(pdfmakeContent)
  } catch {
    const div = html.replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ')

    return {
      text: div.trim(),
      fontSize: 10,
      lineHeight: 1.15,
      alignment: 'justify',
    }
  }
}

function sanitizeHtmlParagraphs(htmlStr: string | undefined) {
  if (!htmlStr) return ''

  return htmlStr.replace(/<\/p>\s*<p>/g, ' ').replace(/\s*<br\s*\/?>\s*/g, '</p><p>')
}

// ─── Ringkasan Kegiatan ────────────────────────────────────────────────────

function buildRingkasanKegiatan(event: IEvent) {
  const rows = [
    ['Nama Kegiatan', event?.nama_kegiatan || '-'],
    [
      'Tanggal Mulai',
      event?.tanggal_mulai
        ? format(new Date(event.tanggal_mulai), 'dd MMMM yyyy', { locale: id })
        : '-',
    ],
    [
      'Tanggal Selesai',
      event?.tanggal_selesai
        ? format(new Date(event.tanggal_selesai), 'dd MMMM yyyy', { locale: id })
        : '-',
    ],
    ['Waktu Pelaksanaan', event?.waktu || '-'],
    ['Tempat', event?.tempat || '-'],
    ['Penyelenggara', event?.penyelenggara || '-'],
  ]

  return {
    stack: [
      {
        id: 'ringkasan-kegiatan',
        text: 'RINGKASAN KEGIATAN',
        style: 'sectionTitle' as const,
        alignment: 'center' as const,
        margin: [0, 0, 0, 16] as [number, number, number, number],
      },
      {
        table: {
          widths: [150, '*'],
          body: rows.map(([label, value]) => [
            {
              text: label,
              style: 'summaryLabel',
              fillColor: LIGHT_BG_COLOR,
            },
            { text: value, style: 'summaryValue' },
          ]),
        },
        layout: formalTableLayout,
      },
    ],
  }
}

// ─── Daftar Isi ────────────────────────────────────────────────────────────

function buildDaftarIsi() {
  const items = [
    { label: 'Cover', ref: 'cover' },
    { label: 'Ringkasan Kegiatan', ref: 'ringkasan-kegiatan' },
    { label: 'Pendahuluan', ref: 'pendahuluan' },
    { label: 'Dasar Kegiatan', ref: 'dasar-kegiatan' },
    { label: 'Nama Kegiatan', ref: 'nama-kegiatan' },
    { label: 'Tujuan Kegiatan', ref: 'tujuan-kegiatan' },
    { label: 'Materi', ref: 'materi' },
    { label: 'Kesimpulan', ref: 'kesimpulan' },
    { label: 'Tindak Lanjut', ref: 'tindak-lanjut' },
  ]

  const lampiranItems = [
    { label: 'Lampiran 1. Dokumen/File Pendukung', ref: 'lampiran-file' },
    { label: 'Lampiran 2. Daftar Hadir', ref: 'lampiran-daftar-hadir' },
    { label: 'Lampiran 3. Dokumentasi', ref: 'lampiran-dokumentasi' },
    { label: 'Lampiran 4. Notulen', ref: 'lampiran-notulen' },
    { label: 'Lampiran 5. Pengeluaran Anggaran', ref: 'lampiran-pengeluaran' },
  ]

  const tocRow = (label: string, ref: string) => ({
    columns: [
      { text: label, fontSize: 10, width: 'auto' as const },
      {
        text: '................................................................................................',
        fontSize: 9,
        color: '#B7C0CC',
        width: '*' as const,
        margin: [6, 2, 6, 0] as [number, number, number, number],
      },
      {
        text: '',
        pageReference: ref,
        fontSize: 10,
        alignment: 'right' as const,
        width: 35,
      },
    ],
    margin: [0, 3, 0, 3] as [number, number, number, number],
  })

  return {
    stack: [
      {
        text: 'DAFTAR ISI',
        style: 'sectionTitle' as const,
        alignment: 'center' as const,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },
      ...items.map((item, idx) => tocRow(`${idx + 1}. ${item.label}`, item.ref)),
      {
        text: 'LAMPIRAN',
        style: 'subSectionTitle' as const,
        margin: [0, 18, 0, 8] as [number, number, number, number],
      },
      ...lampiranItems.map((item) => tocRow(item.label, item.ref)),
    ],
  }
}

// ─── Content section builder ────────────────────────────────────────────────

function buildContentSection(title: string, html: string | undefined, sectionId: string) {
  return {
    table: {
      widths: ['100%'],
      body: [
        [
          {
            stack: [
              {
                id: sectionId,
                text: title,
                style: 'sectionTitle' as const,
                margin: [0, 0, 0, 5] as [number, number, number, number],
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 0,
                    x2: 515,
                    y2: 0,
                    lineWidth: 0.6,
                    lineColor: BORDER_COLOR,
                  },
                ],
                margin: [0, 0, 0, 8] as [number, number, number, number],
              },
              htmlContentToPdfmake(html),
            ],
          },
        ],
      ],
    },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: () => 0,
    },
    margin: [0, 0, 0, 18] as [number, number, number, number],
    unbreakable: false,
  }
}

// ─── Lampiran 1: File Pendukung ─────────────────────────────────────────────

async function buildLampiranFilePendukung(documents: IDocument[]) {
  if (!documents || documents.length === 0) {
    return {
      text: 'Tidak ada file pendukung.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  const resolvedData = await Promise.all(documents.map((item) => resolveDocumentItem(item)))

  return {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto'] as (string | number)[],
      body: [
        [
          { text: 'No.', style: 'tableHeader' as const, alignment: 'center' as const },
          { text: 'Judul Dokumen', style: 'tableHeader' as const },
          { text: 'Jenis', style: 'tableHeader' as const, alignment: 'center' as const },
        ],
        ...resolvedData.map((item, idx) => {
          const title = item?.judul || '-'
          const typeLabel = item?.jenis_file === 'url' ? 'URL' : 'Dokumen'
          const documentCell =
            item.previewType === 'image' && item.previewDataUrl
              ? {
                  stack: [
                    {
                      image: item.previewDataUrl,
                      width: 220,
                      alignment: 'center' as const,
                      margin: [0, 0, 0, 6] as [number, number, number, number],
                    },
                    buildLinkedFileName(title, item.url),
                  ],
                }
              : buildLinkedFileName(title, item.url)

          return [
            { text: String(idx + 1), alignment: 'center' as const, style: 'tableCell' as const },
            documentCell,
            {
              text: typeLabel,
              alignment: 'center' as const,
              style: 'tableCell' as const,
            },
          ]
        }),
      ],
    },
    layout: formalTableLayout,
  }
}

// ─── Lampiran 2: Daftar Hadir ──────────────────────────────────────────────

function buildLampiranDaftarHadir(attendance: IAttendance[]) {
  if (!attendance || attendance.length === 0) {
    return {
      text: 'Tidak ada data tamu.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto'] as (string | number)[],
      body: [
        [
          { text: 'No.', style: 'tableHeader' as const, alignment: 'center' as const },
          { text: 'Nama Peserta', style: 'tableHeader' as const },
          { text: 'Instansi/Alamat', style: 'tableHeader' as const },
          { text: 'Jabatan', style: 'tableHeader' as const },
        ],
        ...attendance.map((item, idx) => [
          { text: String(idx + 1), alignment: 'center' as const, style: 'tableCell' as const },
          { text: item.nama_lengkap || '-', style: 'tableCell' as const },
          {
            text: item.nama_unit_kerja || item.nama_unit || '-',
            style: 'tableCell' as const,
          },
          { text: item.jabatan || '-', style: 'tableCell' as const },
        ]),
      ],
    },
    layout: formalTableLayout,
  }
}

// ─── Lampiran 3: Dokumentasi ───────────────────────────────────────────────

function buildLampiranDokumentasi(images: DocImageItem[]) {
  if (!images || images.length === 0) {
    return {
      text: 'Tidak ada dokumentasi.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  const imageRows: any[] = []

  for (let i = 0; i < images.length; i += 2) {
    const row: any[] = []

    for (let j = i; j < i + 2 && j < images.length; j++) {
      const item = images[j]

      row.push({
        stack: [
          {
            image: item.imageDataUrl,
            width: 240,
            alignment: 'center' as const,
            margin: [0, 0, 0, 4] as [number, number, number, number],
          },
          {
            text: item.keterangan || '',
            fontSize: 8,
            alignment: 'center' as const,
            color: '#555555',
            italics: true,
          },
        ],
      })
    }

    if (row.length > 0) {
      imageRows.push({
        columns: row,
        columnGap: 20,
        margin: [0, 0, 0, 16] as [number, number, number, number],
      })
    }
  }

  if (imageRows.length === 0) {
    return {
      text: 'Tidak ada dokumentasi.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return { stack: imageRows }
}

// ─── Lampiran 4: Notulen ───────────────────────────────────────────────────

function buildLampiranNotulen(notulen: INotulen[]) {
  if (!notulen || notulen.length === 0) {
    return {
      text: 'Tidak ada data notulen.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return {
    table: {
      headerRows: 1,
      widths: ['auto', 'auto', '*'] as (string | number)[],
      body: [
        [
          { text: 'No.', style: 'tableHeader' as const, alignment: 'center' as const },
          { text: 'Nama Peserta', style: 'tableHeader' as const },
          { text: 'Isi Notulen', style: 'tableHeader' as const },
        ],
        ...notulen.map((item, idx) => [
          { text: String(idx + 1), alignment: 'center' as const, style: 'tableCell' as const },
          { text: item.nama_lengkap || '-', style: 'tableCell' as const },
          { text: item.isi_notulen || '-', style: 'tableCell' as const },
        ]),
      ],
    },
    layout: formalTableLayout,
  }
}

// ─── Lampiran 5: Pengeluaran Anggaran ──────────────────────────────────────

function buildLampiranPengeluaran(expenditures: IExpenditure[]) {
  if (!expenditures || expenditures.length === 0) {
    return {
      text: 'Tidak ada data pengeluaran.',
      italics: true,
      color: MUTED_COLOR,
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  const total = expenditures.reduce((sum, item) => {
    const nilai = Number(item.jumlah_pengeluaran)

    return sum + (isNaN(nilai) ? 0 : nilai)
  }, 0)

  return {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'] as (string | number)[],
      body: [
        [
          { text: 'No.', style: 'tableHeader' as const, alignment: 'center' as const },
          { text: 'Uraian', style: 'tableHeader' as const },
          { text: 'Tanggal', style: 'tableHeader' as const, alignment: 'center' as const },
          { text: 'Dibayarkan Oleh', style: 'tableHeader' as const },
          { text: 'Penerima', style: 'tableHeader' as const },
          { text: 'Jumlah', style: 'tableHeader' as const, alignment: 'right' as const },
        ],
        ...expenditures.map((item, idx) => [
          { text: String(idx + 1), alignment: 'center' as const, style: 'tableCell' as const },
          { text: item.uraian_pengeluaran || '-', style: 'tableCell' as const },
          {
            text: item.tanggal_pengeluaran
              ? format(new Date(item.tanggal_pengeluaran), 'dd-MM-yyyy', { locale: id })
              : '-',
            alignment: 'center' as const,
            style: 'tableCell' as const,
          },
          { text: item.yang_membayar || '-', style: 'tableCell' as const },
          { text: item.tempat_pembelian || '-', style: 'tableCell' as const },
          {
            text: formatCurrency(item.jumlah_pengeluaran),
            alignment: 'right' as const,
            style: 'tableCell' as const,
          },
        ]),
        [
          {
            text: 'Total Pengeluaran',
            colSpan: 5,
            alignment: 'right' as const,
            bold: true,
            fontSize: 10,
            margin: [6, 6, 6, 6] as [number, number, number, number],
          },
          {},
          {},
          {},
          {},
          {
            text: formatCurrency(total),
            alignment: 'right' as const,
            bold: true,
            fontSize: 10,
            margin: [6, 6, 6, 6] as [number, number, number, number],
          },
        ],
      ],
    },
    layout: formalTableLayout,
  }
}

// ─── Lampiran section wrapper with page break ──────────────────────────────

function buildLampiranSection(title: string, content: any, sectionId: string) {
  return {
    stack: [
      {
        id: sectionId,
        text: title.toUpperCase(),
        style: 'sectionTitle' as const,
        margin: [0, 0, 0, 5] as [number, number, number, number],
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 0.6,
            lineColor: BORDER_COLOR,
          },
        ],
        margin: [0, 0, 0, 12] as [number, number, number, number],
      },
      content,
    ],
    pageBreak: 'before' as const,
  }
}

// ─── Documentation image item type ──────────────────────────────────────────

interface DocImageItem {
  imageDataUrl: string
  keterangan: string
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════

export const generatePdfLaporanKegiatan = async ({
  event,
  printData,
  imageUrl,
}: GenerateReportPdfProps) => {
  const { cetak_config, daftar_hadir, dokumen, dokumentasi, laporan_list, notulen, pengeluaran } =
    printData

  const { kop_surat } = cetak_config

  const nama_acara = event?.nama_kegiatan || 'Acara'
  const tahun = event?.tanggal_mulai
    ? format(new Date(event.tanggal_mulai), 'yyyy')
    : format(new Date(), 'yyyy')

  const resolvedImageUrl =
    imageUrl || (kop_surat?.url_logo?.startsWith('data:') ? kop_surat.url_logo : undefined)

  // ─── Content sections from laporan_list ──────────────────────────────────
  const contentSections = [
    {
      id: 'pendahuluan',
      title: 'I. PENDAHULUAN',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'PENDAHULUAN')),
    },
    {
      id: 'dasar-kegiatan',
      title: 'II. DASAR KEGIATAN',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'DASAR_KEGIATAN')),
    },
    {
      id: 'nama-kegiatan',
      title: 'III. NAMA KEGIATAN',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'NAMA_KEGIATAN')),
    },
    {
      id: 'tujuan-kegiatan',
      title: 'IV. TUJUAN KEGIATAN',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'TUJUAN_KEGIATAN')),
    },
    {
      id: 'materi',
      title: 'V. MATERI',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'MATERI_RANGKAIAN_KEGIATAN')),
    },
    {
      id: 'kesimpulan',
      title: 'VI. KESIMPULAN',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'KESIMPULAN')),
    },
    {
      id: 'tindak-lanjut',
      title: 'VII. TINDAK LANJUT',
      html: sanitizeHtmlParagraphs(getReportByContext(laporan_list, 'TINDAK_LANJUT')),
    },
  ]

  // ─── Pre-fetch dokumentasi images via GetBase64FromUrl ───────────────────
  const docImages: DocImageItem[] = (
    await Promise.all(
      dokumentasi.map(async (item) => {
        try {
          const dataUrl = await GetBase64FromUrl(item.url_file)
          return { imageDataUrl: dataUrl, keterangan: item.keterangan || '' }
        } catch {
          return null
        }
      })
    )
  ).filter(Boolean) as DocImageItem[]

  // ─── Build file pendukung lampiran (async) ──────────────────────────────
  const lampiranFilePendukung = await buildLampiranFilePendukung(dokumen)

  // ─── Lampiran sections ──────────────────────────────────────────────────
  const lampiranSections = [
    buildLampiranSection(
      'Lampiran 1. Dokumen/File Pendukung',
      lampiranFilePendukung,
      'lampiran-file'
    ),
    buildLampiranSection(
      'Lampiran 2. Daftar Hadir',
      buildLampiranDaftarHadir(daftar_hadir),
      'lampiran-daftar-hadir'
    ),
    buildLampiranSection(
      'Lampiran 3. Dokumentasi',
      buildLampiranDokumentasi(docImages),
      'lampiran-dokumentasi'
    ),
    buildLampiranSection('Lampiran 4. Notulen', buildLampiranNotulen(notulen), 'lampiran-notulen'),
    buildLampiranSection(
      'Lampiran 5. Pengeluaran Anggaran',
      buildLampiranPengeluaran(pengeluaran),
      'lampiran-pengeluaran'
    ),
  ]

  // ─── Assemble document definition ───────────────────────────────────────
  const docDefinition: any = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [40, 160, 40, 50] as [number, number, number, number],

    // ── Repeating header (skip halaman 1 = cover) ─────────────────────────
    header: (currentPage: number) => {
      if (currentPage === 1) return null

      const kopContent = buildKopSuratContent(kop_surat as any, resolvedImageUrl)

      return {
        margin: [40, 40, 40, 0] as [number, number, number, number],
        stack: kopContent ?? [],
      }
    },

    // ── Content ───────────────────────────────────────────────────────────
    content: [
      // ═══════════ COVER PAGE ═══════════
      {
        stack: [
          {
            text: '',
            margin: [0, 36, 0, 0] as [number, number, number, number],
          },
          ...(resolvedImageUrl
            ? [
                {
                  image: resolvedImageUrl,
                  width: 96,
                  height: 96,
                  alignment: 'center' as const,
                  margin: [0, 0, 0, 28] as [number, number, number, number],
                },
              ]
            : []),
          {
            id: 'cover',
            text: 'LAPORAN KEGIATAN',
            style: 'coverTitle' as const,
            alignment: 'center' as const,
            margin: [0, 0, 0, 10] as [number, number, number, number],
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 175,
                y1: 0,
                x2: 340,
                y2: 0,
                lineWidth: 1,
                lineColor: SECONDARY_COLOR,
              },
            ],
            margin: [0, 0, 0, 26] as [number, number, number, number],
          },
          {
            text: nama_acara.toUpperCase(),
            alignment: 'center' as const,
            bold: true,
            fontSize: 16,
            lineHeight: 1.25,
            color: PRIMARY_COLOR,
            margin: [30, 0, 30, 10] as [number, number, number, number],
          },
          {
            text: `TAHUN ${tahun}`,
            alignment: 'center' as const,
            bold: true,
            fontSize: 13,
            color: MUTED_COLOR,
          },
        ],
        pageBreak: 'after' as const,
      },

      // ═══════════ RINGKASAN KEGIATAN ═══════════
      {
        stack: [buildRingkasanKegiatan(event)],
        pageBreak: 'after' as const,
      },

      // ═══════════ DAFTAR ISI ═══════════
      {
        stack: [buildDaftarIsi()],
        pageBreak: 'after' as const,
      },

      // ═══════════ CONTENT SECTIONS ═══════════
      ...contentSections.map((section) => ({
        stack: [buildContentSection(section.title, section.html, section.id)],
      })),

      // ═══════════ LAMPIRAN ═══════════
      ...lampiranSections,
    ],

    // ── Footer ────────────────────────────────────────────────────────────
    footer: (currentPage: number, pageCount: number) => {
      if (currentPage === 1) return null

      return {
        margin: [40, 8, 40, 10] as [number, number, number, number],
        stack: [
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 0.5,
                lineColor: BORDER_COLOR,
              },
            ],
            margin: [0, 0, 0, 5] as [number, number, number, number],
          },
          {
            columns: [
              {
                text: `Dicetak pada ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`,
                fontSize: 8,
                color: MUTED_COLOR,
              },
              {
                text: `Halaman ${currentPage} dari ${pageCount}`,
                alignment: 'right' as const,
                fontSize: 8,
                bold: true,
                color: MUTED_COLOR,
              },
            ],
          },
        ],
      }
    },

    // ── Styles ────────────────────────────────────────────────────────────
    styles: {
      coverTitle: {
        fontSize: 24,
        bold: true,
        color: PRIMARY_COLOR,
        characterSpacing: 2,
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        color: PRIMARY_COLOR,
        characterSpacing: 0.3,
      },
      subSectionTitle: {
        fontSize: 11,
        bold: true,
        color: SECONDARY_COLOR,
      },
      summaryLabel: {
        fontSize: 10,
        bold: true,
        color: PRIMARY_COLOR,
      },
      summaryValue: {
        fontSize: 10,
        color: '#1F2937',
      },
      tableHeader: {
        bold: true,
        fontSize: 9,
        color: '#FFFFFF',
        fillColor: PRIMARY_COLOR,
      },
      tableCell: {
        fontSize: 9,
        color: '#1F2937',
      },
    },

    defaultStyle: {
      fontSize: 10,
      color: '#1F2937',
      lineHeight: 1.25,
    },
  }

  return docDefinition
}
