import z from 'zod'

export const ResolverFileSupport = z.object({
  jenis_file: z.enum(['DOKUMEN', 'URL']),
  judul: z.string({ error: 'Judul File harus diisi' }),
  url_file: z.string().optional().nullable(),
  dokumen: z.string().optional().nullable(),
  key_dokumen: z.string().optional().nullable(),
})

export type TResolverFileSupport = z.infer<typeof ResolverFileSupport>
