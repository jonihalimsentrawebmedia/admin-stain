import { z } from 'zod'

export const    OfficiallyResolver = z.object({
  url_gambar: z.string(),
  nama_penjabat: z.string(),
  jabatan: z.string(),
  id_kelompok: z.string().optional().nullable(),
})

export type OfficiallyType = z.infer<typeof OfficiallyResolver>
