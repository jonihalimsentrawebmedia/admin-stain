export interface ISumberBiayaPengobatan {
  id_pasien_sumber_pembiayaan: string
  id_pasien: string
  id_sumber_biaya: string
  no_peserta: string | null
  is_default: boolean
  persentase: number
  nama_sumber_biaya: string
  kode: string
  nama: string
  is_ada_nomor_peserta: boolean
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

export interface IPatient {
  id_pasien: string
  id_satuan_organisasi: string
  no_rekam_medis: string
  nama_lengkap: string
  sumber_biaya_pengobatan: ISumberBiayaPengobatan[]
  nik: string
  tempat_lahir: string
  tanggal_lahir: string
  umur: string
  jenis_kelamin: string
  golongan_darah: string
  agama: string
  status_perkawinan: string
  pekerjaan: string
  alamat: string
  no_telepon: string
  email: string
  id_negara: string
  id_provinsi: string
  id_kabupaten: string
  kontak_darurat_nama: string
  telepon_kontak_darurat: string
  email_kontak_darurat: string
  is_status: boolean
  nama_negara: string
  nama_provinsi: string
  nama_kabupaten: string
  nama_user_created: string
  nama_user_updated: string
  tanggal_registrasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}
