export interface IFormalEducation {
  id_pendidikan_formal: string
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  jenjang: string // Contoh: "S2"
  gelar: string // Contoh: "Magister"
  bidang_studi: string
  perguruan_tinggi: string
  tahun_lulus: string // Bisa menggunakan number jika Anda melakukan casting
  created_at: string // ISO 8601 Date String
  created_user: string
  updated_at: string
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string | null
  sumber_data: 'manual' | 'sister' | string
}
export interface IFunctionalPosition {
  id_jabatan_fungsional: string
  id_sdm: string // Walaupun kosong di contoh, tipe datanya tetap string
  id_sister: string | null
  id_satuan_organisasi: string
  jabatan_fungsional: string // Contoh: "Guru Besar"
  no_sk: string
  terhitung_mulai: string // Format: "YYYY-MM-DD"
  created_at: string // ISO 8601 Date String
  created_user: string
  updated_at: string
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string | null
  sumber_data: 'manual' | 'sister' | string
}

export interface IRank {
  id_kepangkatan: string
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  golongan_pangkat: string // Contoh: "III/d (Penata Tk. I)"
  no_sk: string
  tanggal_mulai: string // Format: "YYYY-MM-DD"
  created_at: string // ISO 8601 Date String
  created_user: string
  updated_at: string
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string | null
  sumber_data: 'SISTER' | 'manual' | string
}

export interface IResearch {
  id_penelitian: string
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  judul_penelitian: string
  tahun_pelaksanaan: string // Bisa di-cast ke number jika diperlukan untuk komputasi
  created_at: string // ISO 8601 Date String
  created_user: string
  updated_at: string
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string | null
  sumber_data: 'SISTER' | 'manual' | string
}
