import type { Status } from '../hooks/index'

export interface IJobSeekerRegistered {
  id_pencari_kerja: string
  nama: string
  nama_prodi: string
  nama_fakultas: string
  nim: string
  url_ktm: string
  universitas_asal: string
  status_mahasiswa: 'AKTIF' | 'ALUMNI'
  jenjang_pendidikan: string
  nama_universitas: string
  no_handphone: string
  email: string
  is_verified: boolean
  status_pendaftaran: Status
  tanggal_mendaftar: string
  alasan_revisi:string
  alasan_ditolak:string
}
