import { z } from 'zod'

export const InfographicsResolver = z.object({
  url_gambar: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
  // is_aktif_sampai_at: z.boolean(),
  // aktif_sampai_at: z.string().optional().nullable(),
})

export type InfographicsType = z.infer<typeof InfographicsResolver>
