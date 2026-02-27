import { z } from 'zod'

export const ResolverOtherFunding = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  urutan: z.number(),
})

export type schemaOtherFunding = z.infer<typeof ResolverOtherFunding>