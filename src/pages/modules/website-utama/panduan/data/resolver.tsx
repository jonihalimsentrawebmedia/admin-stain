import { z } from 'zod'

export const GuideResolver = z.object({

  judul: z.string({ error: 'judul wajib diisi' }),
  isi: z.string({error:"isian wajib diisi"})
})

export type IGuideResolver = z.infer<typeof GuideResolver>
