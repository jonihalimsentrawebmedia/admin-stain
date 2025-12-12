import { z } from 'zod'

export const PhotoResolver = z.object({
  judul: z.string().min(1),
  id_album: z.string().min(1),
  link_foto: z
    .string({ error: 'Photo wajib Di Upload' })
    .min(1, { error: 'Photo wajib Di Upload' }),
})

export type PhotoType = z.infer<typeof PhotoResolver>
