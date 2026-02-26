import { z } from 'zod'

export const MemberResolver = z.object({
  url_gambar: z.string(),
  nama_anggota: z.string(),
  nip: z.string(),
  jabatan: z.string(),
  status: z.boolean(),
  id_staff: z.string().optional().nullable(),
})

export type MemberSchema = z.infer<typeof MemberResolver>
