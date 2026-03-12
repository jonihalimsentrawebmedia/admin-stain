import { z } from 'zod'

export const ResolverMainService = z.object({
  url_gambar: z.url(),
  nama_layanan: z.string(),
  uraian_singkat: z.string(),
  url: z.url(),
  urutan: z.number(),
})

export type MainServiceType = z.infer<typeof ResolverMainService>
