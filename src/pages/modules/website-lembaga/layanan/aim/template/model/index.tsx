export interface DocumentSupportList {
  id_lembaga_daftar_dokumen: string // UUID
  id_satuan_organisasi: string // UUID
  nama_dokumen: string
  slug: string
  url: string
  public: boolean
  urutan: number
  created_at: string // ISO Date String
  created_user: string
  updated_at: string // ISO Date String
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_dokumen_pendukung_akreditasi: number
}
