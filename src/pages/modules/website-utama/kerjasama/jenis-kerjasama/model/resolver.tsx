import { z } from 'zod'

export const TypeOfCalloborationResolver = z.object({
  nama_jenis_kerjasama: z
    .string({ message: 'Nama Jenis Kerjasama wajib diisi.' })
    .min(1, { message: 'Nama Jenis Kerjasama wajib diisi.' }),
})

export type ITypeOfCalloborationTypeForm = z.infer<typeof TypeOfCalloborationResolver>
