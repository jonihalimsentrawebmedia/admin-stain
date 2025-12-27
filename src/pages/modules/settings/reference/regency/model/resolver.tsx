import { z } from 'zod'

export const RegencyResolver = z.object({
  nama_kabupaten: z
    .string({ error: 'Nama Kabupaten Wajib Diisi' })
    .min(1, { error: 'Nama Kabupaten Wajib Diisi' }),
  id_provinsi: z
    .string({ error: 'Nama Provinsi Wajib Diisi' })
    .min(1, { error: 'Nama Provinsi Wajib Diisi' }),
  id_negara: z
    .string({ error: 'Nama Negara Wajib Diisi' })
    .min(1, { error: 'Nama Negara Wajib Diisi' }),
})

export type RegencyType = z.infer<typeof RegencyResolver>
