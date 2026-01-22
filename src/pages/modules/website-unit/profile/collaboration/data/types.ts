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

export interface PropsAction {
  page?: string
  limit?: string
  search?: string
  isGetAll?: boolean
}

export interface ISubPropsAction extends PropsAction {
  categoryId?: string
}



export interface ICollaborationList {
  id_kerjasama: string
  kelompok: 'UNIT' | 'PRODI' | string
  id_unit: string
  nama_mitra: string
  id_negara: string
  id_provinsi: string
  id_kabupaten: string
  alamat_mitra: string
  no_kerjasama: string
  id_jenis_kerjasama: string
  id_kategori_kerjasama: string
  id_bidang_kerjasama: string
  id_sub_kategori_kerjasama: string
  tanggal_mulai: string
  tanggal_selesai: string
  periode: string
  detail_kerjasama: string
  manfaat_untuk_mitra: string
  manfaat_untuk_univ: string
  id_satuan_organisasi: string
  
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  
  slug_unit: string
  slug_jenis_kerjasama: string
  slug_kategori_kerjasama: string
  slug_bidang_kerjasama: string
  slug_sub_kategori_kerjasama: string
  
  nama_unit: string
  nama_jenis_kerjasama: string
  nama_kategori_kerjasama: string
  nama_bidang_kerjasama: string
  nama_sub_kategori_kerjasama: string
  
  nama_provinsi: string
  nama_negara: string
  nama_kabupaten: string
  nama_satuan_organisasi: string
  
  nama_user_created: string
  nama_user_updated: string
}
