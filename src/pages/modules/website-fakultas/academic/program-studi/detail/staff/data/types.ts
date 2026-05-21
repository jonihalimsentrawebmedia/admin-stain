export interface IStaff {
  id_sdm: string
  id_staff: string

  id_satuan_organisasi: string
  id_status: string
  id_unit_kerja: string
  id_status_aktif: string
  id_pangkat_golongan?: string | null
  id_jabatan_struktural?: string | null

  nama: string
  nik: string
  tempat_lahir: string
  tanggal_lahir: string
  nip?: string | null
  nidn?: string | null
  no_hp: string
  email: string
  tampil_no_hp: boolean
  tampil_email: boolean

  jabatan_struktural?: string | null
  golongan?: string | null
  unit_kerja: string
  nama_status_aktif: string
  sejak: string
  alasan?: string | null
  gambar_url: string | null
  is_dosen: boolean
  tampilkan_di_website: boolean
  sumber_data: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  deleted_at: string | null
  deleted_user: string | null
  last_sync_at: string

  nama_pangkat_golongan?: string | null
  nama_jabatan_struktural?: string | null
  id_sister?: string | null
}