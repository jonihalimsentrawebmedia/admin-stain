import { z } from 'zod'

export const ResolverBRIN = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  urutan: z.number(),
})

export type schemaBRIN = z.infer<typeof ResolverBRIN>
