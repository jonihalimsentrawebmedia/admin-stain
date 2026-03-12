import { z } from 'zod'

export const ResolverCategoryIndustry = z.object({
  nama_kategori_industri: z.string(),
  urutan: z.number(),
})

export type ICategoryIndustryResolver = z.infer<typeof ResolverCategoryIndustry>
