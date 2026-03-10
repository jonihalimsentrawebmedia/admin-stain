export type IPropsData = {
  page?: string
  limit?: string
  status_publish: StatusPublish
  search?: string
  id_satuan_organisasi?: string
  id_kategori_berita?: string
}

export type StatusPublish =
  | 'DRAFT'
  | 'DIAJUKAN_EDITOR'
  | 'PROSES_EDITOR'
  | 'TOLAK_EDITOR'
  | 'DISETUJUI_EDITOR'
  | 'UNPUBLISH'
  | 'PUBLISHED'

export interface IArticleImageMore {
  id_artikel_gambar_tambahan: number
  gambar: string
  gambar_key: string
  keterangan: string
  id_artikel: string
}

export interface IArticleCarrier {
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

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  artikel_gambar_tambahan: IArticleImageMore[]

  nama_user_created: string
  nama_user_updated: string
  nama_satuan_organisasi: string

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

  nama_disetujui: string | null
  nama_published: string | null
  nama_diajukan: string | null
  nama_ditolak: string | null
  nama_proses: string | null
  nama_unpublished: string | null

  nama_user: string
  nama_level: string | null
}
