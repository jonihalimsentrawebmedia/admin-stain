export interface IBankAccount extends AuditTrail {
  nama_rekening: string
  no_rekening: string
  atas_nama: string
  is_utama: boolean
  id_rekening: string
  id_satuan_organisasi: string
}

interface AuditTrail {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
