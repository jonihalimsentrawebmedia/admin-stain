import z from 'zod'

export const ResolverPejabat = z.object({
  nip: z.string({ error: 'NIP harus diisi' }),
  nama_lengkap: z.string({ error: 'Nama lengkap harus diisi' }),
  golongan: z.string({ error: 'Golongan harus diisi' }),
  jabatan: z.string({ error: 'Jabatan harus diisi' }),
})

export type TResolverPejabat = z.infer<typeof ResolverPejabat>
