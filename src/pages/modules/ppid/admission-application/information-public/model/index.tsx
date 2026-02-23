export interface AdmissionINformationPublic {
  id_permohonan: string;
  id_satuan_organisasi: string;
  tanggal_permohonan: string; // ISO 8601 format
  nama_lengkap: string;
  alamat_ktp: string;
  no_hp: string;
  email: string;
  jenis_informasi_dibutuhkan: string;
  rincian_informasi_dibutuhkan: string;
  tujuan_penggunaan_informasi: string;
  cara_memperoleh_informasi: string;
  cara_mendapatkan_salinan_informasi: string;
  file_ktp: string;
  is_kartu_milik_sendiri: boolean;
  is_informasi_tidak_dipubliskan: boolean;
  jenjang_pendidikan_ujian_masuk: "S1" | "S2" | "S3" | string;
  nomor_ujian_masuk: string;
  file_kartu_ujian: string;
  status_terjawab: string;
  status_permohonan: string;
  alasan_penolakan:  string | null;
  subjek: string;
  pesan: string;
  file_lampiran: string[];
  updated_user: string;
  created_at: string;
  updated_at: string;
  dikirim_at: string;
  dikirim_user: string;
  dijawab_at: string;
  dijawab_user: string;
}

/**
 * Interface untuk item di dalam array riwayat
 */
export interface PermohonanRiwayat {
  id_permohonan_email_riwayat: string;
  id_permohonan: string;
  status_permohonan: "DITOLAK" | "DITERIMA" | "PROSES" | string;
  alasan_penolakan: string | null;
  subjek: string;
  pesan: string;
  file_lampiran: string[];
  created_user: string;
  updated_user: string;
  created_at: string; // ISO 8601 format
  updated_at: string;
  dikirim_at: string;
  dikirim_user: string;
  dijawab_at: string;
  dijawab_user: string;
  nama_updated_user: string;
  nama_created_user: string;
  nama_pengirim_user: string;
}

/**
 * Interface Utama untuk data Pemohon
 */
export interface AdmissionLog {
  file_lampiran: any;
  id_pemohon: string;
  nama_lengkap: string;
  no_hp: string;
  email: string;
  jenis_informasi_dibutuhkan: "HASIL_UJIAN_MASUK" | string;
  tujuan_informasi_dibutuhkan: "EVALUASI_DIRI" | string;
  riwayat: PermohonanRiwayat[];
}