export interface IPartnership {
  id_mitra_kerja: string
  url_gambar: string
  nama_perusahaan: string
  nama_kontak: string
  no_handphone: string
  email: string
  is_verified: boolean
  status: boolean
}

export interface IWorkPartnerStep {
  informasi_perusahaan: boolean
  informasi_kontak: boolean
}

export interface CompanyInformation {
  nama_perusahaan: string
  lokasi: 'DALAM_NEGERI' | 'LUAR_NEGERI'
  id_negara: string
  id_provinsi: string
  id_kabupaten_kota: string
  negara: string
  provinsi: string | null
  kabupaten_kota: string | null
  kode_pos: string
  no_telepon: string
  url_website: string
  url_file_permohonan: string
}

export interface CompanyContact {
  nama_lengkap: string
  jabatan: string
  no_handphone: string
  email: string
  telepon_kerja: string
  username: string
  password: string
}

export interface ICompanyProfile {
  informasi_perusahaan: CompanyInformation
  informasi_kontak: CompanyContact
}

export interface ICompanyInformation {
  id_mitra_kerja: string
  id_satuan_organisasi: string
  nama_perusahaan: string
  lokasi: 'DALAM_NEGERI' | 'LUAR_NEGERI'

  id_negara: string
  id_provinsi: string
  id_kabupaten_kota: string

  negara: string
  nama_negara: string
  provinsi: string | null
  kabupaten_kota: string | null

  kode_pos: string
  no_telepon: string
  url_website: string

  url_file_permohonan: string
  key_file_permohonan: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string

  nama_provinsi: string
  nama_kabupaten_kota: string
}

export interface ICompanyContact {
  id_mitra_kerja: string
  id_satuan_organisasi: string

  nama_lengkap: string
  jabatan: string
  no_handphone: string
  email: string
  telepon_kerja: string
  username: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface ICompanyBranding {
  id_mitra_kerja: string
  id_satuan_organisasi: string

  url_foto_profil: string
  key_foto_profil: string

  deskripsi_singkat: string
  tentang_perusahaan: string

  id_kategori_industri: string
  id_ukuran_perusahaan: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string

  nama_kategori_industri: string
  nama_ukuran_perusahaan: string
  jumlah_teratas_ukuran_perusahaan: string
  jumlah_terendah_ukuran_perusahaan: string
}

export interface ICompanyLegality {
  id_mitra_kerja: string
  id_satuan_organisasi: string

  npwp: string
  url_file_npwp: string
  key_file_npwp: string

  nib: string
  url_file_nib: string
  key_file_nib: string

  alamat_kantor: string
  link_google_maps: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ICompanySocialMedia {
  id_mitra_kerja: string
  id_satuan_organisasi: string

  url_linkedin: string | null
  url_instagram: string | null
  email_recuitment: string
  url_website_karir: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface StepStatus {
  branding: boolean
  informasi_kontak: boolean
  informasi_perusahaan: boolean
  legalitas: boolean
  media_social: boolean
}
