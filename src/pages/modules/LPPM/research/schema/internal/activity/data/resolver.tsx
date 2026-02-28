import { z } from 'zod'

export const ResolverActivity = z.object({
  judul: z.string({ error: 'Judul harus diisi' }),
  deskripsi: z.string({ error: 'Deskripsi harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type SchemaActivity = z.infer<typeof ResolverActivity>
