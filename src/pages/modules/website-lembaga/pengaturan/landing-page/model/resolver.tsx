import { z } from 'zod'

export const LandingPageInstutationResolver = z.object({
  gambar_url: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
})

export type LandingPageInstutationType = z.infer<typeof LandingPageInstutationResolver>
