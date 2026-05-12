export interface IEmployee {
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  gambar_url: string
  nama: string
  nik: string
  tempat_lahir: string
  tanggal_lahir: string
  is_dosen: boolean
  nip: string
  nidn: string | null
  id_pangkat_golongan: string
  id_jabatan_struktural: string
  jabatan_struktural: string | null
  golongan: string | null
  unit_kerja: string | null
  no_hp: string
  tampil_no_hp: boolean
  email: string
  tampil_email: boolean
  id_status: string
  id_unit_kerja: string
  sumber_data: string
  id_status_aktif: string | null
  sejak: string | null
  alasan: string | null
  url_lampiran: string | null
  key_lampiran: string | null
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
  nama_status_aktif: string | null
  nama_pangkat_golongan: string | null
  nama_jabatan_struktural: string | null
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
