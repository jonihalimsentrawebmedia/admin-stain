export interface IAboutUnitInstitution {
  id_satuan_organisasi: string
  id_unit: string
  isi_konten: string

  gambar: []

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IContactUnitInstitution {
  id_satuan_organisasi: string
  id_unit: string
  iframe: string
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
