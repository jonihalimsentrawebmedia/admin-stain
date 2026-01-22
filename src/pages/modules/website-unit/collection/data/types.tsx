interface AuditUser {
  nama_user_created: string
  nama_user_updated: string
}

export interface IUnitCollection extends AuditUser {
  id_unit_kategori_koleksi: string
  id_satuan_organisasi: string
  nama_kategori: string
  slug: string
  urutan: number
}
