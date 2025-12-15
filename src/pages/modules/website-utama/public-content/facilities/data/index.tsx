export interface IFacilitiesDetail {
  id_fasilitas: string
  id_satuan_organisasi: string

  gambar: string
  gambar_key: string

  nama_fasilitas: string
  deskripsi: string

  alamat: string
  link_google_map: string
  jam_operasional: string

  no_hp_pembantu: string
  email_pembantu: string

  status: string // "Y" / "N"
  status_publish: string // DRAFT / PUBLISHED / dst

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

  nama_user_created: string
  nama_disetujui: string
  nama_user_updated: string
}

export interface IStatusFacilities {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}
