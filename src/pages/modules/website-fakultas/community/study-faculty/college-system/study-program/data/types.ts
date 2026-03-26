export interface IProgramStudy {
  id_daftar_program_pendidikan: string // UUID
  id_satuan_organisasi: string // UUID
  nama_program_pendidikan: string // Nama program (e.g., "Program Sarjana")
  deskripsi_program_pendidikan: string // HTML description
  created_at: string // ISO timestamp
  created_user: string // UUID user pembuat
  updated_at: string // ISO timestamp
  updated_user: string // UUID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}
