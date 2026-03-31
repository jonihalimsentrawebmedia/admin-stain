export interface IProduct extends AuditTrail {
  id_produk: string
  id_satuan_organisasi: string
  url_gambar: string
  key_gambar: string
  nama_produk: string
  slug: string
  urutan: number
  deskripsi_lengkap: string
}

interface AuditTrail {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
