export interface IAboutUkkUkm {
  id_satuan_organisasi: string
  id_unit: string
  isi_konten: string

  gambar: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IContactUkkUkm {
  id_satuan_organisasi: string
  id_unit: string

  alamat: string
  email: string
  no_telepon: string
  link_google_map: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}
