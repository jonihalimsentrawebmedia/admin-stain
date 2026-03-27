export interface IServices {
  id_layanan: string // UUID
  id_satuan_organisasi: string // UUID
  nama_layanan: string
  url: string
  is_footer: boolean
  created_at: string // ISO timestamp
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
