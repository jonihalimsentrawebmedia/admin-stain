import { z } from 'zod'

export const NewsResolver = z.object({
  gambar: z.string().min(1),
  keterangan_gambar: z.string().optional().nullable(),
  judul: z.string().min(1),
  id_kategori_berita: z.string().min(1),
  isi_berita: z.string().min(1),
  penulis: z.string().min(1),
  berita_gambar_tambahan: z
    .array(
      z.object({
        gambar: z.string().min(1),
      })
    )
    .optional()
    .nullable(),
})

export type INewsTypeForm = z.infer<typeof NewsResolver>
