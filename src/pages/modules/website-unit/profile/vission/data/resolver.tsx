import { z } from 'zod'

export const VisionMissionResolver = z.object({
  visi: z.string({ error: 'Visi wajib diisi' }),
  misi: z.string({ error: 'Misi wajib diisi' }),
  sasaran: z.string({ error: 'Sasaran wajib diisi' }),
})

export type VisionMissionResolverType = z.infer<typeof VisionMissionResolver>
