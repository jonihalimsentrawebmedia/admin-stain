export interface INUmberLetterAutomatic {
  id_nomor_surat_otomatis: string
  id_satuan_organisasi: string
  id_unit: string | null
  pengisian_no_surat: 'OTOMATIS' | 'MANUAL'
  isi_surat_otomatis: boolean
  nama_nomor_surat: string
  kode_depan: string
  kode_belakang: string
  urutan_kode_depan: number
  urutan_posisi_utama_no_surat: number
  urutan_kode_belakang: number
  is_perlu_bulan: boolean
  is_bulan_romawi: boolean
  urutan_bulan: number
  is_perlu_tahun: boolean
  urutan_tahun: number
  counter_saat_ini: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nama_unit: string
}
