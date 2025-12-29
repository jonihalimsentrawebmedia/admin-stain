import { z } from 'zod'

export const FieldOfCooperationResolver = z.object({
  nama_bidang_kerjasama: z
    .string({ message: 'Nama Jenis Kerjasama wajib diisi.' })
    .min(1, { message: 'Nama Jenis Kerjasama wajib diisi.' }),
})

export type IFieldOfCooperationTypeForm = z.infer<typeof FieldOfCooperationResolver>
