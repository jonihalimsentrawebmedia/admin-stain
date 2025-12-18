export interface IGalleryVideo {
  id_galeri_video: string
  id_satuan_organisasi: string
  judul: string
  link_video: string
  created_at: string // ISO datetime string
  created_user: string
  updated_at: string // ISO datetime string
  updated_user: string
  thumbnail: string

  nama_user_created: string
  nama_disetujui: string
  disetujui_at: string
  nama_user_updated: string
}
