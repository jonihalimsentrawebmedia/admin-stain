import { z } from 'zod'

export const LevelUTKSchema = z.object({
  id_jenjang_pendidikan: z.string({ error: 'Jenjang pendidikan wajib Dipilih' }),
  nama_tingkatan_ukt: z.string({ error: 'Nama tingkatan UKT wajib diisi' }),
  jumlah_bawaan_ukt: z
    .number({ error: 'Jumlah bawaan UKT tidak boleh kurang dari 0' })
    .min(0, 'Jumlah bawaan UKT tidak boleh kurang dari 0'),

  urutan: z.number({ error: 'Urutan minimal 1' }).min(1, 'Urutan minimal 1'),
})

export type TLevelUTKSchema = z.infer<typeof LevelUTKSchema>
