import { z } from 'zod'

export const VisionMissionResolver = z.object({
  visi: z.string(),
  misi: z.string(),
  url_gambar_visi: z.string(),
  url_gambar_misi: z.string(),
})


export type VisionMission = z.infer<typeof VisionMissionResolver>