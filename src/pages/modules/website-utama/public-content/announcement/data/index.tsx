export interface IDocumentAnnouncement {
  id_pengumuman_dokumen: number
  url_dokumen: string
  dokumen_key: string
  id_pengumuman: string
}

export interface IAnnouncement {
  id_pengumuman: string
  id_satuan_organisasi: string
  judul_pengumuman: string
  isi_pengumuman: string
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

  nama_user_created: string
  nama_user_updated: string
  nama_disetujui: string

  dokumens: IDocumentAnnouncement[]
}

export interface IstatusAnnouncement {
  DIAJUKAN_EDITOR: number
  DISETUJUI_EDITOR: number
  DRAFT: number
  PROSES_EDITOR: number
  PUBLISHED: number
  TOLAK_EDITOR: number
  UNPUBLISH: number
}

export interface IBGThumbnail {
  id_background: number
  id_satuan_organisasi: string
  context: 'PENGUMUMAN' | string
  gambar: string
  urutan: number
  status: 'Y' | 'N'
}
