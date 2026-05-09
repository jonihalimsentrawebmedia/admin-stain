export interface ThemaPPID {
  image: string // URL string
  thema: string
  active: boolean
  tanggal_aktif: string // ISO Date string
  nama_user_updated: string
  default: string
  keterangan: string
}

export interface ThemeColor {
  id_satuan_organisasi_thema_color: string
  id_satuan_organisasi: string
  thema: string
  color_halaman_utama: string
  color_background: string
  image_path: string
}
