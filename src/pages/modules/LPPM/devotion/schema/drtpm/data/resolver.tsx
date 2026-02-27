import { z } from 'zod'

export const ResolverDRTPM = z.object({
  judul: z.string(),
  deskripsi: z.string(),
  urutan: z.number(),
})

export type schemaDRTPM = z.infer<typeof ResolverDRTPM>
