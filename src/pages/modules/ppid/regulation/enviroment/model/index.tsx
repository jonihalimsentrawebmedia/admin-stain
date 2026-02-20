export interface PublicInformationRegulationEnviromentList {
 id_daftar_dokumen: string;      // UUID
  id_satuan_organisasi: string;   // UUID
  nama_dokumen: string;
  slug: string;
  jenis: 'dokumen' | 'video' | string; // Gunakan union type jika jenisnya terbatas
  url: string | null;
  url_file: string;               // URL image/file dari Linode
  key_file: string | null;
  public: boolean;
  urutan: number;
  created_user: string;
  updated_user: string;
  created_at: string;             // ISO 8601 Date string
  updated_at: string;             // ISO 8601 Date string
  nama_created_user: string;
  nama_updated_user: string;
}