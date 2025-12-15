export interface IGaleriAlbum {
  id_galeri_album: string
  id_satuan_organisasi: string
  judul: string
  created_at: string // ISO datetime string
  created_user: string
  updated_at: string // ISO datetime string
  updated_user: string
  jumlah_foto: number

  nama_user_created: string
  nama_disetujui: string
  disetujui_at: string
  nama_user_updated: string
}
