import { z } from 'zod'

export const DivisionTeamResolver = z.object({
  foto_url: z.url({ error: 'Foto wajib diisi' }),
  nama: z.string({ error: 'Nama wajib diisi' }),
  jabatan: z.string({ error: 'Jabatan wajib diisi' }),
  is_kepala_unit: z.boolean(),
  urutan: z.number({ error: 'Urutan wajib diisi' }),
  nama_unit: z.string().optional().nullable(),
  nama_divisi: z.string().optional().nullable(),
})

export type DivisionTeamResolverType = z.infer<typeof DivisionTeamResolver>
