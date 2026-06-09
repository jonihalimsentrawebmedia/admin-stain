export interface PrintExpenditure {
  cetak_config: CetakConfig
  pengeluaran: Pengeluaran[]
}

export interface CetakConfig {
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

  saksi_pendatang: any[] // atau Saksi[] jika ada struktur tetap

  id_kop_surat: string
  kop_surat: KopSurat

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface KopSurat {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: PengaturanKop[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface PengaturanKop {
  isi: string
  jenis_font: string
  gaya_font: 'bold' | 'normal' | 'italic'
  ukuran_font: number
}

export interface Pengeluaran {
  id_acara_pengeluaran: string
  id_acara: string
  id_satuan_organisasi: string

  uraian_pengeluaran: string
  tanggal_pengeluaran: string
  yang_membayar: string
  tempat_pembelian: string
  jumlah_pengeluaran: string // string karena ada kemungkinan format angka besar

  url_file_pengeluaran: string
  key_file_pengeluaran: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
