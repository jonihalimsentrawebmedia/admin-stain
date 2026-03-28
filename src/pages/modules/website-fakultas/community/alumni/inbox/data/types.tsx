export interface IInboxStory {
  id_cerita_alumni_kontak_masuk: string // UUID
  id_satuan_organisasi: string // UUID
  nama_lengkap: string
  nama_prodi: string
  kode_jenjang: string
  nama_jenjang: string
  id_prodi: string // UUID
  tahun_masuk: number
  email: string
  no_handphone: string
  created_at: string // ISO timestamp with timezone
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string // Creator name (could be empty)
  nama_user_updated: string // Updater name (could be empty)
}
