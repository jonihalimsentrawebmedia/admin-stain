export interface IProgramUndergraduatePartner {
  id_fakultas_international_ungreaduate_program_universitas_partner: string // UUID
  id_fakultas_international_ungreaduate_program: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // Image URL
  key_gambar: string // Storage key
  nama_universitas: string // University name
  deskripsi: string // HTML description
  created_at: string // ISO timestamp
  created_user: string // User ID
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
