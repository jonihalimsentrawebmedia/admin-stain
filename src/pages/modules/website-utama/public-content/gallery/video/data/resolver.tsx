import { z } from 'zod'

export const VideoResolver = z.object({
  judul: z.string().min(1),
  link_video: z.string().min(1),
})

export type VideoType = z.infer<typeof VideoResolver>
