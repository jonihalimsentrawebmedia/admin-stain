import { z } from 'zod'

export const ResolverGuideBook = z.object({
  id_kategori: z.string(),
  nama_dokumen: z.string(),
  jenis: z.enum(['URL', 'DOKUMEN']),
  url: z.string().optional().nullable(),
  url_file: z.string().optional().nullable(),
  key_url_file: z.string().optional().nullable(),
  public: z.boolean(),
  urutan: z.number(),
})

export type schemaGuideBook = z.infer<typeof ResolverGuideBook>
