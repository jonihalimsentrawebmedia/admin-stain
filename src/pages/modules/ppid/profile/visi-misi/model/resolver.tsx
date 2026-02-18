import { z } from 'zod'

export const VisiMisiUnitResolver = z.object({
  nama: z.string({ error: 'Nama Wajib Diisi' }).min(1, { error: 'Nama Wajib Diisi' }),
  urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
  isi: z.string({ error: 'Isi Wajib Diisi' }).min(1, { error: 'Isi Wajib Diisi' }),
})

export type VisiMisiUnitType = z.infer<typeof VisiMisiUnitResolver>
