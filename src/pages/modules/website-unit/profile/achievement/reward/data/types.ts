interface AuditUser {
  created_at: string
  created_user: string
  nama_user_created: string
  updated_at: string
  updated_user: string
  nama_user_updated: string
}

export interface IReward extends AuditUser {
  id_penghargaan: string
  id_satuan_organisasi: string
  id_kategori: string
  keterangan: string
}
