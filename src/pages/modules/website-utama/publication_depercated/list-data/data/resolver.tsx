import { z } from 'zod'

export const ResolverPublication = z.object({
  id_tahun_publikasi: z.string().optional().nullable(),
  nama_publikasi: z.string().min(1, { error: 'Nama Publkasi Wajib Diisi' }),
  penulis: z.string().min(1, { error: 'Penulis Wajib Diisi' }),
  link: z.url().min(1, { error: 'Link Wajib Diisi' }),
})

export type TResolverPublication = z.infer<typeof ResolverPublication>
