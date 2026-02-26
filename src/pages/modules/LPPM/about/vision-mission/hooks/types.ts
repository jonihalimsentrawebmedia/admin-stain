export interface IVisionMission {
  id_satuan_organisasi: string
  id_lembaga: string
  
  url_gambar_visi: string
  key_gambar_visi: string
  visi: string
  
  url_gambar_misi: string
  key_gambar_misi: string
  misi: string
  
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  
  nama_user_created: string
  nama_user_updated: string
}
