import z from 'zod'

export const ResolverDocumentation = z.object({
  jenis_file: z.enum(['UPLOAD', 'URL']),
  dokumen: z.string().optional().nullable(),
  url_file: z.string().optional().nullable(),
  keterangan: z.string().optional().nullable(),
})

export type TResolverDocumentation = z.infer<typeof ResolverDocumentation>
