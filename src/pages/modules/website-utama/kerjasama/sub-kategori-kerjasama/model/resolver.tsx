import { z } from 'zod'

export const SubCalloborationCategoryResolver = z.object({
  nama_sub_kategori: z
    .string({ message: 'Nama Sub Kategori Kerjasama wajib diisi.' })
    .min(1, { message: 'Nama Sub Kategori Kerjasama wajib diisi.' }),
  id_kategori_kerjasama: z
    .string({ message: 'Nama  Kategori Kerjasama wajib diisi.' })
    .min(1, { message: 'Nama  Kategori Kerjasama wajib diisi.' }),
})

export type ISubCalloborationCategoryTypeForm = z.infer<typeof SubCalloborationCategoryResolver>
