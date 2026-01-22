interface AuditUser {
  nama_user_created: string
  nama_user_updated: string
}

export interface ICategoryCollection extends AuditUser {
  id_unit_koleksi: string
  id_satuan_organisasi: string
  id_unit_kategori_koleksi: string

  foto_url: string
  foto_key: string

  nama_koleksi: string
  url: string
  uraian: string
  urutan: number
}
