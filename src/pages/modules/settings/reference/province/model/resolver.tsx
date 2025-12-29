import { z } from 'zod'

export const ProvinceResolver = z.object({
  nama_provinsi: z
    .string({ error: 'Nama Provinsi Wajib Diisi' })
    .min(1, { error: 'Nama Provinsi Wajib Diisi' }),
  kode: z.string({ error: 'Kode Wajib Diisi' }).min(1, { error: 'Kode Wajib Diisi' }),
  id_negara: z
    .string({ error: 'Nama Negara Wajib Diisi' })
    .min(1, { error: 'Nama Negara Wajib Diisi' }),
})

export type ProvinceType = z.infer<typeof ProvinceResolver>
