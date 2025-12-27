import { z } from 'zod'

export const AcademicRuleResolver = z.object({
  pengantar: z.string(),
  isi: z.string(),
  penutup: z.string(),
  dokumen_teks_pengantar: z.string(),
  dokumen_status_url: z.string(),
})

export type IAcademicRules = z.infer<typeof AcademicRuleResolver>
