export interface ILecturerData {
  id_dosen: string // UUID
  id_sdm: string // UUID (data sumber daya manusia)
  id_satuan_organisasi: string // UUID
  gambar_url: string // URL foto
  nama: string
  nip: string // NIP (bisa dianggap string karena panjang)
  jabatan_struktural: string // Bisa kosong
  jenjang_pendidikan: string // e.g., S2, S3
  unit_kerja: string
  no_hp: string
  tampil_no_hp: boolean
  email: string
  tampil_email: boolean
  tampilkan_di_website: boolean
  created_at: string // ISO timestamp
  created_user: string // UUID
  updated_at: string // ISO timestamp
  updated_user: string // UUID
  deleted_at: string | null // ISO timestamp atau null
  deleted_user: string | null // UUID atau null
  last_sync_at: string // ISO timestamp
}