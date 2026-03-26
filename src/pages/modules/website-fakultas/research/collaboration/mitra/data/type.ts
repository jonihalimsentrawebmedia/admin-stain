export interface IPartnerMitra {
  id_mitra_kerjasama: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // URL gambar mitra
  key_gambar: string // Key gambar di storage
  created_at: string // ISO timestamp
  created_user: string // ID user pembuat (bisa UUID atau string)
  updated_at: string // ISO timestamp
  updated_user: string // ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}
