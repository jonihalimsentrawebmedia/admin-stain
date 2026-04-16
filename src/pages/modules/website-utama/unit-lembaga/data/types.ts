export interface IUnitInstitution {
  id_satuan_organisasi: string
  kelompok: string
  parent_id: string
  id_parent_satuan_organisasi: string

  id_unit_kerja_dikti: string | null
  nama_unit_kerja: string | null
  api_dikti_id_pengguna: string | null
  api_dikti_username: string | null
  api_dikti_password: string | null

  logo: string
  favicon: string

  nama: string
  slug: string
  singkatan: string
  keyword: string

  is_alamat_sama_parent: boolean

  alamat: string
  provinsi: string
  kabupaten_kota: string
  kecamatan: string
  kelurahan: string
  kode_pos: string

  telepon: string
  fax: string
  email: string

  facebook: string
  twitter: string
  instagram: string
  youtube: string
  link_google_map: string

  tampil: boolean

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_jenjang_pendidikan: string | null
  kode_jenjang: string | null

  nama_parent: string
  nama_user_created: string
  nama_user_updated: string
  nama_parent_satuan_organisasi: string

  domain: string
  singkatan_universitas: string
  singkatan_fakultas: string | null
}
