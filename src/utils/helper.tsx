import { format, formatDistanceToNow, parse } from 'date-fns'
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

export const GetModuleUrl = (moduleSelect: { nama_module: string; controller?: string }) => {
  const moduleName = moduleSelect.nama_module.toLowerCase()

  switch (moduleName) {
    case 'website utama':
      return '/modules/select-university?url=website-utama'

    case 'website unit': {
      return '/modules/select-unit?url=website-unit'
    }

    case 'manajemen editor':
      return '/modules/editor-university?url=editor'

    case 'website prodi':
      return '/modules/select-prodi?url=website-prodi'

    default:
      return `/modules/${urlStringEncode(moduleSelect?.controller ?? '')}/dashboard`
  }
}

export function isEmpetyReturn(value: any) {
  if (value == '' || value == undefined || value == null) {
    return '-'
  }
  return value
}


import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  parseISO,
  isValid,
} from 'date-fns'

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
