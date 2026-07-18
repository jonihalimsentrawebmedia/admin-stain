import { z } from 'zod'

export const ResetPasswordSIMRSResolver = z
  .object({
    password: z.string({ error: 'Password wajib diisi' }),
    confirm_password: z.string({ error: 'Konfirmasi password wajib diisi' }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirm_password'],
  })

export type ResetPasswordSIMRSType = z.infer<typeof ResetPasswordSIMRSResolver>
