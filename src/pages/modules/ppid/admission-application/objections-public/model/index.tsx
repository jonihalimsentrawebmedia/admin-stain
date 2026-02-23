export interface ObjectionsPublic {
  id_permohonan: string
  id_satuan_organisasi: string

  tanggal_permohonan: string // ISO Date
  no_pemohonan_informasi: string
  tujuan_penggunaan_informasi: string

  nama_lengkap: string
  alamat_ktp: string
  no_identitas: string
  no_hp: string
  email: string
  pekerjaan: string

  url_file_surat_kuasa: string | null

  nama_lengkap_kuasa: string | null
  alamat_kuasa: string | null
  no_identitas_kuasa: string | null
  no_hp_kuasa: string | null

  alasan_keberatan: AlasanKeberatan[]
  kasus_posisi: string
  is_saya_setuju: boolean

  status_terjawab: StatusTerjawab

  no_registrasi: string
  tanggal_tanggapan: string // ISO Date
  subjek: string
  pesan: string
  file_lampiran: string[]

  updated_user: string
  created_at: string
  updated_at: string

  dikirim_at: string
  dikirim_user: string
  dijawab_at: string
  dijawab_user: string

  nama_updated_user: string
}

export type StatusTerjawab = 'BELUM_TERJAWAB' | 'SUDAH_TERJAWAB' | 'DITOLAK'

/**
 * Interface untuk item di dalam array riwayat
 */
export interface ObjectionLog {
  id_pemohon: string
  nama_lengkap: string
  no_hp: string
  email: string
  alasan_keberatan: AlasanKeberatan[]
  kasus_posisi: string
  riwayat: PermohonanKeberatanRiwayat[]
}

export type AlasanKeberatan =
  | 'INFORMASI_DITOLAK'
  | 'INFORMASI_TIDAK_TERSEDIA'
  | 'INFORMASI_TIDAK_DITANGGAPI'
  | 'INFORMASI_TIDAK_DITANGGAPI_SESUAI_DIMINTA'
  | 'PERMOHONAN_INFORMASI_TIDAK_DIPENUHI'
  | 'BIAYA_TIDAK_WAJAR'
  | 'INFORMASI_MELEBIHI_WAKTU_YANG_DITETAPKAN'
  | 'WAKTU_DITENTUKAN'

export interface PermohonanKeberatanRiwayat {
  id_permohonan_keberatan_riwayat: string
  id_permohonan: string
  no_registrasi: string
  tanggal_tanggapan: string // ISO Date String
  subjek: string
  pesan: string
  file_lampiran: string[]
  created_user: string
  updated_user: string
  created_at: string // ISO Date String
  updated_at: string // ISO Date String
  dikirim_at: string // ISO Date String
  dikirim_user: string
  dijawab_at: string // ISO Date String
  dijawab_user: string
  nama_updated_user: string
  nama_created_user: string
  nama_pengirim_user: string
}
