export interface IUserProfile {
  id_user: string
  gambar: string
  nama_lengkap: string
  jabatan: string
  jenis_kelamin: 'L' | 'P'
  telepon: string
  email: string
  level_user: string
  satuan_kerja: string[]
}

export interface LevelUsersMulti {
  id_users_multi_level: string
  id_user: string
  id_level_user: string
  status: 'Y' | 'N'
  aktif_sejak: string // ISO Date string
  created_at: string // ISO Date string
  created_user: string
  updated_at: string // ISO Date string
  updated_user: string
  nama_level_user: string
}
