export interface IDokterJadwal {
  id_dokter: string
  id_satuan_organisasi: string
  id_spesialis: string
  jenis_kelamin: string
  nama: string
  no_sip: string
  telepon: string
  email: string
  is_status: boolean
  tanggal_registrasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nama_spesialis: string
  id_poli: string[]
  daftar_poli: { id_poli: string; nama_poli: string }[]
  is_status_jadwal: boolean
  jadwal_dokter: IJadwalDokterItem[]
}

export interface IJadwalDokterItem {
  id_jadwal_dokter: string
  hari: number
  nama_hari: string
  jam_mulai: string
  jam_selesai: string
}
