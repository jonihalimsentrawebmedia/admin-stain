import { z } from 'zod'

export const ResolverSpecialization = z.object({
  nama_spesialisasi: z.string({ error: 'Nama Spesialisasi Harus Diisi' }),
  urutan: z.number({ error: 'Urutan Harus Diisi' }),
})

export type ISpecializationResolver = z.infer<typeof ResolverSpecialization>
