export interface IResponseReportLetter {
  laporan: IReportOfficialTravel
  nomor_surat: string
  tanggal_surat: string
  tanggal_mulai_kegiatan: string
  tanggal_selesai_kegiatan: string
  nomor_surat_sppd: string
  tanggal_surat_sppd: string
  maksud_perjalanan_dinas: string
  tempat_kegiatan: string
  nama_disahkan_oleh: string
  nip: string
  nama_jabatan_struktural: string | null
  pegawai: IReportEmployee[]
  kop_surat: ILetterHeader
}

export interface IReportOfficialTravel {
  id_mail_surat_tugas_laporan: string | null
  tanggal: string | null
  perihal: string | null
  isi: string | null
  dasar_perjalanan_dinas: string | null
  laporan_pelaksana: string[]
  tindak_lanjut: string | null
  saran: string | null
  tempat: string | null
}

export interface IReportEmployee {
  id_mail_surat_tugas_pegawai: string
  nama_lengkap: string
  nik: string | null
  nip: string | null
}

export interface ILetterHeader {
  id_kop_surat: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: ILetterHeaderSetting[]
}

export interface ILetterHeaderSetting {
  isi: string
  jenis_font: string
  gaya_font: 'normal' | 'bold' | 'italic' | 'bolditalic'
  ukuran_font: number
}
