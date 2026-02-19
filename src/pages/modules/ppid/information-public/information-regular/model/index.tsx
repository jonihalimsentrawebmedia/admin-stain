export interface IInformationRegular {
  id_kategori: string;
  id_satuan_organisasi: string;
  judul: string;
  slug: string;
  urutan: number;
  created_user: string;
  updated_user: string;
  created_at: string;
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
  
total_dokumen:string
}

export interface DocumentItem {
  id_daftar_dokumen: string;
  id_satuan_organisasi: string;
  id_kategori: string;
  nama_dokumen: string;
  slug: string;
  jenis: "DOKUMEN" | string; // Menggunakan union type jika ada jenis lain
  url: string | null;
  url_file: string;
  key_file: string;
  public: boolean;
  urutan: number;
  created_user: string;
  updated_user: string;
  created_at: string; // Bisa menggunakan Date jika dikonversi
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
  nama_kategori: string;
}