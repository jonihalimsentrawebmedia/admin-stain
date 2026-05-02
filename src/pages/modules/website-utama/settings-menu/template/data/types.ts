export interface IThemeUnit {
  thema: string
  active: boolean
  image: string
  tanggal_aktif: string | null
  keterangan: string
  nama_user_updated: string | null
  default: string
}

export interface ThemeColor {
  id_satuan_organisasi_thema_color: string
  id_satuan_organisasi: string
  thema: string
  color_halaman_utama: string
  color_background: string
  image_path: string
}
