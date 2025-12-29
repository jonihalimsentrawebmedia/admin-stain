export interface IStepApproval {
  id_surat_mahasiswa_pengajuan: string
  id_satuan_organisasi: string
  alur_pengajuan: string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IStudentLetter {
  id_surat_mahasiswa_surat_keterangan_mahasiswa: string
  id_satuan_organisasi: string
  judul_surat: string
  slug: string
  keterangan: string
  link_google_form: string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}
