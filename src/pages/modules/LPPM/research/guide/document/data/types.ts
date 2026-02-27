export interface IGuideBookDocument {
  id_buku_panduan: string
  id_satuan_organisasi: string
  id_kategori: string
  nama_dokumen: string
  slug: string
  jenis: 'URL' | 'DOKUMEN'
  url: string | null
  url_file: string
  key_file: string
  public: boolean
  urutan: number
  created_user: string
  updated_user: string
  created_at: string
  updated_at: string
  nama_created_user: string
  nama_updated_user: string
  nama_kategori: string
  diterbitkan_at: string
}
