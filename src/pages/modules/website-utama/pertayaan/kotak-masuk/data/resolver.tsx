import { z } from 'zod'

export const MessageResolver = z.object({
  jawaban: z.string({ error: 'Jawaban Wajib Diisi' }),
  dokumens: z.array(z.string()),
})

export type IMessageResolver = z.infer<typeof MessageResolver>
