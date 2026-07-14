export interface IDoctor {
  id_dokter: string
  id_spesialis: string
  jenis_kelamin: string
  id_poli: string[]
  nama: string
  no_sip: string
  telepon: string
  email: string
  is_status: boolean
  tanggal: string
  nama_spesialis?: string
  nama_poli?: string[]
  daftar_poli?: { id_poli: string; nama_poli: string }[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  tanggal_registrasi: string
}
