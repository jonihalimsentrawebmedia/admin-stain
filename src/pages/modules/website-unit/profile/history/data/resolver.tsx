import { z } from 'zod'

export const HistoryResolver = z.object({
  gambar_url: z.url({ error: 'Gambar wajib Diisi' }),
  isi_sejarah: z.string({ error: 'Isi Sejarah wajib diisi' }),
  tahun: z.string({ error: 'Tahun wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
  nama_unit: z.string().optional().nullable(),
})

export type HistoryResolverType = z.infer<typeof HistoryResolver>
