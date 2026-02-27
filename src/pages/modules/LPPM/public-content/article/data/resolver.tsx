import { z } from 'zod'

export const ResolverArticle = z.object({
  gambar: z.string(),
  keterangan_gambar: z.string(),
  judul: z.string(),
  isi_artikel: z.string(),
  penulis: z.string(),
  artikel_gambar_tambahan: z.array(
    z.object({
      gambar: z.string(),
      keterangan: z.string().optional().nullable(),
    })
  ),
  id_kategori_berita: z.string(),
})

export type IResolverArticleType = z.infer<typeof ResolverArticle>
