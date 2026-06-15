export interface IDashboardCount {
  suratMasuk: number
  suratKeluar: number
  acara: number
  acaraDaftarHadir: number
}

export interface IChartLetterNature {
  id_sifat_surat: string
  nama_sifat: string
  warna_sifat: string
  total: number
}

export interface IDashboardSummary {
  period: IDashboardPeriod
  items: IDashboardSummaryItem[]
}

export interface IDashboardPeriod {
  this_month: string
  last_month: string
}

export interface IDashboardSummaryItem {
  label: string
  this_month: number
  last_month: number
  difference: number
  percent_change: string
  trend: 'naik' | 'turun' | 'stabil'
}

export interface IDashboardStatistic {
  dari: string
  sampai: string
  items: IDashboardStatisticItem[]
  total: IDashboardStatisticTotal
}

export interface IDashboardStatisticItem {
  label: string
  dari: string
  sampai: string

  surat_masuk: number
  surat_keluar: number
}

export interface IDashboardStatisticTotal {
  surat_masuk: number
  surat_keluar: number
}

export interface IDashboardAgenda {
  id: string
  tipe_item: string
  tipe_surat: string
  nomor_surat: string
  perihal: string
  nama_kegiatan: string
  tempat: string
  is_penting: boolean
  jam_pengingat: string
  tanggal_mulai: string
  nama_sifat_surat: string
  warna_sifat_surat: string
  urutan: number
}

export interface IDashboardSummary {
  surat_disposisi: number
  agenda_bulan_ini: number
  buku_tamu_bulan_ini: number
}
