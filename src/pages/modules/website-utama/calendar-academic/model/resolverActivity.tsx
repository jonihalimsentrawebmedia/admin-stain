import { z } from 'zod'

export const ActivityResolver = z.object({
  nama_kegiatan: z
    .string({ error: 'Nama Kegiatan Wajib Diisi' })
    .min(1, { error: 'Nama Kegiatan Wajib Diisi' }),
  nama_tahun_akademik: z
    .string({ error: 'Nama Kegiatan Wajib Diisi' })
    .min(1, { error: 'Nama Kegiatan Wajib Diisi' }),

  urutan: z.number({ error: 'Ururtan Wajib Diisi' }).min(1, { error: 'Ururtan Wajib Diisi' }),
})

export type IActivityTypeForm = z.infer<typeof ActivityResolver>
