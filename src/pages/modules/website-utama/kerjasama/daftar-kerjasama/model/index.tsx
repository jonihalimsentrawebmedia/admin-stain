export interface CalloborationList {
  id_kerjasama: string;
  kelompok: string; // Contoh: "UNIVERSITAS"
  id_unit: string;
  nama_mitra: string;
  id_negara: string;
  id_provinsi: string;
  id_kabupaten: string;
  alamat_mitra: string;
  no_kerjasama: string;
  id_jenis_kerjasama: string;
  id_kategori_kerjasama: string;
  id_bidang_kerjasama: string;
  id_sub_kategori_kerjasama: string;
  tanggal_mulai: string; // ISO Date String
  tanggal_selesai: string; // ISO Date String
  periode: string; // Bisa string atau number tergantung konsistensi API
  detail_kerjasama: string;
  manfaat_untuk_mitra: string;
  manfaat_untuk_univ: string;
  id_satuan_organisasi: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  
  // Field Tambahan (Joined Data)
  nama_unit: string;
  nama_jenis_kerjasama: string;
  nama_kategori_kerjasama: string;
  nama_bidang_kerjasama: string;
  nama_sub_kategori_kerjasama: string;
  nama_provinsi: string;
  nama_negara: string;
  nama_kabupaten: string;
  nama_satuan_organisasi: string;
  nama_user_created: string;
  nama_user_updated: string;
}