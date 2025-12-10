import { z } from 'zod'

export const AcademicYearResolver = z.object({
  nama_tahun_akademik: z
    .string({ error: 'Nama Tahun Akademik Wajib Diisi' })
    .min(1, { error: 'Nama Tahun Akademik Wajib Diisi' }),
  semester: z
    .string({ error: 'Nama Tahun Akademik Wajib Diisi' })
    .min(1, { error: 'Nama Tahun Akademik Wajib Diisi' }),

  tahun_akademik: z
    .number({ error: 'Tahun Akademik Wajib Diisi' })
    .min(1, { error: 'Tahun Akademik Wajib Diisi' }),
})

export type IAcademicYearTypeForm = z.infer<typeof AcademicYearResolver>
