import { z } from 'zod'

export const ResolverDiagnosis = z.object({
  kode: z
    .string({ error: 'Kode Diagnosis harus diisi' })
    .min(1, 'Kode Diagnosis harus diisi'),
  nama: z
    .string({ error: 'Nama Diagnosis harus diisi' })
    .min(1, 'Nama Diagnosis harus diisi'),
  deskripsi: z
    .string({ error: 'Deskripsi harus diisi' })
    .min(1, 'Deskripsi harus diisi'),
  harga: z.number({ error: 'Harga harus diisi' }),
})

export type IDiagnosisResolver = z.infer<typeof ResolverDiagnosis>
