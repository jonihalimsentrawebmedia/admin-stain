export interface IListSPPD {
  id_surat_tugas_sppd: string
  nomor_surat: string
  tempat_asal: string
  tempat_tujuan: string
  nama_jenis_transportasi: string
  jumlah_pegawai: number
  tanggal_surat: string
}

export interface IDetailSPPD {
  id_mail_surat_tugas_sppd: string
  id_satuan_organisasi: string
  id_surat_tugas: string
  id_kop_surat: string
  kop_surat: IHeaderLetter
  id_nomor_surat_otomatis: string
  nomor_surat: string
  nomor_urut_manual: string | null
  tanggal_surat: string
  id_unit: string
  akun: string
  lain_lain: string
  disahkan_oleh: string
  id_jenis_transportasi: string
  tempat_asal: string
  tempat_tujuan: string
  maksud_kegiatan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_unit: string
  nama_jenis_transportasi: string
  nama_disahkan_oleh: string
  nama_user_created: string
  nama_user_updated: string
  sppd_pegawai: IEmployeeSPPD[]
}

export interface IHeaderLetter {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: IHeaderLetterSettings[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IHeaderLetterSettings {
  isi: string
  jenis_font: string
  gaya_font: string
  ukuran_font: number
}

export interface IEmployeeSPPD {
  id_mail_surat_tugas_pegawai: string
  tanggal_berangkat: string
  tanggal_pulang: string
  no_spd: string | null
  nama_lengkap: string
  nip: string
}
