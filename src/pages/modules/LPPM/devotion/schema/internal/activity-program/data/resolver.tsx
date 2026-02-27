import { z } from 'zod'

export const ResolverActivityProgram = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  urutan: z.number(),
})

export type SchemaActivityProgram = z.infer<typeof ResolverActivityProgram>
