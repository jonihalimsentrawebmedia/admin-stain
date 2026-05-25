export interface ICommentLetter {
  id_komentar: string

  id_surat_masuk: string
  id_pejabat_surat_masuk: string
  id_sdm: string | null
  id_user: string

  komentar: string
  posisi: 'kanan' | 'kiri'
  tipe: 'admin' | 'sdm' | 'user'

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_penulis: string
  gambar_penulis: string | null
}
