import { z } from 'zod'

export const CategoryPlanResolver = z.object({
  nama_kategori: z.string(),
  urutan: z.number(),
})

export type CategoryPlan = z.infer<typeof CategoryPlanResolver>
