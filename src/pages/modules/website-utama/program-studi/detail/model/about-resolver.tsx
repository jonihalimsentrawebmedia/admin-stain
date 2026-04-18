import { z } from 'zod'

export const AboutResolver = z.object({
  isi_konten: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
  gambar: z.array(
    z.object({
      is_thumbnail: z.boolean(),
      url: z.string(),
    })
  ),
})

export type IAboutTypeForm = z.infer<typeof AboutResolver>
