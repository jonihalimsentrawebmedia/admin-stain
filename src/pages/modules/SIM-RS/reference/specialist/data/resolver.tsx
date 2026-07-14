import { z } from 'zod'

export const ResolverSpecialist = z.object({
  nama: z
    .string({ error: 'Nama Spesialis harus diisi' })
    .min(1, 'Nama Spesialis harus diisi'),
})

export type ISpecialistResolver = z.infer<typeof ResolverSpecialist>
