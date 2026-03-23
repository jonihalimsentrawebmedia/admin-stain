export interface IGaleriAlbum {
  id_galeri_album: string // UUID
  id_satuan_organisasi: string // UUID
  thumbnail: string // URL gambar thumbnail
  thumbnail_key: string // Nama file thumbnail
  judul: string // Judul album
  slug: string // Slug untuk URL
  created_at: string // ISO timestamp (dengan timezone)
  created_user: string // UUID user pembuat
  updated_at: string // ISO timestamp (dengan timezone)
  updated_user: string // UUID user pengubah
  jumlah_foto: number // Jumlah foto dalam album
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengubah
}
