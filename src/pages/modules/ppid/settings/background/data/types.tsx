import type { Context } from '@/pages/modules/ppid/settings/background/hooks'

export interface IBackgroundPPID {
  id_ppid_background: number
  id_satuan_organisasi: string
  context: Context
  gambar_url: string
  gambar_key: string
  status: boolean
  is_aktif_sampai_at: boolean
  aktif_sampai_at: string // ISO Date string
}
