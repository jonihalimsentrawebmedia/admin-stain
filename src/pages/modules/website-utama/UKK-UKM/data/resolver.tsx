import { z } from 'zod'

export const ResolverUkkUkm = z.object({
  nama_ukk_ukm: z.string().min(1, { error: 'Nama UKK UKM Wajib Diisi' }),
  urutan: z.number().min(1, { error: 'Urutan Wajib Diisi' }),
})

export type TResolverUkkUkm = z.infer<typeof ResolverUkkUkm>
