export interface IThemeProdi {
  thema: string
  active: boolean
  image: string
  tanggal_aktif: string | null
  is_tersedia: boolean
  nama_user_updated: string | null
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
