import { z } from 'zod'

export const ResolverService = z.object({
  url_gambar: z.url(),
  nama_layanan: z.string(),
  urutan: z.number(),
  deskripsi_singkat: z.string().max(150, { message: 'Deskripsi singkat maksimal 150 karakter' }),
  deskripsi_lengkap: z.string(),
})

export type TResolverService = z.infer<typeof ResolverService>
