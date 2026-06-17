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

;(pdfMake as any).vfs = (pdfFonts as any).vfs

// ─── Types ───────────────────────────────────────────────────────────────────

interface GenerateReportPdfProps {
  event: IEvent
  printData: PrintAllActivity
  imageUrl?: string
}

// ─── Format currency (IDR) ───────────────────────────────────────────────────

const formatCurrency = (value: string | number): string => {
  const num = Number(value) || 0

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

// ─── MIME type from filename ─────────────────────────────────────────────────

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

// ─── Convert base64 string to data URL ───────────────────────────────────────

const toDataUrl = (base64: string | null, filename?: string): string | null => {
  if (!base64) return null

  const mime = getImageMimeType(filename)

  return `data:${mime};base64,${base64}`
}

// ─── Check if a filename/path is an image ────────────────────────────────────

const isImageFile = (filename?: string): boolean => {
  if (!filename) return false

  const ext = filename.split('.').pop()?.toLowerCase() || ''

  return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)
}

// ─── Find report by context in laporan_list ──────────────────────────────────

const getReportByContext = (reports: IActivityReport[], context: string): string | undefined => {
  return reports.find((r) => r.context === context)?.laporan
}

// ─── HTML → pdfmake content ─────────────────────────────────────────────────

const htmlContentToPdfmake = (html: string | undefined): any => {
  if (!html || html.trim() === '' || html === '<p><br></p>') {
    return { text: 'Belum diisi', italics: true, color: '#888888' }
  }

  try {
    const cleaned = html.replace(/<p><br><\/p>/g, '').trim()

    if (!cleaned) {
      return { text: 'Belum diisi', italics: true, color: '#888888' }
    }

    return htmlToPdfmake(cleaned, {
      defaultStyles: {
        b: { bold: true },
        strong: { bold: true },
        i: { italics: true },
        em: { italics: true },
        u: { decoration: 'underline' },
        p: { fontSize: 10, margin: [0, 2, 0, 6], lineHeight: 1.4 },
        ul: { fontSize: 10, margin: [16, 4, 0, 8] },
        ol: { fontSize: 10, margin: [16, 4, 0, 8] },
        li: { fontSize: 10, margin: [0, 2, 0, 2] },
        h1: { fontSize: 14, bold: true, margin: [0, 8, 0, 4] },
        h2: { fontSize: 12, bold: true, margin: [0, 6, 0, 4] },
        h3: { fontSize: 11, bold: true, margin: [0, 4, 0, 2] },
      },
    })
  } catch {
    const div = html.replace(/<[^>]*>/g, '\n').replace(/&nbsp;/g, ' ')

    return { text: div.trim(), fontSize: 10, lineHeight: 1.4 }
  }
}

// ─── Ringkasan Kegiatan ──────────────────────────────────────────────────────

const buildRingkasanKegiatan = (event: IEvent) => ({
  stack: [
    {
      text: 'Ringkasan Kegiatan',
      style: 'sectionTitle' as const,
      alignment: 'left' as const,
      margin: [0, 0, 0, 12] as [number, number, number, number],
    },
    {
      table: {
        widths: ['auto', '*'],
        body: [
          [
            { text: 'Nama Kegiatan', fontSize: 10, bold: true },
            { text: `: ${event?.nama_kegiatan || '-'}`, fontSize: 10 },
          ],
          [
            { text: 'Tanggal Mulai', fontSize: 10, bold: true },
            {
              text: `: ${
                event?.tanggal_mulai
                  ? format(new Date(event.tanggal_mulai), 'dd MMMM yyyy', { locale: id })
                  : '-'
              }`,
              fontSize: 10,
            },
          ],
          [
            { text: 'Tanggal Selesai', fontSize: 10, bold: true },
            {
              text: `: ${
                event?.tanggal_selesai
                  ? format(new Date(event.tanggal_selesai), 'dd MMMM yyyy', { locale: id })
                  : '-'
              }`,
              fontSize: 10,
            },
          ],
          [
            { text: 'Waktu Pelaksanaan', fontSize: 10, bold: true },
            { text: `: ${event?.waktu || '-'}`, fontSize: 10 },
          ],
          [
            { text: 'Tempat', fontSize: 10, bold: true },
            { text: `: ${event?.tempat || '-'}`, fontSize: 10 },
          ],
          [
            { text: 'Penyelenggara', fontSize: 10, bold: true },
            { text: `: ${event?.penyelenggara || '-'}`, fontSize: 10 },
          ],
        ],
      },
      layout: 'noBorders',
      margin: [0, 0, 0, 0] as [number, number, number, number],
    },
  ],
})

// ─── Daftar Isi ──────────────────────────────────────────────────────────────

const buildDaftarIsi = () => {
  const items = [
    { label: 'Cover', page: 1 },
    { label: 'Ringkasan Kegiatan', page: 2 },
    { label: 'Pendahuluan', page: 3 },
    { label: 'Dasar Kegiatan', page: '-' },
    { label: 'Nama Kegiatan', page: '-' },
    { label: 'Tujuan Kegiatan', page: '-' },
    { label: 'Materi', page: '-' },
    { label: 'Kesimpulan', page: '-' },
    { label: 'Tindak Lanjut', page: '-' },
  ]

  const lampiranItems = [
    { label: 'Lampiran 1. Dokumen/File Pendukung', page: '-' },
    { label: 'Lampiran 2. Daftar Hadir', page: '-' },
    { label: 'Lampiran 3. Dokumentasi', page: '-' },
    { label: 'Lampiran 4. Notulen', page: '-' },
    { label: 'Lampiran 5. Pengeluaran Anggaran', page: '-' },
  ]

  return {
    stack: [
      {
        text: 'DAFTAR ISI',
        style: 'sectionTitle' as const,
        alignment: 'center' as const,
        margin: [0, 0, 0, 16] as [number, number, number, number],
      },
      ...items.map((item, idx) => ({
        columns: [
          { text: `${idx + 1}. ${item.label}`, fontSize: 10 },
          { text: item.page, fontSize: 10, alignment: 'right' as const },
        ],
        margin: [0, 2, 0, 2] as [number, number, number, number],
      })),
      {
        text: 'Lampiran',
        style: 'sectionTitle' as const,
        margin: [0, 16, 0, 8] as [number, number, number, number],
      },
      ...lampiranItems.map((item) => ({
        columns: [
          { text: item.label, fontSize: 10 },
          { text: item.page, fontSize: 10, alignment: 'right' as const },
        ],
        margin: [0, 2, 0, 2] as [number, number, number, number],
      })),
    ],
  }
}

// ─── Content section builder ─────────────────────────────────────────────────

const buildContentSection = (title: string, html: string | undefined) => ({
  stack: [
    {
      text: title,
      style: 'sectionTitle' as const,
      margin: [0, 0, 0, 8] as [number, number, number, number],
    },
    htmlContentToPdfmake(html),
  ],
  margin: [0, 0, 0, 16] as [number, number, number, number],
  unbreakable: false,
})

// ─── Lampiran 1: File Pendukung ──────────────────────────────────────────────

const buildLampiranFilePendukung = (documents: IDocument[]) => {
  if (!documents || documents.length === 0) {
    return {
      text: 'Tidak ada file pendukung.',
      italics: true,
      color: '#888888',
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  const imageItems = documents.filter(
    (item) => item.jenis_file === 'GAMBAR' || isImageFile(item.url_file)
  )
  const nonImageItems = documents.filter(
    (item) => !(item.jenis_file === 'GAMBAR' || isImageFile(item.url_file))
  )

  const imageRows: any[] = []

  if (imageItems.length > 0) {
    for (let i = 0; i < imageItems.length; i += 2) {
      const row: any[] = []

      for (let j = i; j < i + 2 && j < imageItems.length; j++) {
        const item = imageItems[j]
        const imageDataUrl = toDataUrl(item.dokumen, item.url_file)

        if (!imageDataUrl) continue

        row.push({
          stack: [
            {
              image: imageDataUrl,
              width: 240,
              alignment: 'center' as const,
              margin: [0, 0, 0, 4] as [number, number, number, number],
            },
            {
              text: item.judul || '',
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
  }

  const nonImageTable =
    nonImageItems.length > 0
      ? {
          table: {
            headerRows: 1,
            widths: ['auto', '*', 'auto'] as (string | number)[],
            body: [
              [
                {
                  text: 'No.',
                  style: 'tableHeader' as const,
                  alignment: 'center' as const,
                },
                { text: 'Judul Dokumen', style: 'tableHeader' as const },
                {
                  text: 'Jenis',
                  style: 'tableHeader' as const,
                  alignment: 'center' as const,
                },
              ],
              ...nonImageItems.map((item, idx) => [
                {
                  text: String(idx + 1),
                  alignment: 'center' as const,
                  style: 'tableCell' as const,
                },
                {
                  text: item.judul || '-',
                  style: 'tableCell' as const,
                  link: item.url_file,
                  color: '#292D8B',
                  decoration: 'underline',
                },
                {
                  text: item.jenis_file === 'url' ? 'URL' : 'Dokumen',
                  alignment: 'center' as const,
                  style: 'tableCell' as const,
                },
              ]),
            ],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            paddingLeft: () => 6,
            paddingRight: () => 6,
            paddingTop: () => 6,
            paddingBottom: () => 6,
          },
        }
      : null

  return {
    stack: [
      ...(imageRows.length > 0 ? imageRows : []),
      ...(nonImageTable
        ? [
            ...(imageRows.length > 0
              ? [
                  {
                    text: 'Dokumen/File Non-Gambar',
                    style: 'sectionTitle' as const,
                    margin: [0, 16, 0, 12] as [number, number, number, number],
                  },
                ]
              : []),
            nonImageTable,
          ]
        : []),
    ],
  }
}

// ─── Lampiran 2: Daftar Hadir ────────────────────────────────────────────────

const buildLampiranDaftarHadir = (attendance: IAttendance[]) => {
  if (!attendance || attendance.length === 0) {
    return {
      text: 'Tidak ada data tamu.',
      italics: true,
      color: '#888888',
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto'] as (string | number)[],
      body: [
        [
          {
            text: 'No.',
            style: 'tableHeader' as const,
            alignment: 'center' as const,
          },
          { text: 'Nama Peserta', style: 'tableHeader' as const },
          { text: 'Instansi/Alamat', style: 'tableHeader' as const },
          { text: 'Jabatan', style: 'tableHeader' as const },
        ],
        ...attendance.map((item, idx) => [
          {
            text: String(idx + 1),
            alignment: 'center' as const,
            style: 'tableCell' as const,
          },
          { text: item.nama_lengkap || '-', style: 'tableCell' as const },
          {
            text: item.nama_unit_kerja || item.nama_unit || '-',
            style: 'tableCell' as const,
          },
          { text: item.jabatan || '-', style: 'tableCell' as const },
        ]),
      ],
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 6,
      paddingRight: () => 6,
      paddingTop: () => 6,
      paddingBottom: () => 6,
    },
  }
}

// ─── Lampiran 3: Dokumentasi ─────────────────────────────────────────────────

interface DocImageItem {
  imageDataUrl: string
  keterangan: string
}

const buildLampiranDokumentasi = (images: DocImageItem[]) => {
  if (!images || images.length === 0) {
    return {
      text: 'Tidak ada dokumentasi.',
      italics: true,
      color: '#888888',
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
            fit: [240, 170] as [number, number],
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
      color: '#888888',
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return { stack: imageRows }
}

// ─── Lampiran 4: Notulen ─────────────────────────────────────────────────────

const buildLampiranNotulen = (notulen: INotulen[]) => {
  if (!notulen || notulen.length === 0) {
    return {
      text: 'Tidak ada data notulen.',
      italics: true,
      color: '#888888',
      margin: [0, 8, 0, 0] as [number, number, number, number],
    }
  }

  return {
    table: {
      headerRows: 1,
      widths: ['auto', 'auto', '*'] as (string | number)[],
      body: [
        [
          {
            text: 'No.',
            style: 'tableHeader' as const,
            alignment: 'center' as const,
          },
          { text: 'Nama Peserta', style: 'tableHeader' as const },
          { text: 'Isi Notulen', style: 'tableHeader' as const },
        ],
        ...notulen.map((item, idx) => [
          {
            text: String(idx + 1),
            alignment: 'center' as const,
            style: 'tableCell' as const,
          },
          { text: item.nama_lengkap || '-', style: 'tableCell' as const },
          { text: item.isi_notulen || '-', style: 'tableCell' as const },
        ]),
      ],
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 6,
      paddingRight: () => 6,
      paddingTop: () => 6,
      paddingBottom: () => 6,
    },
  }
}

// ─── Lampiran 5: Pengeluaran Anggaran ────────────────────────────────────────

const buildLampiranPengeluaran = (expenditures: IExpenditure[]) => {
  if (!expenditures || expenditures.length === 0) {
    return {
      text: 'Tidak ada data pengeluaran.',
      italics: true,
      color: '#888888',
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
          {
            text: 'No.',
            style: 'tableHeader' as const,
            alignment: 'center' as const,
          },
          { text: 'Uraian', style: 'tableHeader' as const },
          {
            text: 'Tanggal',
            style: 'tableHeader' as const,
            alignment: 'center' as const,
          },
          { text: 'Dibayarkan Oleh', style: 'tableHeader' as const },
          { text: 'Penerima', style: 'tableHeader' as const },
          {
            text: 'Jumlah',
            style: 'tableHeader' as const,
            alignment: 'right' as const,
          },
        ],
        ...expenditures.map((item, idx) => [
          {
            text: String(idx + 1),
            alignment: 'center' as const,
            style: 'tableCell' as const,
          },
          {
            text: item.uraian_pengeluaran || '-',
            style: 'tableCell' as const,
          },
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
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      paddingLeft: () => 6,
      paddingRight: () => 6,
      paddingTop: () => 6,
      paddingBottom: () => 6,
    },
  }
}

// ─── Lampiran section wrapper with page break ────────────────────────────────

const buildLampiranSection = (title: string, content: any) => ({
  stack: [
    {
      text: title,
      style: 'sectionTitle' as const,
      margin: [0, 0, 0, 12] as [number, number, number, number],
    },
    content,
  ],
  pageBreak: 'before' as const,
})

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

  // Resolve image URL (prefer passed imageUrl, fallback to inline data URL from header)
  const resolvedImageUrl =
    imageUrl || (kop_surat?.url_logo?.startsWith('data:') ? kop_surat.url_logo : undefined)

  // ─── Content sections from laporan_list ──────────────────────────────────
  const contentSections = [
    { title: 'I. PENDAHULUAN', html: getReportByContext(laporan_list, 'PENDAHULUAN') },
    { title: 'II. DASAR KEGIATAN', html: getReportByContext(laporan_list, 'DASAR_KEGIATAN') },
    { title: 'III. NAMA KEGIATAN', html: getReportByContext(laporan_list, 'NAMA_KEGIATAN') },
    { title: 'IV. TUJUAN KEGIATAN', html: getReportByContext(laporan_list, 'TUJUAN_KEGIATAN') },
    { title: 'V. MATERI', html: getReportByContext(laporan_list, 'MATERI_RANGKAIAN_KEGIATAN') },
    { title: 'VI. KESIMPULAN', html: getReportByContext(laporan_list, 'KESIMPULAN') },
    { title: 'VII. TINDAK LANJUT', html: getReportByContext(laporan_list, 'TINDAK_LANJUT') },
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

  // ─── Lampiran sections ──────────────────────────────────────────────────
  const lampiranSections = [
    buildLampiranSection('Lampiran 1. Dokumen/File Pendukung', buildLampiranFilePendukung(dokumen)),
    buildLampiranSection('Lampiran 2. Daftar Hadir', buildLampiranDaftarHadir(daftar_hadir)),
    buildLampiranSection('Lampiran 3. Dokumentasi', buildLampiranDokumentasi(docImages)),
    buildLampiranSection('Lampiran 4. Notulen', buildLampiranNotulen(notulen)),
    buildLampiranSection('Lampiran 5. Pengeluaran Anggaran', buildLampiranPengeluaran(pengeluaran)),
  ]

  // ─── Assemble document definition ───────────────────────────────────────
  const docDefinition: any = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    pageMargins: [40, 210, 40, 30] as [number, number, number, number],

    // ── Repeating header (skip halaman 1 = cover) ─────────────────────────
    header: (currentPage: number) => {
      if (currentPage === 1) return null

      const kopContent = buildKopSuratContent(kop_surat as any, resolvedImageUrl)

      return {
        margin: [40, 30, 40, 12] as [number, number, number, number],
        stack: kopContent ?? [],
      }
    },

    // ── Content ───────────────────────────────────────────────────────────
    content: [
      // ═══════════ COVER PAGE ═══════════
      {
        stack: [
          { text: '', margin: [0, 60, 0, 0] as [number, number, number, number] },
          ...(resolvedImageUrl
            ? [
                {
                  image: resolvedImageUrl,
                  width: 120,
                  height: 120,
                  alignment: 'center' as const,
                  margin: [0, 0, 0, 24] as [number, number, number, number],
                },
              ]
            : []),
          {
            text: 'LAPORAN KEGIATAN',
            style: 'coverTitle' as const,
            alignment: 'center' as const,
            margin: [0, 0, 0, 24] as [number, number, number, number],
          },
          {
            text: nama_acara.toUpperCase(),
            alignment: 'center' as const,
            bold: true,
            fontSize: 16,
            margin: [0, 0, 0, 8] as [number, number, number, number],
          },
          {
            text: `TAHUN ${tahun}`,
            alignment: 'center' as const,
            bold: true,
            fontSize: 14,
            color: '#444444',
          },
        ],
        pageBreak: 'after' as const,
      },

      // ═══════════ RINGKASAN KEGIATAN ═══════════
      { stack: [buildRingkasanKegiatan(event)], pageBreak: 'after' as const },

      // ═══════════ DAFTAR ISI ═══════════
      { stack: [buildDaftarIsi()], pageBreak: 'after' as const },

      // ═══════════ CONTENT SECTIONS ═══════════
      ...contentSections.map((section) => ({
        stack: [buildContentSection(section.title, section.html)],
      })),

      // ═══════════ LAMPIRAN ═══════════
      ...lampiranSections,
    ],

    // ── Footer ────────────────────────────────────────────────────────────
    footer: (currentPage: number, pageCount: number) => {
      if (currentPage === 1) return null

      return {
        margin: [40, 10, 40, 10] as [number, number, number, number],
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
      }
    },

    // ── Styles ────────────────────────────────────────────────────────────
    styles: {
      coverTitle: {
        fontSize: 24,
        bold: true,
        color: '#161646',
        characterSpacing: 2,
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        color: '#161646',
      },
      tableHeader: {
        bold: true,
        fontSize: 9,
        color: '#333333',
      },
      tableCell: {
        fontSize: 9,
      },
    },

    defaultStyle: {
      fontSize: 10,
    },
  }

  return docDefinition
}
