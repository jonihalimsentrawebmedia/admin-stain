import z from 'zod'

export const ResolverAdmissionProcess = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverAdmissionProcess = z.infer<typeof ResolverAdmissionProcess>
