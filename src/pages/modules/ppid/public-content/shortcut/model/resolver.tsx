import { z } from 'zod'

export const ShortcutResolver = z.object({
  url_gambar: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
  nama_pintasan: z.string({ error: 'Nama Pintasan Wajib Diisi' }).min(1, { error: 'Nama Pintasan Wajib Diisi' }),
 
})

export type ShortcutType = z.infer<typeof ShortcutResolver>
