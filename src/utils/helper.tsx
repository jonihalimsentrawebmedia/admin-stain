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
      return '/modules/select-university?url=editor'

    case 'website prodi':
      return '/modules/select-prodi?url=website-prodi'

    default:
      return `/modules/${urlStringEncode(moduleSelect?.controller ?? '')}/dashboard`
  }
}
