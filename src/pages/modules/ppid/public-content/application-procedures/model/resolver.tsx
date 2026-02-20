import { z } from 'zod'

export const ApplicationProceduresResolver = z.object({
  url_gambar: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
  judul: z.string({ error: 'Judul Wajib Diisi' }).min(1, { error: 'Judul Wajib Diisi' }),
  // is_aktif_sampai_at: z.boolean(),
  // aktif_sampai_at: z.string().optional().nullable(),
})

export type ApplicationProceduresType = z.infer<typeof ApplicationProceduresResolver>
