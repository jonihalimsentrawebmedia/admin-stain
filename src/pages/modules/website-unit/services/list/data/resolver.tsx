import { z } from 'zod'

export const ListServiceResolver = z.object({
  foto_url: z.url({ error: 'Gambar wajib Diisi' }),
  nama_layanan: z.string({ error: 'Nama Layanan wajib diisi' }),
  nama_category: z.string().optional().nullable(),
  link: z.url({ error: 'Link wajib diisi' }),
  kontak: z.string({ error: 'Kontak wajib diisi' }),
  uraian: z.string({ error: 'Uraian wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
})

export type ListServiceResolverType = z.infer<typeof ListServiceResolver>
