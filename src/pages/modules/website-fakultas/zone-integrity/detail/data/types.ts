export interface ISbuZoneIntegrity {
  id_zona_integritas_sub_kategori: string // UUID
  id_satuan_organisasi: string // UUID
  id_zona_integritas_kategori: string // UUID kategori induk
  nama_sub_kategori: string // Nama sub kategori
  deskripsi: string // Deskripsi sub kategori
  created_at: string // ISO timestamp
  created_user: string // ID user pembuat
  updated_at: string // ISO timestamp
  updated_user: string // ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
  nama_kategori: string // Nama kategori (denormalisasi)
}
