import { z } from 'zod'

export const ResolverEntrance = z.object({
  nama_jalur: z.string().min(1, 'Nama jalur wajib diisi'),
  url_pendaftaran: z.url('URL pendaftaran tidak valid'),
  is_status_tampil: z.boolean().optional().nullable(),
  urutan: z
    .number({
      error: 'Urutan wajib diisi',
    })
    .min(1, 'Urutan minimal 1'),
})

export type TResolverEntrance = z.infer<typeof ResolverEntrance>
