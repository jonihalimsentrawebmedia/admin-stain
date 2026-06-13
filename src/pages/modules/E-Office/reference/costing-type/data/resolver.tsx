import z from 'zod'

export const ResolverBiayaType = z.object({
  kode: z.string({ error: 'Kode harus diisi' }),
  nama: z.string({ error: 'Nama harus diisi' }),
  tipe: z.enum(['UMUM', 'TRANSPORTASI', 'PERHARI'], {
    error: 'Tipe harus dipilih',
  }),
})

export type TResolverBiayaType = z.infer<typeof ResolverBiayaType>
