import { z } from 'zod'

export const InformationImmediatelyResolver = z.object({
  url_gambar: z.string({ error: 'Gambar Wajib Diisi' }).min(1, { error: 'Gambar Wajib Diisi' }),
  judul: z.string({ error: 'Judul Wajib Diisi' }).min(1, { error: 'Judul Wajib Diisi' }),
  deskripsi: z.string({ error: 'Deskripsi Wajib Diisi' }).min(1, { error: 'Deskripsi Wajib Diisi' }),
  public: z.boolean({ error: 'Status Publik Wajib Diisi' }),

})

export type InformationImmediatelyType = z.infer<typeof InformationImmediatelyResolver>
