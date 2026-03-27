export interface IGaleriPhoto {
  id_galeri_foto: string // UUID
  id_satuan_organisasi: string // UUID
  id_album: string // UUID album tempat foto berada
  judul: string
  slug: string
  link_foto: string // URL gambar
  created_at: string // ISO timestamp with timezone
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
