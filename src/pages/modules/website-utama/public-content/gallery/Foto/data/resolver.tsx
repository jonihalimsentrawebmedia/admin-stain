import { z } from 'zod'

export const AlbumResolver = z.object({
  judul: z.string().min(1),
  thumbnail: z.string().min(1),
})

export type AlbumType = z.infer<typeof AlbumResolver>
