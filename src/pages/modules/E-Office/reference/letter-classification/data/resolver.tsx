import z from 'zod'

export const ResolverLetterClassification = z.object({
  kode_klasifikasi: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
  id_parent_klasifikasi_surat: z.string().optional().nullable(),
  nama_parent: z.string().optional().nullable(),
})

export type TResolverLetterClassification = z.infer<typeof ResolverLetterClassification>
