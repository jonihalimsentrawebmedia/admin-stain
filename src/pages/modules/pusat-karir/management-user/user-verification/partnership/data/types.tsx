export type Status = 'PENDING' | 'REVISI' | 'DITOLAK' | 'DISETUJUI'

export interface IPartnershipRegistered {
  id_mitra_kerja: string
  nama: string
  perusahaan: string
  no_handphone: string
  email: string
  is_verified: boolean
  status_pendaftaran: Status
  tanggal_mendaftar: string
  alasan_ditolak: string | null
  alasan_revisi: string | null
}

export interface IPartnershipDetail {
  id: string
  revisi_mode: boolean
  status_pendaftaran: string
  alasan_revisi: string | null
  alasan_ditolak: string | null
  step: StatusStep
  data: DetailData
}

export interface StatusStep {
  informasi_perusahaan: boolean
  informasi_kontak: boolean
}

export interface DetailData {
  informasi_perusahaan: CompanyInformation
  informasi_kontak: ContactInformation
}

export interface CompanyInformation {
  nama_perusahaan: string
  lokasi: string
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
  nama_negara: string
  nama_provinsi: string
  nama_kabupaten_kota: string
}

export interface ContactInformation {
  nama_lengkap: string
  jabatan: string
  no_handphone: string
  email: string
  telepon_kerja: string
  username: string
  password: string
}
