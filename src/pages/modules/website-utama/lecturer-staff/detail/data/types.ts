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

export interface IPublication {
  id_publikasi: string // UUID
  id_sdm: string // UUID
  id_sister: string // UUID
  id_satuan_organisasi: string // UUID
  judul_publikasi: string
  jenis_publikasi: string
  tanggal_terbit: string // Format: YYYY-MM-DD
  url_jurnal: string
  created_at: string // ISO8601 Timestamp
  created_user: string
  updated_at: string // ISO8601 Timestamp
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string // ISO8601 Timestamp
  sumber_data: 'SISTER' | string
}

export interface IHKI {
  id_hki_paten: string
  id_sdm: string
  id_sister: string
  id_satuan_organisasi: string
  judul: string
  jenis_publikasi: string
  tanggal_terbit: string // Format: YYYY-MM-DD
  created_at: string // ISO8601 Timestamp
  created_user: string
  updated_at: string // ISO8601 Timestamp
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string // ISO8601 Timestamp
  sumber_data: string
}

export interface IDevotion {
  id_pengabdian: string
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  judul_pengabdian: string
  tahun_pelaksanaan: string
  lama_kegiatan: string
  created_at: string // ISO8601 Timestamp
  created_user: string
  updated_at: string // ISO8601 Timestamp
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string | null
  sumber_data: 'manual' | 'SISTER' | string
}

export interface ISyncStatus {
  status: 'not_started' | 'pending' | 'running' | 'completed' | 'failed' | string
  pending: number
  completed: number
  running: number
  failed: number
  too_many_retries: number
  not_retry: number
  job_can_running: number
  job_cannot_running: number
}
