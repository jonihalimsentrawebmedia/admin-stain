export interface IZoneIntegrity {
  id_zona_integritas_kategori: string // UUID
  id_satuan_organisasi: string // UUID
  nama_kategori: string // Nama kategori
  created_at: string // ISO timestamp
  created_user: string // ID user pembuat (bisa UUID atau string)
  updated_at: string // ISO timestamp
  updated_user: string // ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}

