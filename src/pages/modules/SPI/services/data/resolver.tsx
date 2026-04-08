import { z } from 'zod'

export const ResolverService = z.object({
  url_gambar: z.url(),
  nama: z.string(),
  urutan: z.number(),
  deskripsi: z.string(),
})

export type TResolverService = z.infer<typeof ResolverService>
