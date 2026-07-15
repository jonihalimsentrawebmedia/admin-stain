export interface IPatientReportStats {
  total_pasien: number
  total_laki_laki: number
  total_perempuan: number
  total_kunjungan: number
}

export interface IPatientReportList {
  id_pasien: string
  no_rekam_medis: string
  nama_lengkap: string
  nik: string
  jenis_kelamin: string
  tanggal_lahir: string
  golongan_darah: string
  is_status: boolean
  tanggal_registrasi: string
}
