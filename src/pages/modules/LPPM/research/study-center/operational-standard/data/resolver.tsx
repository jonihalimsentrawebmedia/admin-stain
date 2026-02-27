import { z } from 'zod'

export const ResolverStandardOperational = z.object({
  nama_dokumen: z.string(),
  jenis: z.enum(['URL', 'DOKUMEN']),
  url: z.string().optional().nullable(),
  url_file: z.string().optional().nullable(),
  key_url_file: z.string().optional().nullable(),
  public: z.boolean(),
  urutan: z.number(),
})

export type schemaStandardOperational = z.infer<typeof ResolverStandardOperational>
