export interface IRegistrationPath {
  id_jalur_pendaftaran: string
  id_satuan_organisasi: string
  nama_jalur_pendaftaran: string
  slug: string
  deskripsi: string
  status: 'Y' | 'N'
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
