import z from 'zod'

export const ResolverDokumentasi = z.object({
  url_file: z.string({ error: 'Gambar harus diupload' }),
})

export type TResolverDokumentasi = z.infer<typeof ResolverDokumentasi>
