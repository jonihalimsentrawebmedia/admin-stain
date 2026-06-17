export interface IPrintSettings {
  cetak_config: ICetakConfig
  daftar_hadir: IDaftarHadir[]
}

export interface ICetakConfig {
  id_acara_cetak_daftar_hadir: string
  id_acara: string
  id_satuan_organisasi: string

  nomor: boolean
  nama_peserta: boolean
  instansi: boolean
  hp: boolean
  email: boolean
  jabatan: boolean
  tanda_tangan: boolean
  keterangan: boolean

  hasil_cetak: 'PORTRAIT' | 'LANDSCAPE'

  jumlah_peserta: number

  label_diketahui: string
  jabatan_diketahui: string
  nama_diketahui: string

  label_mengetahui: string
  jabatan_mengetahui: string
  nama_mengetahui: string

  saksi_pendatang: any[]

  id_kop_surat: string
  kop_surat: IKopSurat

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IKopSurat {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string

  nama_unit: string

  url_logo: string
  key_logo: string

  pengaturan: IKopSuratPengaturan[]

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IKopSuratPengaturan {
  isi: string
  jenis_font: string
  gaya_font: 'normal' | 'bold' | 'italic'
  ukuran_font: number
  warna: string
}

export interface IDaftarHadir {
  id_acara_daftar_hadir: string
  id_acara: string
  id_satuan_organisasi: string

  id_sdm: string
  sumber: string

  nama_lengkap: string

  id_unit: string
  id_unit_kerja: string

  jabatan: string
  no_hp: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string

  nama_unit: string
  nama_unit_kerja: string
}
