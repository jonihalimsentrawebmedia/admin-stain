export interface Dosen {
  id_dosen:string
  gambar_url: string;
  nama: string;
  nip: string;
  jabatan_struktural: string;
  jenjang_pendidikan: string;
  unit_kerja: string;
  no_hp: string;
  tampil_no_hp: boolean;
  email: string;
  tampil_email: boolean;
}

export interface ISDM {
  id_sdm: string
  id_sister: string | null
  id_satuan_organisasi: string
  gambar_url: string
  nama: string
  nik: string
  tempat_lahir: string
  tanggal_lahir: string
  nip: string
  nidn: string | null
  jabatan_struktural: string | null
  golongan: string | null
  unit_kerja: string | null

  no_hp: string | null
  tampil_no_hp: boolean

  email: string | null
  tampil_email: boolean

  id_status: string
  id_unit_kerja: string
  sumber_data: 'MANUAL' | string

  id_pangkat_golongan: string
  id_jabatan_struktural: string

  nama_pangkat_golongan: string | null
  nama_jabatan_struktural: string | null

  id_status_aktif: string | null
  sejak: string | null
  alasan: string | null

  url_lampiran: string | null
  key_lampiran: string | null
  nama_status_aktif: string | null

  is_dosen: boolean
  tampilkan_di_website: boolean

  created_at: string
  created_user: string

  updated_at: string
  updated_user: string

  deleted_at: string | null
  deleted_user: string | null

  last_sync_at: string

  id_staff: string
}