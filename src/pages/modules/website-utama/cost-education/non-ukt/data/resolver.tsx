import z from 'zod'

export const ResolverEntranceNonUkt = z.object({
  id_fakultas: z.string().optional().nullable(),
  id_prodi: z.string().optional().nullable(),
  id_jenjang_pendidikan: z.string().optional().nullable(),
  id_jalur_masuk_non_ukt: z.string({ error: 'Nama jalur masuk wajib diisi' }),
  urutan: z.number({ error: 'Urutan minimal 1' }).min(1, 'Urutan minimal 1'),
})

export type TResolverEntranceNonUkt = z.infer<typeof ResolverEntranceNonUkt>
