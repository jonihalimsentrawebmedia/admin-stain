export interface IUnitFacilities {
  id_unit_fasilitas: string
  id_satuan_organisasi: string

  gambar: string
  gambar_key: string
  keterangan_gambar: string

  nama_fasilitas: string
  slug: string
  deskripsi: string

  publish: 'Y' | 'N'
  status: 'Y' | 'N'
  status_publish: 'DRAFT' | 'PUBLISHED' | 'UNPUBLISHED' | string

  diajukan_at: string | null
  ditolak_at: string | null
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

  alasan_ditolak: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  unit_fasilitas_gambar_tambahan: IUnitMoreImageFacilities[]

  nama_user_created: string
  nama_user_updated: string
  nama_satuan_organisasi: string

  nama_disetujui: string | null
  nama_published: string | null
  nama_diajukan: string | null
  nama_ditolak: string | null
  nama_proses: string | null
  nama_unpublished: string | null

  nama_user: string
  nama_level: string | null
}

export interface IUnitMoreImageFacilities {
  id_unit_fasilitas_gambar_tambahan: number
  id_unit_fasilitas: string
  gambar: string
  gambar_key: string
  keterangan: string
}
