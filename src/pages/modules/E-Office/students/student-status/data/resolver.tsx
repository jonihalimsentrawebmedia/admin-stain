import z from 'zod'

export const ResolverStudentStatus = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverStudentStatus = z.infer<typeof ResolverStudentStatus>
