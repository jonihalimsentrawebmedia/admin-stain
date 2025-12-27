import { z } from 'zod'

export const OfficialMusicResolver = z.object({
  judul: z.string().min(1),
  link_audio: z.string().min(1),
  gambar_url: z.string().min(1),
  key_audio: z.string().min(1),
})

export type OfficialMusicType = z.infer<typeof OfficialMusicResolver>
