export interface InformationImmediatelyList {
  id_informasi_serta_merta: string;
  id_satuan_organisasi: string;
  judul: string;
  slug: string;
  url_gambar: string;
  key_gambar: string; // Biasanya string kosong jika tidak ada key
  deskripsi: string;
  public: boolean;
  created_user: string;
  updated_user: string;
  created_at: string; // ISO Date String
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
}