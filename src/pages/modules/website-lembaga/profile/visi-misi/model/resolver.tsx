import { z } from 'zod'

export const VisiMisiLembagaResolver = z.object({
  nama: z.string({ error: 'Nama Wajib Diisi' }).min(1, { error: 'Nama Wajib Diisi' }),
  urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
  isi: z.string({ error: 'Isi Wajib Diisi' }).min(1, { error: 'Isi Wajib Diisi' }),
})

export type VisiMisiLembagaType = z.infer<typeof VisiMisiLembagaResolver>
