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

    case 'editor':
      return '/modules/editor-university?url=editor'

    case 'website_prodi':
      return `/modules/select-prodi?url=website-prodi&id=${moduleSelect?.id_module}`

    case 'ppid':
      return `/modules/select-ppid?url=ppid&id=${moduleSelect?.id_module}`

    case 'pusat_karir':
      return `/modules/session-carrier?url=pusat-karir&id=${moduleSelect?.id_module}`

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