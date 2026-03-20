import z from 'zod'

export interface IVisionMission {
  id_satuan_organisasi: string
  id_unit: string
  visi: string
  misi: string
  tujuan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

export const VisionMissionResolver = z.object({
  visi: z.string({ message: 'Visi wajib diisi.' }).min(1, { message: 'Visi wajib diisi.' }),
  misi: z.string({ message: 'Misi wajib diisi.' }).min(1, { message: 'Misi wajib diisi.' }),
  tujuan: z.string({ message: 'Tujuan wajib diisi.' }).min(1, { message: 'Tujuan wajib diisi.' }),
})

export type IVisionMissionForm = z.infer<typeof VisionMissionResolver>
