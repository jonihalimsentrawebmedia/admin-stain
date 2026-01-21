import { z } from 'zod'

export const OurTeamResolver = z.object({
  nama_unit: z.string().optional().nullable(),
  nama_divisi: z.string({ error: 'Nama Divisi wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type OurTeamResolverType = z.infer<typeof OurTeamResolver>
