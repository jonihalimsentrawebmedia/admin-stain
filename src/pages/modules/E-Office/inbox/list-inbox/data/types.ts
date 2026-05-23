export interface IInboxList {
  id: string
  id_pejabat_surat_masuk: string

  dari_kotak_masuk: string
  tanggal_surat: string
  nomor_surat: string
  nomor_agenda: string | null

  nama_jenis_surat: string
  nama_sifat_surat: string
  warna_sifat_surat: string

  perihal: string
  penerima_surat: string

  status: string
  jenis_disposisi: string | null

  list_disposisi: any[]
  created_at?: string
  updated_at?: string
}
