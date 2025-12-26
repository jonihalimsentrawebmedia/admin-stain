export interface ICategoryDownload {
  id_kategori_berkas: string
  id_satuan_organisasi: string
  nama_kategori: string
  slug: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IDownload {
  id_download: string
  id_satuan_organisasi: string
  id_kategori_berkas: string

  nama_berkas: string
  slug: string

  is_link_drive: boolean
  file_url: string | null
  file_key: string | null
  link_drive: string | null

  download_count: number

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  // join / relasi
  nama_satuan_organisasi: string
  nama_kategori_berkas: string
  nama_user_created: string
  nama_user_updated: string
}
