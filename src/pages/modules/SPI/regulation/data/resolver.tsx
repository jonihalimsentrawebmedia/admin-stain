import { z } from 'zod'

export const ResolverRegulation = z.object({
  url: z.url(),
  nama_peraturan: z.string(),
  urutan: z.number(),
})

export type TResolverRegulation = z.infer<typeof ResolverRegulation>
