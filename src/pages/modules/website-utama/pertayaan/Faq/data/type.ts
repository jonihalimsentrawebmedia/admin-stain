export interface IFAQList {
  id_faq: string
  id_kategori_faq: string
  id_satuan_organisasi: string
  pertanyaan: string
  jawaban: string
  dokumens: string[] // ← array URL dokumen
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_kategori_faq: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}
