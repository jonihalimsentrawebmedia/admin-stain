import { z } from 'zod'

export const ResolverRegisterPath = z.object({
  nama_jalur_pendaftaran: z.string({ error: 'Nama Jalur Pendaftaran Wajib Diisi' }).min(1),
  deskripsi: z.string({ error: 'Deskripsi Wajib Diisi' }).min(1),
  status: z.boolean().optional().nullable(),
})

export type IRegisterPath = z.infer<typeof ResolverRegisterPath>
