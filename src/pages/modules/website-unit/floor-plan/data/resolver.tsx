import { z } from 'zod'

export const ResolverFloorPlan = z.object({
  nama_unit: z.string().optional().nullable(),
  denah_lantai_url: z.url({ error: 'Gambar URL wajib diisi' }),
  nama_lantai: z.string({ error: 'Nama Lantai wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type ResolverFloorPlanType = z.infer<typeof ResolverFloorPlan>
