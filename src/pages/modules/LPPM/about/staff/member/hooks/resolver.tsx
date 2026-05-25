import { z } from 'zod'

export const MemberResolver = z.object({
  url_gambar: z.string(),
  nama_anggota: z.string(),
  nip: z.string(),
  jabatan: z.string(),
  status: z.boolean(),
  id_staff: z.string().optional().nullable(),
  id_sdm: z.string().optional().nullable(),
  is_dosen: z.boolean().optional().nullable(),
  is_local_data: z.boolean().optional().nullable(),
})

export type MemberSchema = z.infer<typeof MemberResolver>
