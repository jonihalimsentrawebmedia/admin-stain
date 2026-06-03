export interface ISettingLetterHeader {
  isi: string
  jenis_font: string
  gaya_font: string
  ukuran_font: number
}

export interface ILetterHeader {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: ISettingLetterHeader[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
