import { z } from 'zod'

export const StatusActiveResolver = z.object({
  id_sdm: z.string().optional().nullable(),
  id_status_aktif: z.string({ error: 'Status Aktif Wajib Diisi' }),
  sejak: z.string({ error: 'Sejak wajib diisi' }),
  alasan: z.string({ error: 'Alasan wajib diisi' }),
  url_lampiran: z.string().optional().nullable(),
  key_url_lampiran: z.string().optional().nullable(),
})

export type TStatusActiveResolver = z.infer<typeof StatusActiveResolver>

export interface IHistoryStatus {
  id_sdm: string
  id_satuan_organisasi: string
  id_status_aktif: string
  sejak: string
  alasan: string
  url_lampiran: string | null
  key_lampiran: string | null
  diset_at: string
  diset_user: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_status_aktif: string
  nama_diset_user: string
}
