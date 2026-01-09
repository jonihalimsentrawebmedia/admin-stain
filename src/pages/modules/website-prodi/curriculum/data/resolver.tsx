import { z } from 'zod'

export const CurriculumResolver = z.object({
  id_universitas: z.string().optional().nullable(),
  id_fakultas: z.string().optional().nullable(),
  id_prodi: z.string().optional().nullable(),
  nama_kurikulum: z.string(),
  lama_kuliah: z.number(),
})

export type CurriculumResolverType = z.infer<typeof CurriculumResolver>
