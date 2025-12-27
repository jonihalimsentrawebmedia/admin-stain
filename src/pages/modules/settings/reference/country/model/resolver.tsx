import { z } from 'zod'

export const CountryResolver = z.object({
  nama_negara: z
    .string({ error: 'Nama Negara Wajib Diisi' })
    .min(1, { error: 'Nama Negara Wajib Diisi' }),
})

export type CountryType = z.infer<typeof CountryResolver>
