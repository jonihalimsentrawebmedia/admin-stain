import { z } from 'zod'

export const CategoryGuideResolver = z.object({
  nama_kategori: z.string(),
  urutan: z.number(),
})

export type SchemaGuideCategory = z.infer<typeof CategoryGuideResolver>
