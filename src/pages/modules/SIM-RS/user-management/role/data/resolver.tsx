import { z } from 'zod'

export const ResolverRole = z.object({
  kode: z.string({ error: 'Kode Role harus diisi' }).min(1, 'Kode Role harus diisi'),
  nama: z.string({ error: 'Nama Role harus diisi' }).min(1, 'Nama Role harus diisi'),
})

export type TResolverRole = z.infer<typeof ResolverRole>
