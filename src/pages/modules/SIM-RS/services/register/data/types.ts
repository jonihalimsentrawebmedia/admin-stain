export interface IRiwayatRuangan {
  id_pendaftaran_ruangan: string
  id_satuan_organisasi: string
  id_pendaftaran: string
  id_ruangan: string
  id_jenis_ruangan: string
  tanggal_masuk: string
  tanggal_keluar: string | null
  status: string
  catatan: string | null
  catatan_kepulangan: string | null
  status_kondisi: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  no_pendaftaran: string
  jenis_pendaftaran: string
  no_rekam_medis_pasien: string
  nama_pasien: string
  nama_ruangan: string
  nomor_ruangan: string
  nama_jenis_ruangan: string
  nama_satuan_organisasi: string
}

export interface IRegistration {
  id_pendaftaran: string
  id_satuan_organisasi: string
  no_pendaftaran: string
  tanggal_pendaftaran: string
  status: string
  keputusan?: string
  status_rawat_inap?: string
  jenis_pendaftaran?: string
  is_inap?: boolean
  id_pasien: string
  id_poli: string
  id_dokter: string
  alasan_batalkan?: string | null
  menunggu_at?: string
  menunggu_user?: string
  dipanggil_at?: string
  dipanggil_user?: string
  selesai_at?: string
  selesai_user?: string
  dibatalkan_at?: string | null
  dibatalkan_user?: string | null
  tanggal_registrasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_user_menunggu?: string
  nama_user_dipanggil?: string
  nama_user_selesai?: string
  nama_user_dibatalkan?: string
  id_jenis_ruangan?: string
  id_ruangan_aktif?: string
  tanggal_masuk_ruangan_aktif?: string
  no_rekam_medis_pasien: string
  nama_pasien: string
  jenis_kelamin_pasien: string
  tempat_lahir_pasien: string
  tanggal_lahir_pasien: string
  nama_poli: string
  nama_dokter: string
  nama_satuan_organisasi: string
  nama_ruangan_aktif?: string
  nomor_ruangan_aktif?: string
  nama_jenis_ruangan_aktif?: string
  riwayat_ruangan?: IRiwayatRuangan[]
}

export interface IStatusCount {
  DIBATALKAN: number
  DIPANGGIL: number
  MENUNGGU: number
  SELESAI: number
}
