export interface IGaleriVideo {
  id_galeri_video: string // UUID
  id_satuan_organisasi: string // UUID
  thumbnail: string // URL gambar thumbnail
  thumbnail_key: string // Key file thumbnail
  judul: string
  slug: string
  link_video: string // URL video
  created_at: string // ISO timestamp
  created_user: string // User ID (string)
  updated_at: string
  updated_user: string
  nama_user_created: string // Nama user pembuat (bisa kosong)
  nama_user_updated: string // Nama user pengupdate (bisa kosong)
}
