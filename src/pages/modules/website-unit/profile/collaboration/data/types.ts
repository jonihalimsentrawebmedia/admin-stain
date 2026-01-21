export interface IAreaCollaboration {
  id_bidang_kerjasama: string
  nama_bidang_kerjasama: string
  slug: string
  id_satuan_organisasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_kerjasama: number
}

export interface ITypeCollaboration {
  id_jenis_kerjasama: string
  nama_jenis_kerjasama: string
  slug: string
  id_satuan_organisasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_kerjasama: number
}

export interface ICategoryCollaboration {
  id_kategori_kerjasama: string
  nama_kategori_kerjasama: string
  slug: string
  id_satuan_organisasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_kerjasama: number
}

export interface ISubCategoryCollaboration {
  id_sub_kategori_kerjasama: string
  nama_sub_kategori: string
  slug: string
  id_satuan_organisasi: string
  id_kategori_kerjasama: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  slug_kategori_kerjasama: string
  nama_kategori_kerjasama: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_kerjasama: number
}
