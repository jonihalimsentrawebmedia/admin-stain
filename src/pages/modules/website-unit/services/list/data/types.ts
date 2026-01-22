interface AuditUser {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ListServices extends AuditUser {
  id_layanan: string
  id_satuan_organisasi: string
  id_kategori_layanan: string

  foto_url: string
  foto_key: string

  nama_layanan: string
  slug: string
  link: string
  kontak: string
  uraian: string
  urutan: number
}
