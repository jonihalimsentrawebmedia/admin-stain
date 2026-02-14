import { z } from 'zod'

export const LandingPageInstutationResolver = z.object({
  gambar_url: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
  is_aktif_sampai_at: z.boolean(),
  aktif_sampai_at: z.string().optional().nullable(),
})

export type LandingPageInstutationType = z.infer<typeof LandingPageInstutationResolver>
