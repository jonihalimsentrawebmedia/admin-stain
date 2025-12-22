import z from 'zod'

export const EducationalLevelResolver = z.object({
  kode_jenjang: z
    .string({ error: 'Kode Jenjang Wajib Diisi' })
    .min(1, { error: 'Kode Jenjang Wajib Diisi' }),
  nama_jenjang: z
    .string({ error: 'Nama Jenjang Wajib Diisi' })
    .min(1, { error: 'Nama Jenjang Wajib Diisi' }),
})
export type EducationalLevelType = z.infer<typeof EducationalLevelResolver>
