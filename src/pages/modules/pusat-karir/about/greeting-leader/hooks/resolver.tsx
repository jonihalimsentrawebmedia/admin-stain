import { z } from 'zod'

export const ProfileResolver = z.object({
  nama_lengkap: z.string(),
  url_photo: z.string(),
  isi: z.string(),
})

export type ProfileData = z.infer<typeof ProfileResolver>
