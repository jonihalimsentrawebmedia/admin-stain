export interface PublicInformationRegistry {
  id_daftar_informasi_public: string;
  id_satuan_organisasi: string;
  ringkasan_isi_informasi: string;
  id_pejabat: string;
  id_kelompok_organisasi: string;
  waktu_dan_tempat_pembuatan_informasi: string;
  format_informasi_tersedia: ("HARDCOPY" | "SOFTCOPY")[];
  jangka_aktif: string;
  jangka_inaktif: string;
  created_user: string;
  updated_user: string;
  created_at: string;
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
  nama_pejabat: string;
  nama_kelompok_organisasi: string;
}

export interface OfficialProfile {
  id_pejabat: string;
  id_satuan_organisasi: string;
  id_kelompok_organisasi: string;
  id_pangkat_golongan: string;
  id_pangkat_akademik: string;
  nama_lengkap: string;
  jabatan: string;
  gambar: string;
  gambar_key: string;
  nip: string;
  no_hp: string;
  email: string;
  urutan: number;
  show_email_public: boolean;
  show_no_hp_public: boolean;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_kelompok: string;
  nama_golongan: string;
  nama_akademik: string;
  nama_user_created: string;
  nama_user_updated: string;
}

export interface OrganizationGroup {
  id_kelompok_organisasi: string;
  nama_kelompok: string;
  kelompok: string; // Biasanya versi UPPERCASE dari nama_kelompok atau kode kategori
  urutan: number;
  created_at: string; // Format: YYYY-MM-DD HH:mm:ss
}