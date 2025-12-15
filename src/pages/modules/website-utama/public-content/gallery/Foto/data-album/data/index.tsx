export interface IGalleryPhoto {
  id_galeri_foto: string
  id_satuan_organisasi: string
  id_album: string
  judul: string
  link_foto: string
  created_at: string // ISO datetime
  created_user: string
  updated_at: string // ISO datetime
  updated_user: string

  nama_user_created: string
  nama_disetujui: string
  disetujui_at: string
  nama_user_updated: string
}
