import { z } from 'zod'

export const OfficialResolver = z.object({
  url_gambar: z.string(),
  nama_penjabat: z.string(),
  nip: z.string(),
  jabatan: z.string(),
  id_kelompok: z.string().optional().nullable(),
  is_dosen: z.boolean().optional().nullable(),
  id_sdm: z.string().optional().nullable(),
  is_local_data: z.boolean().optional().nullable(),
})

export type OfficialType = z.infer<typeof OfficialResolver>
