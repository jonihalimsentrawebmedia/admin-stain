export interface TypeCollaboration {
  id_fakultas_bidang_kolaborasi: string // UUID
  id_satuan_organisasi: string // UUID
  nama: string // Nama bidang kolaborasi
  deskripsi: string // HTML description
  created_at: string // ISO timestamp
  created_user: string // UUID user pembuat
  updated_at: string // ISO timestamp
  updated_user: string // UUID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}
