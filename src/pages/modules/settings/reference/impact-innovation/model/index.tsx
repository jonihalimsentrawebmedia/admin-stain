import { z } from 'zod'

export const ImpactInnovationResolver = z.object({
  nama_inovasi: z
    .string({ error: 'Nama Inovasi Wajib Diisi' })
    .min(1, { error: 'Nama Inovasi Wajib Diisi' }),
})

export type ImpactInnovationType = z.infer<typeof ImpactInnovationResolver>
export interface InovationList {
  id_inovasi: string
  nama_inovasi: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}
