export interface IUnitBackground {
  id_unit_background: number
  id_satuan_organisasi: string
  context: Context
  gambar_url: string
  gambar_key: string
  status: boolean
}

export type Context = 'PROFIL' | 'LAYANAN' | 'KOLEKSI' | 'FASILITAS' | 'GALERI' | 'INFORMASI'
