import { z } from 'zod'

export const ResolverProduct = z.object({
  url_gambar: z.string(),
  nama_produk: z.string(),
  urutan: z.number(),
  deskripsi_lengkap: z.string(),
})

export type TResolverProduct = z.infer<typeof ResolverProduct>
