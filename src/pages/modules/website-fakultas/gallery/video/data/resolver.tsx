import { z } from 'zod'

export const VideoResolver = z.object({
  thumbnail:z.url({ message: 'Thumbnail wajib diisi.'}),
  judul: z.string().min(1, { message: 'Judul wajib diisi.' }),
  link_video:z.url({ message: 'Link Video wajib diisi.'})
});

export type IVideoType = z.infer<typeof VideoResolver>