export interface IGaleriAlbum {
  id_galeri_album: string // UUID
  id_satuan_organisasi: string // UUID
  thumbnail: string // URL gambar
  thumbnail_key: string // Key file gambar
  judul: string
  slug: string
  created_at: string // ISO timestamp dengan timezone
  created_user: string // ID user pembuat (string)
  updated_at: string
  updated_user: string
  jumlah_foto: number // Jumlah foto dalam album
  nama_user_created: string
  nama_user_updated: string
}
