export interface DocumentSupportList {
  id_lembaga_daftar_dokumen: string;
  id_satuan_organisasi: string;
  slug: string;
  judul: string;
  jumlah_dokumen_pendukung_akreditasi: number;
  urutan: number;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
}

export interface DocumentSupportAccreditationList {
  id_lembaga_dokumen_pendukung_akreditasi: string;
  id_satuan_organisasi: string;
  id_lembaga_daftar_dokumen: string;
  nama_dokumen: string;
  slug: string;
  url: string;
  public: boolean;
  urutan: number;
  jumlah_daftar_dokumen: number;
  // Metadata fields
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
}
