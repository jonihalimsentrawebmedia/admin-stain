import { z } from 'zod'

export const FaqResolver = z.object({
  id_kategori_faq: z.string({ error: 'Kategori wajib diisi' }),
  pertanyaan: z.string({ error: 'Pertanyaan wajib diisi' }),
  jawaban: z.string({ error: 'Jawaban wajib diisi' }),
  dokumens: z.array(z.string()),
})

export type IFAQResolver = z.infer<typeof FaqResolver>
