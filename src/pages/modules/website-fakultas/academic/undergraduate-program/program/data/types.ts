export interface IProgramUndergraduate {
  id_fakultas_international_ungreaduate_program: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // Image URL
  key_gambar: string // Storage key
  nama_program: string // Program name
  created_at: string // ISO timestamp with timezone
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
