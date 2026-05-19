import { z } from 'zod'

export const UktEntranceUkt = z.object({
  nama_jalur_masuk: z.string({ error: 'Nama tingkatan UKT wajib diisi' }),
  urutan: z.number({ error: 'Urutan minimal 1' }).min(1, 'Urutan minimal 1'),
})

export type TUktEntranceUkt = z.infer<typeof UktEntranceUkt>
