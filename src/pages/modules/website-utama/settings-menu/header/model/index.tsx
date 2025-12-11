export interface MenuBase {
  id_menu: string
  id_satuan_organisasi: string
  nama_menu: string
  controller: string
  id_parent_menu: string | null // Can be null for top-level menus
  status: 'Y' | 'N' // Assuming 'Y' and 'N' are the possible status values
  urutan: number
  created_at: string // ISO 8601 timestamp string
  created_user: string
  updated_at: string // ISO 8601 timestamp string
  updated_user: string
  url: string
  halaman: boolean
}

export interface Menu extends MenuBase {
  children: Menu[]
}
