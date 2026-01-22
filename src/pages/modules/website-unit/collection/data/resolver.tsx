import { z } from 'zod'

export const CollectionResolver = z.object({
  nama_unit: z.string().optional().nullable(),
  nama_kategori: z.string({ error: 'Nama Kategori wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type CollectionResolverType = z.infer<typeof CollectionResolver>
