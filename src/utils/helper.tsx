import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
  differenceInYears,
  format,
  formatDistanceToNow,
  isValid,
  parse,
  parseISO,
} from 'date-fns'
import { id } from 'date-fns/locale'

export const urlStringEncode = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z-]+/g, '-') // semua selain huruf & minus → "-"
    .replace(/-+/g, '-') // hilangkan minus berulang
    .replace(/^-|-$/g, '')
}

export function TimeAgo(date: Date | string | number) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: id,
  })
}

export const TimeStampLocal = (date: any) => {
  const parsed = parse(date, "yyyy-MM-dd'T'HH:mm", new Date())

  // ubah ke ISO dengan timezone Asia/Jakarta

  return format(parsed, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    locale: id,
  })
}

export const GetModuleUrl = (moduleSelect: {
  nama_module: string
  controller: string
  id_module: string
}) => {
  const moduleName = moduleSelect.controller.toLowerCase()

  switch (moduleName) {
    case 'website_utama':
      return `/modules/select-university?url=website-utama`

    case 'website_unit': {
      return `/modules/select-unit?url=website-unit&id=${moduleSelect?.id_module}`
    }

    case 'lppm': {
      return `/modules/select-lppm?url=lppm&id=${moduleSelect?.id_module}`
    }

    case 'website_lembaga': {
      return `/modules/select-lembaga?url=website-lembaga&id=${moduleSelect?.id_module}`
    }

    case 'editor': {
      return '/modules/editor-university?url=editor'
    }

    case 'website_prodi': {
      return `/modules/select-prodi?url=website-prodi&id=${moduleSelect?.id_module}`
    }

    case 'ppid': {
      return `/modules/select-ppid?url=ppid&id=${moduleSelect?.id_module}`
    }

    case 'pusat_karir': {
      return `/modules/session-carrier?url=pusat-karir&id=${moduleSelect?.id_module}`
    }

    case 'website_fakultas': {
      return `/modules/select-fakultas?url=website-fakultas&id=${moduleSelect?.id_module}`
    }
    case 'pulsikom': {
      return `/modules/session-pulsikom?url=pulsikom&id=${moduleSelect?.id_module}`
    }

    case 'spi':{
      return `/modules/session-spi?url=spi&id=${moduleSelect?.id_module}`
    }

    default:
      return `/modules/${urlStringEncode(moduleSelect?.controller ?? '')}/dashboard`
  }
}

export function isEmpetyReturn(value: any) {
  if (value == '' || value == undefined) {
    return '-'
  }
  return value
}

export function FormatTimeAgo(dateInput: string | Date): string {
  const date = typeof dateInput === 'string' ? parseISO(dateInput) : dateInput

  if (!isValid(date)) return '-'

  const now = new Date()

  const seconds = differenceInSeconds(now, date)
  if (seconds < 60) return `${seconds} detik yang lalu`

  const minutes = differenceInMinutes(now, date)
  if (minutes < 60) return `${minutes} menit yang lalu`

  const hours = differenceInHours(now, date)
  if (hours < 24) return `${hours} jam yang lalu`

  const days = differenceInDays(now, date)
  if (days < 7) return `${days} hari yang lalu`

  const weeks = differenceInWeeks(now, date)
  if (weeks < 4) return `${weeks} minggu yang lalu`

  const months = differenceInMonths(now, date)
  if (months < 12) return `${months} bulan yang lalu`

  const years = differenceInYears(now, date)
  return `${years} tahun yang lalu`
}

export function StatusPublish(value: string) {
  switch (value) {
    case 'DIAJUKAN_EDITOR':
      return <div className="text-blue-500">Diajukan Ke Editor</div>
    case 'PROSES_EDITOR':
      return <div className="text-blue-500">Proses Editor</div>
    case 'TOLAK_EDITOR':
      return <div className="text-red-500">Ditolak</div>
    case 'DISETUJUI_EDITOR':
      return <div className="text-green-500">Disetujui</div>
  }
}

export const GetCharacterFirst = (text?: string | null): string => {
  if (!text) return ''

  return text
    .trim()
    .split(/\s+/) // pisah berdasarkan spasi
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
}

export const getRelativeTime = (date: Date | string): string => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date
  const distance = formatDistanceToNow(parsedDate, { addSuffix: true, locale: id })

  let result = distance
    .replace('yang lalu', 'lalu')
    .replace(/^kurang dari /, '') // remove "kurang dari" for very recent
    .trim()

  result = result.charAt(0).toUpperCase() + result.slice(1)

  if (!result || result === 'Lalu') {
    return 'Baru saja'
  }

  return result
}


type TableRow = {
  topik: string
  januari?: string
  februari?: string
  maret?: string
  april?: string
  mei?: string
  juni?: string
  juli?: string
  agustus?: string
}

const MONTH_MAP: Record<string, keyof TableRow> = {
  januari: 'januari',
  februari: 'februari',
  maret: 'maret',
  april: 'april',
  mei: 'mei',
  juni: 'juni',
  juli: 'juli',
  agustus: 'agustus',
}

const formatRange = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)

  const format = (d: Date) =>
    d.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
    })

  return `${format(s)} - ${format(e)}`
}

export const transformToTable = (data: any[]) => {
  return data.map((training) => {
    const rows: TableRow[] = []

    training.list_topik.forEach((topik: any) => {
      const row: TableRow = {
        topik: topik.nama_topik.trim(),
      }

      const jadwal = topik.jadwal_topik || {}

      Object.entries(jadwal).forEach(([bulan, list]: any) => {
        const key = MONTH_MAP[bulan.toLowerCase()]
        if (!key) return

        const item = list?.[0]
        if (!item) return

        row[key] = formatRange(
          item.tanggal_mulai_bahasan,
          item.tanggal_selesai_bahasan
        )
      })

      rows.push(row)
    })

    return {
      nama_training: training.nama_training,
      rows,
    }
  })
}