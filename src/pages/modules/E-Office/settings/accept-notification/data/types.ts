export interface INotification {
  id_notifikasi: string

  id_satuan_organisasi: string
  id_unit: string | null

  email: string
  no_telepon: string | null
  id_telegram: string | null

  status: boolean

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_unit: string
  nama_created_user: string
  nama_updated_user: string
}
