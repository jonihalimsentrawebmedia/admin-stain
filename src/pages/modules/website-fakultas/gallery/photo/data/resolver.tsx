import { z } from 'zod'

export const PhotoResolver = z.object({
  id_album: z.string().optional().nullable(),
  link_foto: z.url({ message: 'Link Foto wajib diisi.' }),
  judul: z.string().min(1, { message: 'Judul wajib diisi.' }),
})

export type IphotoType = z.infer<typeof PhotoResolver>
