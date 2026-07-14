export interface IRegistration {
  id_pendaftaran: string
  id_satuan_organisasi: string
  no_pendaftaran: string
  tanggal_pendaftaran: string
  status: string
  id_pasien: string
  id_poli: string
  id_dokter: string
  menunggu_at: string
  menunggu_user: string
  dipanggil_at: string
  dipanggil_user: string
  tanggal_registrasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_user_menunggu: string
  nama_user_dipanggil: string
  no_rekam_medis_pasien: string
  nama_pasien: string
  jenis_kelamin_pasien: string
  tempat_lahir_pasien: string
  tanggal_lahir_pasien: string
  nama_poli: string
  nama_dokter: string
  nama_satuan_organisasi: string
}

export interface IStatusCount {
  DIBATALKAN: number
  DIPANGGIL: number
  MENUNGGU: number
  SELESAI: number
}
