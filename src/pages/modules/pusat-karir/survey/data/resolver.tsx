import { z } from 'zod'

export const ResolverPublishSurvey = z.object({
  is_mitra_kerja: z.boolean(),
  is_pencari_kerja: z.boolean(),
  tanggal_mulai: z.string(),
  tanggal_selesai: z.string(),
})

export type PublishSurveyData = z.infer<typeof ResolverPublishSurvey>
