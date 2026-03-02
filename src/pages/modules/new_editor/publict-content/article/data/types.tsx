import type { StatusPublish } from '@/pages/modules/website-prodi/public-content/news/data/types.ts'

export interface IArticle {
  id_artikel: string
  id_satuan_organisasi: string
  gambar: string
  gambar_key: string
  keterangan_gambar: string
  judul: string
  slug: string
  isi_artikel: string
  penulis: string
  baca: number
  publish: 'Y' | 'N'
  status: 'Y' | 'N'
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

  artikel_gambar_tambahan: PromosiGambarTambahan[]

  nama_user_created: string
  nama_user_updated: string
  nama_disetujui: string | null
  nama_published: string | null

  nama_diajukan: string
  nama_ditolak: string
  nama_proses: string
  nama_unpublished: string
  level_disetujui: string
  level_published: string
  level_diajukan: string
  level_ditolak: string
  level_proses: string
  level_unpublished: string
  nama_satuan_organisasi: string
  nama_user: string
  nama_level: string
}

export interface PromosiGambarTambahan {
  id_promosi_gambar_tambahan: number
  gambar: string
  gambar_key: string
  keterangan: string
  id_promosi: string
}
