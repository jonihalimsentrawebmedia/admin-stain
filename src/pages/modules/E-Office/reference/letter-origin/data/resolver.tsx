import z from 'zod'

export const ResolverLetterOrigin = z.object({
  instansi: z.string({ error: 'Kode harus diisi' }),
  alamat: z.string({ error: 'Nama harus diisi' }),
  telepon: z.string().optional().nullable(),
  email: z.email().optional().nullable(),
})

export type TResolverLetterOrigin = z.infer<typeof ResolverLetterOrigin>
