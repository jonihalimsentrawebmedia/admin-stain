import { z } from 'zod'

export const ResolverStudyCenter = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  urutan: z.number(),
})

export type SchemaStudyCenter = z.infer<typeof ResolverStudyCenter>
