export interface IShortcut {
  id_pintasan: string // UUID
  id_satuan_organisasi: string // UUID
  nama_pintasan: string
  url_gambar: string // URL dari Linode Storage
  key_gambar: string // Filename unik di storage
  created_user: string
  updated_user: string
  created_at: string // ISO 8601 Timestamp
  updated_at: string // ISO 8601 Timestamp
  nama_created_user: string
  nama_updated_user: string
}
