import { z } from 'zod'

export const CarrierArticleResolver = z.object({
  gambar: z.string(),
  keterangan_gambar: z.string().optional(),
  judul: z.string(),
  isi_artikel: z.string(),
  penulis: z.string(),
  artikel_gambar_tambahan: z
    .array(
      z.object({
        gambar: z.string().optional().nullish(),
        keterangan_gambar: z.string().optional(),
      })
    )
    .optional()
    .nullable(),
})

export type IArticleCarrierResolver = z.infer<typeof CarrierArticleResolver>
