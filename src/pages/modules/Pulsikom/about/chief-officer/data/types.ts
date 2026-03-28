export interface IGroupChief {
  id_kelompok_pimpinan: string // UUID
  id_satuan_organisasi: string // UUID
  nama_kelompok: string
  slug: string
  created_at: string // ISO timestamp with timezone
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
