import z from 'zod'

export const ResolverLetterNature = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
  warna: z.string({ error: 'Warna harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type TResolverLetterNature = z.infer<typeof ResolverLetterNature>
