import { z } from 'zod'

export const ImpactInnovationResolver = z.object({
  gambar: z.string().min(1),
  keterangan_gambar: z.string().optional().nullable(),
  judul: z.string().min(1),
  id_kategori_inovasi_berdampak: z.string().min(1),
  isi_inovasi_berdampak: z.string().min(1),
  penulis: z.string().min(1),
  gambar_tambahan: z
    .array(
      z.object({
        gambar: z.string().optional().nullable(),
        keterangan: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
})

export type ImpactInnovationType = z.infer<typeof ImpactInnovationResolver>
