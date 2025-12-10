export interface ServicesList {
  id_layanan: string
  nama_layanan: string
  url_layanan: string
  id_satuan_organisasi: string
  header: 'Y' | 'N'
  footer: 'Y' | 'N'
  slider: 'Y' | 'N'
}
export interface ServicesListDetail extends ServicesList {
  created_at: string|null
  created_user: string
  updated_at: string
  updated_user: string
}
