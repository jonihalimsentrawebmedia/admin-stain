import { z } from 'zod'

export const StructureOrganization = z.object({
  kelompok: z.string().min(1),
  nama_kelompok: z.string().min(1),
  urutan: z.number().min(1),
})

export type StructureOrganizationType = z.infer<typeof StructureOrganization>
