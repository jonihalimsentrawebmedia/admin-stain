interface IFormatNomorSurat {
  urutan_bulan: number
  urutan_kode_belakang: number
  urutan_kode_depan: number
  urutan_nomor_surat: number
  urutan_tahun: number

  kode_belakang: string
  kode_depan: string

  is_bulan: boolean
  is_bulan_romawi: boolean
  is_tahun: boolean
}

function toRoman(num: number): string {
  const romanMap: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ]

  let result = ''

  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol
      num -= value
    }
  }

  return result
}

export function GenerateLetterCodeNumber(
  config: IFormatNomorSurat,
  nomorSurat = '[Nomor Surat]'
): string {
  const now = new Date()

  const bulan = now.getMonth() + 1
  const tahun = now.getFullYear()

  const items: Array<{
    urutan: number
    value: string
  }> = []

  // Kode depan
  if (config.kode_depan?.trim()) {
    items.push({
      urutan: config.urutan_kode_depan,
      value: config.kode_depan,
    })
  }

  // Nomor surat
  items.push({
    urutan: config.urutan_nomor_surat,
    value: `<span class="text-lg font-semibold text-red-500">${nomorSurat}</span>`,
  })

  // Kode belakang
  if (config.kode_belakang?.trim()) {
    items.push({
      urutan: config.urutan_kode_belakang,
      value: config.kode_belakang,
    })
  }

  // Bulan
  if (config.is_bulan) {
    items.push({
      urutan: config.urutan_bulan,
      value: config.is_bulan_romawi ? toRoman(bulan) : String(bulan).padStart(2, '0'),
    })
  }

  // Tahun
  if (config.is_tahun) {
    items.push({
      urutan: config.urutan_tahun,
      value: String(tahun),
    })
  }

  return items
    .sort((a, b) => a.urutan - b.urutan)
    .map((item) => item.value)
    .filter((value) => value.trim() !== '')
    .join(' / ')
}
