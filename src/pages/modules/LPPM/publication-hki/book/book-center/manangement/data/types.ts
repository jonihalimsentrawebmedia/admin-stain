type Context = 'PUSAT_BUKU_DAN_MEDIA_MASA'

export interface IUserManagement {
  id_anggota: string
  id_satuan_organisasi: string
  context: Context
  url_gambar: string
  key_gambar: string
  nama: string
  nip: string
  nidn: string
  pangkat: string
  golongan: string
  jabatan: string
  email: string
  publikasi: string
  status: boolean
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  urutan: number
}
