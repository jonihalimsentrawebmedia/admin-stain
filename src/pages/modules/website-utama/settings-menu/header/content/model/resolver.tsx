import { z } from 'zod'

export const ContentResolver = z.object({
  judul: z.string({ error: 'Judul Wajib Diisi' }).min(1, { error: 'Judul Wajib Diisi' }),
  isi: z.string({ error: 'Isi Wajib Diisi' }).min(1, { error: 'Isi Wajib Diisi' }),
  urutan: z.number({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
})

export type IContentTypeForm = z.infer<typeof ContentResolver>
