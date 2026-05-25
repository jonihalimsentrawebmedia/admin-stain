export interface IOutboxList {
  id: string
  id_pejabat_surat_keluar: string

  dari_kotak_keluar: string
  tanggal_surat: string
  nomor_surat: string
  nomor_agenda: string | null

  nama_jenis_surat: string
  nama_sifat_surat: string
  warna_sifat_surat: string

  perihal: string
  penerima_surat: string
  penerima: string

  status: string
  jenis_disposisi: string | null
  nama_asal_surat: string

  list_disposisi: string[]
  created_at?: string
  updated_at?: string
}
