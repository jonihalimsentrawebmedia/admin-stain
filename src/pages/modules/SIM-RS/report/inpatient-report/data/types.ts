export interface IInpatientReportStats {
  total_rawat_inap: number
  total_menunggu_ruangan: number
  total_sedang_dirawat: number
  total_pulang: number
}

export interface IInpatientReportList {
  id_pendaftaran: string
  no_pendaftaran: string
  no_rm: string
  nama_pasien: string
  nama_poli: string
  nama_dokter: string
  nama_jenis_ruangan: string | null
  nama_ruangan: string | null
  nomor_ruangan: string | null
  tanggal_masuk: string | null
  tanggal_keluar: string | null
  status_rawat_inap: string
}
