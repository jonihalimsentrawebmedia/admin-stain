import { z } from 'zod'

export const ResolverAdvantage = z.object({
  url_gambar: z.string(),
  nama_keunggulan: z.string(),
  urutan: z.number(),
  deskripsi_singkat: z.string().max(150, { message: 'Deskripsi singkat maksimal 150 karakter' }),
})

export type TResolverAdvantage = z.infer<typeof ResolverAdvantage>
