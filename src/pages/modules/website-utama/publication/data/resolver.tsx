import { z } from 'zod'

export const ResolverPublication = z.object({
  nama_tahun_publikasi: z.string().min(1, { error: 'Nama UKK UKM Wajib Diisi' }),
  urutan: z.number().min(1, { error: 'Urutan Wajib Diisi' }),
})

export type TResolverPublication = z.infer<typeof ResolverPublication>
