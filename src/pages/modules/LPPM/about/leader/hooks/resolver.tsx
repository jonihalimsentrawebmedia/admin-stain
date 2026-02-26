import { z } from 'zod'

export const ProfileResolver = z.object({
  nama: z.string(),
  url_gambar: z.string(),
  deskripsi: z.string(),
})

export type ProfileData = z.infer<typeof ProfileResolver>
