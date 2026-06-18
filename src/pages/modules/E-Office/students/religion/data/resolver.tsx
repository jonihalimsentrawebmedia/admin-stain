import z from 'zod'

export const ResolverReligion = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverReligion = z.infer<typeof ResolverReligion>
