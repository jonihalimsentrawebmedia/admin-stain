export type IListSlider = {
  id_slider_atas: string
  id_satuan_organisasi: string
  gambar: string
  keterangan: string
  url: string
  status: 'Y' | 'N'
  status_publish: 'DRAFT' | 'PROSES' | 'DITOLAK' | 'DISETUJUI' | 'PUBLISHED' | 'UNPUBLISH' | string

  diajukan_at: string | null
  ditolak_at: string | null
  disetujui_at: string | null
  diterbitkan_at: string | null
  proses_at: string | null
  published_at: string | null
  unpublished_at: string | null

  alasan_ditolak: string

  diajukan_user: string | null
  ditolak_user: string | null
  disetujui_user: string | null
  proses_user: string | null
  published_user: string | null
  unpublished_user: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export type IListBottomSlider = Omit<IListSlider, 'id_slider_atas'> & {
  id_slider_bawah: string
}


export interface IlogData {
  jenis_data: string
  nama_user: string
  action: 'create' | 'update' | 'delete'
  action_name: string
  diubah_pada: string
  data_lama: string | null
  data_baru: string | null
}
