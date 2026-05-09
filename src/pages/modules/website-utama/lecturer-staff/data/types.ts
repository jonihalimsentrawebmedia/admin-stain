export interface IEmployee {
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string

  gambar_url: string
  nama: string
  nik: string

  tempat_lahir: string
  tanggal_lahir: string

  nip: string
  nidn: string

  jabatan_struktural: string
  golongan: string
  unit_kerja: string

  no_hp: string
  tampil_no_hp: boolean

  email: string
  tampil_email: boolean

  id_status: string
  id_unit_kerja: string

  sumber_data: 'MANUAL' | 'SISTER' | string
  tampilkan_di_website: boolean

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  deleted_at: string | null
  deleted_user: string | null

  last_sync_at: string

  nama_unit_kerja: string
  nama_status: string
}

export interface ISDMNavigation {
  next: {
    id_sdm: string
    nama: string
  } | null

  previous: {
    id_sdm: string
    nama: string
  } | null
}