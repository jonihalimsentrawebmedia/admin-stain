import { z } from 'zod'

export const DocumentSupportInstutationResolver = z.object({
  judul: z.string({ error: 'Judul Wajib Diisi' }).min(1, { error: 'Judul Wajib Diisi' }),
  urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
})

export type DocumentSupportInstutationType = z.infer<typeof DocumentSupportInstutationResolver>

export const DocumentSupportAccreditationInstutationResolver = z.object({
  judul: z.string({ error: 'Judul Wajib Diisi' }).optional().nullable(),
  nama_dokumen: z.string({ error: 'Nama Wajib Diisi' }).min(1, { error: 'Nama Wajib Diisi' }),
  url: z.string({ error: 'Url Wajib Diisi' }).min(1, { error: 'Url Wajib Diisi' }),
  public: z.boolean({ error: 'Public Wajib Diisi' }),
  urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
})

export type DocumentSupporAccreditationtInstutationType = z.infer<
  typeof DocumentSupportAccreditationInstutationResolver
>
