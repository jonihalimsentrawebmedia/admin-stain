import { z } from 'zod'

export const ForgetPasswordSIMRSResolver = z.object({
  email: z.string({ error: 'Email wajib diisi' }).email('Format email tidak valid'),
})

export type ForgetPasswordSIMRSType = z.infer<typeof ForgetPasswordSIMRSResolver>
