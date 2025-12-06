import { z } from 'zod'

export const TopSliderResolver = z.object({
  gambar: z.string().min(1),
  keterangan: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
})

export type TopSliderType = z.infer<typeof TopSliderResolver>