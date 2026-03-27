import { z } from 'zod'

export const GroupSkillResolver = z.object({
  url_gambar: z.string({ error: 'Gambar Wajib Diisi' }),
  nama_kelompok: z.string({ error: 'Nama Kelompok Wajib Diisi' }),
  deskripsi: z.string({ error: 'Deskripsi Wajib Diisi' }),
})

export type IGroupSkillResolver = z.infer<typeof GroupSkillResolver>
