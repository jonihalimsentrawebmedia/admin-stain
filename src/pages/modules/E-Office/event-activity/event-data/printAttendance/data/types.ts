export interface PrintAttendance {
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
  hasil_cetak: 'portrait' | 'landscape'
  jumlah_peserta: number
  label_diketahui: string
  jabatan_diketahui: string
  nama_diketahui: string
  label_mengetahui: string
  jabatan_mengetahui: string
  nama_mengetahui: string
  saksi_penandatanganan: MoreReviewer[]

  created_at: string // ISO datetime
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface MoreReviewer {
  label?: string
  nama?: string
  jabatan?: string
}
