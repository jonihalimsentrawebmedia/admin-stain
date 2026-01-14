export interface IProdiBackground {
  id_prodi_background: number
  id_satuan_organisasi: string
  context: Context
  gambar_url: string
  gambar_key: string
  status: boolean
}

export type Context =
  | 'PROFIL'
  | 'TENTANG'
  | 'AKREDITASI'
  | 'DOSEN'
  | 'KURIKULUM'
  | 'INFORMASI'
  | 'FASILITAS'
  | 'KONTAK'
