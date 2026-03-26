export interface IGroupSkill {
  id_kelompok_keahlian: string // UUID
  id_satuan_organisasi: string // UUID
  url_gambar: string // URL gambar
  key_gambar: string // Key gambar di storage
  nama_kelompok: string // Nama kelompok keahlian (contoh: "nama_program_pendidikan")
  deskripsi: string // Deskripsi kelompok
  created_at: string // ISO timestamp
  created_user: string // UUID atau ID user pembuat
  updated_at: string // ISO timestamp
  updated_user: string // UUID atau ID user pengupdate
  nama_user_created: string // Nama user pembuat
  nama_user_updated: string // Nama user pengupdate
}
