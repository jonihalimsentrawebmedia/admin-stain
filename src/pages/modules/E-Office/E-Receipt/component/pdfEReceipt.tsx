import type { IEreceipt } from '@/pages/modules/E-Office/E-Receipt/data/types.ts'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake from '@/utils/pdfmake.ts'

const pageWidth = 600.944882
const pageHeight = 263.622047

function formatDate(value?: string) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function formatCurrency(value?: string | number): string {
  const amount = Number(value ?? 0)
  if (Number.isNaN(amount)) return String(value || '-')
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const satuan = [
  '',
  'satu',
  'dua',
  'tiga',
  'empat',
  'lima',
  'enam',
  'tujuh',
  'delapan',
  'sembilan',
  'sepuluh',
  'sebelas',
]

function terbilang(nilai: number): string {
  const angka = Math.floor(Math.abs(nilai))
  if (angka < 12) return satuan[angka]
  if (angka < 20) return `${terbilang(angka - 10)} belas`
  if (angka < 100)
    return `${terbilang(Math.floor(angka / 10))} puluh ${terbilang(angka % 10)}`.trim()
  if (angka < 200) return `seratus ${terbilang(angka - 100)}`.trim()
  if (angka < 1000)
    return `${terbilang(Math.floor(angka / 100))} ratus ${terbilang(angka % 100)}`.trim()
  if (angka < 2000) return `seribu ${terbilang(angka - 1000)}`.trim()
  if (angka < 1000000)
    return `${terbilang(Math.floor(angka / 1000))} ribu ${terbilang(angka % 1000)}`.trim()
  if (angka < 1000000000)
    return `${terbilang(Math.floor(angka / 1000000))} juta ${terbilang(angka % 1000000)}`.trim()
  if (angka < 1000000000000)
    return `${terbilang(Math.floor(angka / 1000000000))} miliar ${terbilang(angka % 1000000000)}`.trim()
  return `${terbilang(Math.floor(angka / 1000000000000))} triliun ${terbilang(angka % 1000000000000)}`.trim()
}

function toTitleCase(value: string) {
  return value
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function getSerial(row: IEreceipt) {
  const source = row.nomor_serial || row.no_kwitansi || row.id_kwitansi || '-'
  return source.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() || '-'
}

function escapeXml(value: string) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const colorThemeMap: Record<string, { guilloche: string; bg: string }> = {
  '#feb019': { guilloche: '#f3b61f', bg: '#fff8df' },
  '#0c3d88': { guilloche: '#4d8fe8', bg: '#eef6ff' },
  '#bb0026': { guilloche: '#ee4d6d', bg: '#fff0f3' },
  '#11e11a': { guilloche: '#2f9b73', bg: '#eefaf5' },
}

function getGuillocheColor(warna?: string) {
  if (warna && colorThemeMap[warna]) return colorThemeMap[warna].guilloche
  return colorThemeMap['#0c3d88'].guilloche
}

function getGuillocheBgColor(warna?: string) {
  if (warna && colorThemeMap[warna]) return colorThemeMap[warna].bg
  return colorThemeMap['#0c3d88'].bg
}

type Point = { x: number; y: number }

function formatPoint(value: number) {
  return Number(value.toFixed(2))
}

function buildSmoothClosedPath(points: Point[], tension = 0.72) {
  if (!points.length) return ''
  const size = points.length
  const commands = [`M${formatPoint(points[0].x)} ${formatPoint(points[0].y)}`]
  for (let i = 0; i < size; i++) {
    const previous = points[(i - 1 + size) % size]
    const current = points[i]
    const next = points[(i + 1) % size]
    const afterNext = points[(i + 2) % size]
    const control1 = {
      x: current.x + ((next.x - previous.x) / 6) * tension,
      y: current.y + ((next.y - previous.y) / 6) * tension,
    }
    const control2 = {
      x: next.x - ((afterNext.x - current.x) / 6) * tension,
      y: next.y - ((afterNext.y - current.y) / 6) * tension,
    }
    commands.push(
      `C${formatPoint(control1.x)} ${formatPoint(control1.y)}, ${formatPoint(control2.x)} ${formatPoint(control2.y)}, ${formatPoint(next.x)} ${formatPoint(next.y)}`,
    )
  }
  return `${commands.join(' ')} Z`
}

function buildGuillocheLoop(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  phase = 0,
  frequency = 18,
  depth = 0.036,
  steps = 240,
) {
  const points: Point[] = []
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const braidedWave = Math.sin(t * frequency + phase)
    const counterWave = Math.sin(t * (frequency / 2 + 3) - phase * 1.35)
    const softWave = Math.cos(t * 3 - phase * 0.45)
    const mod =
      1 + depth * braidedWave + depth * 0.28 * counterWave + depth * 0.1 * softWave
    points.push({
      x: cx + Math.cos(t) * rx * mod,
      y: cy + Math.sin(t) * ry * mod,
    })
  }
  return buildSmoothClosedPath(points)
}

function buildOvalGuilloche(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  stroke: string,
  options?: {
    count?: number
    opacity?: number
    strokeWidth?: number
    rotateStep?: number
    depth?: number
  },
) {
  const count = options?.count ?? 46
  const opacity = options?.opacity ?? 0.18
  const strokeWidth = options?.strokeWidth ?? 0.18
  const rotateStep = options?.rotateStep ?? 2.2
  const depth = options?.depth ?? 0.036
  return Array.from({ length: count })
    .map((_, index) => {
      const localRx = rx - index * 2.15
      const localRy = ry - index * 1.18
      if (localRx <= 14 || localRy <= 8) return ''
      const phase = index * 0.27
      const frequency = 15 + (index % 7)
      const angle = (index - count / 2) * rotateStep
      return `
        <path
          d="${buildGuillocheLoop(cx, cy, localRx, localRy, phase, frequency, depth)}"
          fill="none"
          stroke="${stroke}"
          stroke-width="${strokeWidth}"
          opacity="${opacity}"
          transform="rotate(${angle.toFixed(2)} ${cx} ${cy})"
        />
      `
    })
    .join('')
}

function buildRoundGuilloche(
  cx: number,
  cy: number,
  radius: number,
  stroke: string,
  options?: {
    count?: number
    opacity?: number
    strokeWidth?: number
    scaleY?: number
    depth?: number
  },
) {
  const count = options?.count ?? 32
  const opacity = options?.opacity ?? 0.24
  const strokeWidth = options?.strokeWidth ?? 0.18
  const scaleY = options?.scaleY ?? 1
  const depth = options?.depth ?? 0.04
  return Array.from({ length: count })
    .map((_, index) => {
      const r = radius - index * 1.28
      if (r <= 5) return ''
      const phase = index * 0.33
      const frequency = 13 + (index % 6)
      const angle = index * 9
      return `
        <path
          d="${buildGuillocheLoop(cx, cy, r, r * scaleY, phase, frequency, depth)}"
          fill="none"
          stroke="${stroke}"
          stroke-width="${strokeWidth}"
          opacity="${opacity}"
          transform="rotate(${angle.toFixed(2)} ${cx} ${cy})"
        />
      `
    })
    .join('')
}

function buildFineLines(stroke: string) {
  return Array.from({ length: 58 })
    .map((_, index) => {
      const y = -42 + index * 5.8
      return `
        <path
          d="M-40 ${y.toFixed(2)}
          C90 ${(y + 26).toFixed(2)}, 180 ${(y - 31).toFixed(2)}, 305 ${(y + 8).toFixed(2)}
          S505 ${(y + 28).toFixed(2)}, 640 ${(y - 12).toFixed(2)}"
          fill="none"
          stroke="${stroke}"
          stroke-width="0.18"
          opacity="0.13"
        />
      `
    })
    .join('')
}

function buildSecurityRing(cx: number, cy: number, radius: number, stroke: string, opacity = 0.3) {
  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${stroke}" stroke-width="0.25" opacity="${opacity}"/>
    <circle cx="${cx}" cy="${cy}" r="${radius * 0.72}" fill="none" stroke="${stroke}" stroke-width="0.25" opacity="${opacity}"/>
    <circle cx="${cx}" cy="${cy}" r="${radius * 0.42}" fill="none" stroke="${stroke}" stroke-width="0.25" opacity="${opacity}"/>
  `
}

function buildGuillocheSvg(serial: string, warna?: string) {
  const guillocheColor = getGuillocheColor(warna)
  const guillocheBgColor = getGuillocheBgColor(warna)

  const centerPattern = [
    buildOvalGuilloche(358, 128, 178, 95, guillocheColor, {
      count: 48, opacity: 0.16, strokeWidth: 0.18, rotateStep: 1.55, depth: 0.034,
    }),
    buildOvalGuilloche(358, 128, 136, 76, guillocheColor, {
      count: 38, opacity: 0.19, strokeWidth: 0.18, rotateStep: 2.1, depth: 0.038,
    }),
    buildRoundGuilloche(358, 128, 76, guillocheColor, {
      count: 30, opacity: 0.23, strokeWidth: 0.19, depth: 0.044,
    }),
    buildRoundGuilloche(358, 128, 37, guillocheColor, {
      count: 18, opacity: 0.32, strokeWidth: 0.2, depth: 0.052,
    }),
    buildSecurityRing(358, 128, 62, guillocheColor, 0.18),
  ].join('')

  const leftPanelPattern = [
    buildOvalGuilloche(55, 118, 46, 84, guillocheColor, {
      count: 40, opacity: 0.21, strokeWidth: 0.18, rotateStep: 2.15, depth: 0.038,
    }),
    buildRoundGuilloche(55, 118, 43, guillocheColor, {
      count: 24, opacity: 0.25, strokeWidth: 0.18, scaleY: 1, depth: 0.044,
    }),
    buildSecurityRing(55, 118, 31, guillocheColor, 0.2),
  ].join('')

  const smallLeftPattern = [
    buildRoundGuilloche(158, 142, 35, guillocheColor, {
      count: 20, opacity: 0.24, strokeWidth: 0.18, depth: 0.044,
    }),
    buildSecurityRing(158, 142, 24, guillocheColor, 0.19),
  ].join('')

  const smallRightPattern = [
    buildRoundGuilloche(548, 130, 38, guillocheColor, {
      count: 22, opacity: 0.24, strokeWidth: 0.18, depth: 0.044,
    }),
    buildSecurityRing(548, 130, 25, guillocheColor, 0.19),
  ].join('')

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${pageWidth}" height="${pageHeight}" viewBox="0 0 ${pageWidth} ${pageHeight}">
      <rect width="100%" height="100%" fill="${guillocheBgColor}"/>
      ${buildFineLines(guillocheColor)}
      <rect x="5" y="7" width="100" height="250" rx="7" fill="#ffffff" stroke="${guillocheColor}" stroke-width="0.4" opacity="0.76"/>
      <rect x="109" y="7" width="486" height="250" rx="7" fill="#ffffff" stroke="${guillocheColor}" stroke-width="0.4" opacity="0.68"/>
      ${leftPanelPattern}
      ${smallLeftPattern}
      ${centerPattern}
      ${smallRightPattern}
      <text x="358" y="151" text-anchor="middle" font-family="Helvetica" font-size="44" font-weight="700" fill="${guillocheColor}" opacity="0.065">KWITANSI</text>
      <text x="358" y="174" text-anchor="middle" font-family="Helvetica" font-size="8" fill="${guillocheColor}" opacity="0.13">${escapeXml(serial)}</text>
    </svg>
  `
}

function line(x1: number, y1: number, x2: number, y2: number, width = 0.55) {
  return {
    type: 'line' as const,
    x1, y1, x2, y2,
    lineWidth: width,
    lineColor: '#111111',
  }
}

function dashLine(x1: number, y1: number, x2: number, y2: number) {
  return {
    type: 'line' as const,
    x1, y1, x2, y2,
    lineWidth: 0.65,
    lineColor: '#111111',
    dash: { length: 3.8, space: 4.8 },
  }
}

function buildLowerSectionSvg(row: IEreceipt) {
  const barcode = Array.from({ length: 24 })
    .map((_, index) => {
      const y = 184 + index * 1.45
      return `
      <line
        x1="118" y1="${y.toFixed(2)}"
        x2="280" y2="${y.toFixed(2)}"
        stroke="#9ca3af" stroke-width="0.65" opacity="0.55"
      />
    `
    })
    .join('')

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${pageWidth}" height="${pageHeight}" viewBox="0 0 ${pageWidth} ${pageHeight}">
      ${barcode}
      <text x="199" y="208" text-anchor="middle" font-family="Helvetica" font-size="16" font-weight="700" fill="#000000">${escapeXml(formatCurrency(row.jumlah))}</text>
      <line x1="318" y1="214" x2="432" y2="214" stroke="#111111" stroke-width="0.75"/>
      <line x1="476" y1="214" x2="590" y2="214" stroke="#111111" stroke-width="0.75"/>
      <text x="375" y="224" text-anchor="middle" font-family="Helvetica" font-size="7" font-weight="700" fill="#000000">Tanda Tangan Penerima</text>
      <text x="375" y="234" text-anchor="middle" font-family="Helvetica" font-size="7" font-weight="700" fill="#000000">(${escapeXml(row.nama_penerima || '-')})</text>
      <text x="533" y="224" text-anchor="middle" font-family="Helvetica" font-size="7" font-weight="700" fill="#000000">Tanda Tangan Penyetor</text>
      <text x="533" y="234" text-anchor="middle" font-family="Helvetica" font-size="7" font-weight="700" fill="#000000">(${escapeXml(row.nama_penyetor || '-')})</text>
    </svg>
  `
}

export function generatePdfEReceipt(row: IEreceipt) {
  const serial = getSerial(row)
  const amount = Number(row.jumlah ?? 0)
  const terbilangText = Number.isNaN(amount) ? '-' : `${toTitleCase(terbilang(amount))} Rupiah`
  const noKwitansi = row.no_kwitansi || serial
  const qrPayload = `${window.location.origin}/cekkwitansi?serial_number=${row?.id_kwitansi}`

  const docDefinition = {
    pageSize: { width: pageWidth, height: pageHeight },
    pageMargins: [0, 0, 0, 0] as [number, number, number, number],
    defaultStyle: {
      font: 'Roboto',
      fontSize: 9,
      color: '#111111',
    },
    background: [
      {
        svg: buildGuillocheSvg(serial, row.warna),
        width: pageWidth,
        height: pageHeight,
        absolutePosition: { x: 0, y: 0 },
      },
    ],
    content: [
      {
        canvas: [
          line(120, 38, 580, 38, 1.35),
          dashLine(178, 72, 304, 72),
          dashLine(482, 72, 578, 72),
          dashLine(222, 95, 578, 95),
          dashLine(222, 118, 578, 118),
          dashLine(222, 142, 578, 142),
        ],
      },
      {
        text: 'KWITANSI',
        absolutePosition: { x: 109, y: 17 },
        width: 486,
        alignment: 'center',
        fontSize: 18,
        bold: true,
        color: '#000000',
        characterSpacing: 1.3,
      },
      {
        text: 'No:',
        absolutePosition: { x: 137, y: 61 },
        fontSize: 9.5,
        bold: true,
      },
      {
        text: noKwitansi,
        absolutePosition: { x: 178, y: 61 },
        width: 125,
        fontSize: 9,
      },
      {
        text: 'Tanggal:',
        absolutePosition: { x: 425, y: 61 },
        fontSize: 9.5,
        bold: true,
      },
      {
        text: formatDate(row.tanggal),
        absolutePosition: { x: 482, y: 61 },
        width: 96,
        fontSize: 9,
      },
      {
        text: 'Terima Dari:',
        absolutePosition: { x: 137, y: 85 },
        fontSize: 9.5,
        bold: true,
      },
      {
        text: row.nama_penyetor || '-',
        absolutePosition: { x: 222, y: 85 },
        width: 350,
        fontSize: 9,
      },
      {
        text: 'Terbilang:',
        absolutePosition: { x: 137, y: 108 },
        fontSize: 9.5,
        bold: true,
      },
      {
        text: terbilangText,
        absolutePosition: { x: 222, y: 108 },
        width: 350,
        fontSize: 9,
      },
      {
        text: 'Untuk\nPembayaran:',
        absolutePosition: { x: 137, y: 131 },
        fontSize: 9.5,
        bold: true,
        lineHeight: 0.95,
      },
      {
        text: row.keterangan || '-',
        absolutePosition: { x: 222, y: 131 },
        width: 350,
        fontSize: 9,
      },
      {
        svg: buildLowerSectionSvg(row),
        width: pageWidth,
        height: pageHeight,
        absolutePosition: { x: 0, y: 0 },
      },
      {
        qr: qrPayload,
        fit: 42,
        absolutePosition: { x: 11, y: 206 },
        foreground: '#000000',
        background: '#ffffff',
      },
    ],
    info: {
      title: `KWITANSI_${noKwitansi}`,
      author: 'Admin Web',
      subject: 'E-Kwitansi',
      keywords: 'e-kwitansi, kwitansi, receipt',
      creator: 'Admin Web',
      producer: 'Admin Web',
    },
  }

  return pdfMake.createPdf(docDefinition as TDocumentDefinitions)
}
