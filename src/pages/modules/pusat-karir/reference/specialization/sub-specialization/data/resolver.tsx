import { z } from 'zod'

export const ResolverSubSpecialization = z.object({
  id_spesialisasi: z.string(),
  nama_spesialisasi: z.string({ error: 'Nama Spesialisasi Harus Diisi' }),
  urutan: z.number({ error: 'Urutan Harus Diisi' }),
})

export type ISubSpecializationResolver = z.infer<typeof ResolverSubSpecialization>
