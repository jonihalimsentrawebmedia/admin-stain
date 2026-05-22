import z from 'zod'

export const ResolverLetterOrigin = z.object({
  instansi: z.string({ error: 'Kode harus diisi' }),
  alamat: z.string({ error: 'Nama harus diisi' }),
  telepon: z.string({ error: 'Warna harus diisi' }).optional().nullable(),
  email: z.email({ error: 'Urutan harus diisi' }).optional().nullable(),
})

export type TResolverLetterOrigin = z.infer<typeof ResolverLetterOrigin>
