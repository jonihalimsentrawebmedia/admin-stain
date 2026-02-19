export interface PublicInformationServiceStandardList {
  id_standard_pelayanan_informasi_public: string;
  id_satuan_organisasi: string;
  nama_dokumen: string;
  slug: string;
  jenis: "dokumen" | "url" | string; // Menggunakan union type untuk keamanan string
  url: string | null;
  url_file: string;
  key_file: string | null;
  public: boolean;
  urutan: number;
  created_user: string;
  updated_user: string;
  created_at: string; // ISO Date string
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
}