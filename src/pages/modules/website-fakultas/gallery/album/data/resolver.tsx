import { z } from 'zod'

export const AlbumResolver = z.object({
  thumbnail: z.url({ message: 'Thumbnail wajib diisi.' }),
  judul: z.string().min(1, { message: 'Judul wajib diisi.' }),
})

export type IAlbumType = z.infer<typeof AlbumResolver>
