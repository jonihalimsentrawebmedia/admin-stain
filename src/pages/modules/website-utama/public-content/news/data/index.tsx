import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export interface INewsDetail {
  id_berita: string
  id_satuan_organisasi: string
  gambar: string
  gambar_key: string
  keterangan_gambar: string
  judul: string
  id_kategori_berita: string
  isi_berita: string
  penulis: string
  status: string
  status_publish: StatusPublish
  diajukan_at: string | null
  ditolak_at: string | null
  alasan_ditolak: string | null
  disetujui_at: string | null
  diterbitkan_at: string | null
  proses_at: string | null
  published_at: string | null
  unpublished_at: string | null
  diajukan_user: string | null
  ditolak_user: string | null
  disetujui_user: string | null
  proses_user: string | null
  published_user: string | null
  unpublished_user: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  berita_gambar_tambahan: IImageNewsMore[] // kalau ada struktur, kasihkan, nanti kubuatin
  nama_kategori_berita: string

  nama_user_created: string
  nama_user_updated: string
  nama_disetujui: string
}

export interface IImageNewsMore {
  id_berita_gambar_tambahan: number
  id_berita: string
  gambar: string
  gambar_key: string
  keterangan: string
}
