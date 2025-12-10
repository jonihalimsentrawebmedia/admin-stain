export interface IStatusImpactInnovation {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}

export interface IMoreImage {
  id_berita_gambar_tambahan: number
  gambar: string
  gambar_key: string
  keterangan: string
  id_berita: string
}

export interface IImpactInnovationList {
  id_inovasi_berdampak: string
  id_satuan_organisasi: string

  gambar: string
  gambar_key: string
  keterangan_gambar: string

  judul: string
  id_kategori_inovasi_berdampak: string
  isi_inovasi_berdampak: string

  penulis: string
  status: string
  status_publish: string

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

  gambar_tambahan: IMoreImage[]

  nama_kategori: string
}
