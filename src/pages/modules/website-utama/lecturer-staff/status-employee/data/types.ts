export interface IStatusEmployee {
  id_status_sdm: string
  id_satuan_organisasi: string

  kode_status: string
  nama_status: string

  is_ada_nidn: boolean
  is_dosen: boolean

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}