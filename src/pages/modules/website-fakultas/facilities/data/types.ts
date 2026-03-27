export interface IFacilities {
  id_fasilitas: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // URL gambar
  key_gambar: string // Key gambar (bisa kosong)
  nama: string // Nama fasilitas
  deskripsi: string // Deskripsi fasilitas
  created_at: string // ISO timestamp
  created_user: string // ID user pembuat
  updated_at: string // ISO timestamp
  updated_user: string // ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}
