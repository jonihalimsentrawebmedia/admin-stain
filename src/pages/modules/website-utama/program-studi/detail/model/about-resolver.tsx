import { z } from 'zod'

export const AboutResolver = z.object({
  isi_konten: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
  gambar: z.array(z.string({ message: 'URL gambar harus berupa teks.' })),
})

export type IAboutTypeForm = z.infer<typeof AboutResolver>
