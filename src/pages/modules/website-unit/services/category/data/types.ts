interface AuditUser {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ICategoryServices extends AuditUser {
  id_kategori_layanan: string
  id_satuan_organisasi: string
  nama_layanan: string
  slug: string
  urutan: number
}
