export type Status = 'PENDING' | 'REVISI' | 'DITOLAK' | 'DISETUJUI'

export interface IPartnershipRegistered {
  id_pencari_kerja: string
  nama: string
  perusahaan: string
  no_handphone: string
  email: string
  is_verified: boolean
  status_pendaftaran: Status
  tanggal_mendaftar: string
  alasan_ditolak: string | null
  alasan_revisi: string | null
}