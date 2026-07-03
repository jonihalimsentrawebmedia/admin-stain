interface ILetterHeaderSettings {
  isi: string
  jenis_font: string
  gaya_font: string
  ukuran_font: number
  warna: string
}

interface ILetterHeader {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: ILetterHeaderSettings[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

interface IDetailStudent {
  id_mahasiswa: string
  nim: string
  nama_mahasiswa: string
  nama_prodi: string
  nama_fakultas: string
  nama_agama: string
  angkatan: string
  semester_masuk: number
  kode_jenjang: string
  nama_jenjang: string
}

interface IDPLDetail {
  id_sdm: string
  nama: string
  nip: string
  nidn: string
  kode_jenjang: string | null
  nama_unit: string | null
  nama_jenjang: string | null
}

export interface ISPKLetter {
  id_mail_surat_pengantar_kkn: string
  id_nomor_surat_otomatis: string
  nomor_surat: string
  nomor_urut_manual: string | null
  tempat_surat: string
  tanggal_surat: string
  id_kop_surat: string
  id_jenis_template_surat: string
  id_satuan_organisasi: string
  masukan_di: string

  // Data KKN
  id_mahasiswa: string[] // array of IDs
  tanggal_mulai: string
  tanggal_selesai: string
  lama_kegiatan: number
  nama_desa: string
  kecamatan: string
  kabupaten: string
  di_tempat: string | null
  id_dpl: string[] // array of DPL IDs

  pembuka: string
  penutup: string
  lampiran: number
  perihal: string
  detail_lampiran: string[]

  // Penandatangan
  id_penandatangan: string
  nama_penandatangan: string
  nip_penandatangan: string
  nidn_penandatangan: string
  jabatan_penandatangan: string
  id_satuan_kerja_penandatangan: string
  nama_satuan_kerja_penandatangan: string

  // Status
  status: string
  diproses_at: string | null
  diproses_user: string | null
  selesai_at: string | null
  selesai_user: string | null
  dibatalkan_at: string | null
  dibatalkan_user: string | null
  nama_diproses_user: string | null
  nama_selesai_user: string | null
  nama_dibatalkan_user: string | null

  // Data mahasiswa (single reference, mungkin untuk display)
  nim: string
  nama_mahasiswa: string
  nama_prodi: string
  nama_status_mahasiswa: string
  nama_jalur_masuk: string
  nama_agama: string
  angkatan: string
  semester_masuk: string
  nama_fakultas: string
  nama_jenjang: string
  kode_jenjang: string

  // Detail lengkap
  dpl_detail: IDPLDetail[]
  mahasiswa_list: IDetailStudent[]

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  kop_surat: ILetterHeader

  // Info template
  nama_jenis_template: string
  kode_template: string
  nama_jenis_surat: string
  nama_user_created: string
  nama_user_updated: string
}
