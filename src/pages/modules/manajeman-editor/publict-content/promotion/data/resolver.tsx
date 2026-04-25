import { z } from 'zod'

export const ResolverPromotion = z.object({
  gambar: z.string(),
  keterangan_gambar: z.string(),
  judul: z.string(),
  isi_promosi: z.string(),
  penulis: z.string(),
  promosi_gambar_tambahan: z.array(
    z.object({
      gambar: z.string(),
      keterangan: z.string().optional().nullable(),
    })
  ),
})

export type IResolverPromotionType = z.infer<typeof ResolverPromotion>
