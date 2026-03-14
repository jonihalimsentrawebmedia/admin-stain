export interface IShortJobSeeker {
  id_pencari_kerja: string
  url_profile: string | null
  nama_lengkap: string
  tempat_lahir: string | null
  tanggal_lahir: string | null
  jenis_kelamin: string | null
  no_handphone: string
  email: string
  is_verified: boolean
  status: boolean
}

export interface IDetailJobSeeker {
  data_diri: IPersonalData
  alamat_ktp: IAddress
  alamat: IAddress
  pendidikan_terakhir: IEducation
  files: IFile
  sub_spesialis: ISubSpesialis[]
  is_verified: boolean
}

export interface IPersonalData {
  id_pencari_kerja: string
  id_satuan_organisasi: string
  url_foto_profil: string | null
  key_foto_profil: string | null
  nama_lengkap: string
  tempat_lahir: string
  tanggal_lahir: string
  usia: number
  jenis_kelamin: 'L' | 'P'
  agama: string
  status_pernikahan: string
  kewarganegaraan: string
  nik: string
  no_handphone: string
  no_handphone_2: string | null
  no_telepon: string | null
  email: string
  email_alternatif: string | null
  website: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_kewarganegaraan: string
}

export interface IAddress {
  id_pencari_kerja: string
  id_satuan_organisasi: string
  alamat_lengkap: string
  id_provinsi: string
  id_kabupaten_kota: string
  provinsi: string | null
  kabupaten_kota: string | null
  kode_pos: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_provinsi: string
  nama_kabupaten_kota: string | null
}

export interface IEducation {
  id_pencari_kerja: string
  id_satuan_organisasi: string
  pendidikan_terakhir: string
  universitas_asal: string
  id_fakultas: string | null
  id_prodi: string | null
  universitas_asal_luar_universitas: string | null
  fakultas: string
  prodi: string
  url_file_ktm: string | null
  key_file_ktm: string | null
  nim: string
  status_mahasiswa: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_fakultas: string
  nama_prodi: string
}

export interface IFile {
  id_pencari_kerja: string
  id_satuan_organisasi: string
  url_cv: string | null
  key_cv: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ISubSpesialis {
  id_pencari_kerja_sub_spesialis: string
  id_satuan_organisasi: string
  id_pencari_kerja: string
  id_sub_spesialis: string
  nama_sub_spesialis: string
}
