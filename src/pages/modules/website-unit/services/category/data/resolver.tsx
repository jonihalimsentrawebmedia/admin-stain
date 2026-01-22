import { z } from 'zod'

export const CategoryServiceResolver = z.object({
  nama_unit: z.string().optional().nullable(),
  nama_layanan: z.string({ error: 'Nama Layanan wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type CategoryServiceResolverType = z.infer<typeof CategoryServiceResolver>