export interface IVisitReportStats {
  total_kunjungan: number
  total_rawat_jalan: number
  total_rawat_inap: number
  total_selesai: number
}

export interface IVisitReportList {
  id_pendaftaran: string
  no_pendaftaran: string
  tanggal_pendaftaran: string
  jenis_pendaftaran: string
  keputusan_perawatan: string
  is_inap: boolean
  status_rawat_jalan: string
  nama_poli: string
  nama_dokter: string
  no_rm: string
  nama_pasien: string
  nik_pasien: string
  jenis_kelamin: string
  tanggal_lahir: string
  golongan_darah: string
  status_pasien: boolean
  tanggal_registrasi: string
}
