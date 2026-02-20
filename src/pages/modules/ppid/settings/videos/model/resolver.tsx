import { z } from 'zod'

export const VideoPPIDResolver = z.object({
  url_video: z.string({ error: 'Video Wajib Diisi' }).min(1, { error: 'Video Wajib Diisi' }),

})

export type VideoPPIDType = z.infer<typeof VideoPPIDResolver>
