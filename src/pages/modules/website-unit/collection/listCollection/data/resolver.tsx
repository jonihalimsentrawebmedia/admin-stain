import { z } from 'zod'

export const CollectionListResolver = z.object({
  foto_url: z.url({ error: 'Foto URL wajib diisi' }),
  nama_kategori: z.string().optional().nullable(),
  nama_koleksi: z.string({ error: 'Nama Koleksi wajib diisi' }),
  url: z.url({ error: 'URL wajib diisi' }),
  uraian: z.string({ error: 'Uraian wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type ICollectionResolver = z.infer<typeof CollectionListResolver>
