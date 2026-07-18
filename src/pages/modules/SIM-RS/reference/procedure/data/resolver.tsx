import { z } from 'zod'

export const ResolverProcedure = z.object({
  kode: z
    .string({ error: 'Kode Procedure harus diisi' })
    .min(1, 'Kode Procedure harus diisi'),
  nama: z
    .string({ error: 'Nama Procedure harus diisi' })
    .min(1, 'Nama Procedure harus diisi'),
  deskripsi: z
    .string({ error: 'Deskripsi harus diisi' })
    .min(1, 'Deskripsi harus diisi'),
  harga: z.number({ error: 'Harga harus diisi' }),
})

export type IProcedureResolver = z.infer<typeof ResolverProcedure>
