import { z } from 'zod'

export const ResolverCompanySize = z
  .object({
    jumlah_terendah: z.number(),
    jumlah_teratas: z.number(),
    urutan: z.number(),
  })
  .refine((data) => data.jumlah_terendah <= data.jumlah_teratas, {
    message: 'Jumlah Paling Banyak tidak boleh lebih Kecil dari jumlah Paling Sedikit',
    path: ['jumlah_teratas'],
  })

export type ICompanySizeResolver = z.infer<typeof ResolverCompanySize>