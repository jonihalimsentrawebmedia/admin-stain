export interface IDocumentAudit {
  id_dokumen: string
  id_satuan_organisasi: string
  is_google_link: boolean
  url_dokumen: string
  key_dokumen: string
  link_google: string | null
  nama_dokumen: string
  publish_at: string
  jumlah_diunduh: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}
