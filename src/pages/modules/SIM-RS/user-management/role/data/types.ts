export interface IRoleTreeItem {
  menu: string
  children: IRoleTreeItem[] | null
  akses: boolean
  melihat: boolean
  kelola: boolean
}

export interface IRole {
  id_role: string
  kode_role: string
  nama_role: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  hak_akses: string[]
  role: null
}
