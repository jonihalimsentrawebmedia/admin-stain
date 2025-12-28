import { z } from 'zod'

export const CalloborationCategoryResolver = z.object({
  nama_kategori_kerjasama: z
    .string({ message: 'Nama Kategori Kerjasama wajib diisi.' })
    .min(1, { message: 'Nama Kategori Kerjasama wajib diisi.' }),
})

export type ICalloborationCategoryTypeForm = z.infer<typeof CalloborationCategoryResolver>
