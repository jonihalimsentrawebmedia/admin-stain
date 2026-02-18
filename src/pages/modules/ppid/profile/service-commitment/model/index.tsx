export interface ServiceCommitmentList {
  id_maklumat_layanan: string;
  id_satuan_organisasi: string;
  url_gambar: string;
  key_gambar: string;
  deskripsi: string;
  public: boolean;
  created_at: string; // Bisa menggunakan Date jika sudah diparsing
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
}