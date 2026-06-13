import z from 'zod'

export const ResolverTransportType = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverTransportType = z.infer<typeof ResolverTransportType>
