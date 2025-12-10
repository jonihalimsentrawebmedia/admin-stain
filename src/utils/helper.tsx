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
