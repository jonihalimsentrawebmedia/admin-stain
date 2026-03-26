export interface ISectorStudy {
  id_detail_sektor_pendidikan: string // UUID
  id_satuan_organisasi: string // UUID
  id_prodi: string // UUID program studi
  nama_sektor_pendidikan: string // Nama sektor pendidikan
  deskripsi_sektor_pendidikan: string // Deskripsi (bisa teks biasa atau HTML)
  created_at: string // ISO timestamp
  created_user: string // ID user pembuat (bisa UUID atau string)
  updated_at: string // ISO timestamp
  updated_user: string // ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
  nama_prodi: string // Nama program studi (denormalisasi)
}
