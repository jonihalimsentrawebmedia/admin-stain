import type { Context } from '@/pages/modules/ppid/settings/background/hooks'

export interface IBackground {
  id_pusilkom_background: number
  id_satuan_organisasi: string
  context: Context
  url_gambar: string
  gambar_key: string
  status: boolean
  is_aktif_sampai_at: boolean
  aktif_sampai_at: string // ISO Date string
}
