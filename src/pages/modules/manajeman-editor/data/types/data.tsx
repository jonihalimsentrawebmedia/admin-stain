export interface IContentSubmission {
  id: string
  id_satuan_organisasi: string
  nama_unit: string

  tanggal: string
  jenis_konten: string
  judul: string
  penulis: string

  tanggal_diproses: string | null
  tanggal_diajukan: string | null
  tanggal_disetujui: string | null
  tanggal_ditolak: string | null

  nama_disetujui: string | null
  nama_diajukan: string | null
  nama_ditolak: string | null
  nama_proses: string | null
  'level-disetujui': string | null
  status_publish: status
  nama_user: string
  nama_level: string
}

export type status = 'DIAJUKAN_EDITOR' | 'DISETUJUI_EDITOR' | 'PROSES_EDITOR' | 'TOLAK_EDITOR'
