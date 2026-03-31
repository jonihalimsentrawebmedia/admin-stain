import { z } from 'zod'

export const ResolverBankAccount = z.object({
  nama_rekening: z.string(),
  no_rekening: z.string(),
  atas_nama: z.string(),
  is_utama: z.boolean(),
})

export type TResolverBankAccount = z.infer<typeof ResolverBankAccount>
