export type IListSlider = {
  id_slider_atas: string
  id_satuan_organisasi: string
  gambar: string
  keterangan: string // HTML content
  url: string | null

  status: 'Y' | 'N'
  status_publish: 'DRAFT' | 'PUBLISHED' | string

  diajukan_at: string | null
  ditolak_at: string | null
  alasan_ditolak: string | null
  disetujui_at: string | null
  diterbitkan_at: string | null
  proses_at: string | null
  published_at: string | null
  unpublished_at: string | null

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
}

export type IListBottomSlider = Omit<IListSlider, 'id_slider_atas'> & {
  id_slider_bawah: string
}
