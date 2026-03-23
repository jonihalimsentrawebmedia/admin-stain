export interface IStoryMobility {
  id_cerita_international_mobility: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // URL gambar
  key_gambar: string // Nama file gambar
  nama_lengkap: string
  id_prodi: string // UUID program studi
  tahun_lulus: number // Tahun kelulusan
  cerita: string // HTML string untuk cerita
  created_at: string // ISO timestamp dengan timezone
  created_user: string // UUID user pembuat
  updated_at: string // ISO timestamp dengan timezone
  updated_user: string // UUID user pengubah
  nama_user_created: string // Nama user pembuat (bisa kosong)
  nama_user_updated: string // Nama user pengubah (bisa kosong)
  nama_prodi: string // Nama program studi (bisa kosong)
}
