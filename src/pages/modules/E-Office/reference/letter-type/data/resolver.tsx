import z from 'zod'

export const ResolverLetterType = z.object({
  nama: z.string({ error: 'Nama harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type TResolverLetterType = z.infer<typeof ResolverLetterType>
