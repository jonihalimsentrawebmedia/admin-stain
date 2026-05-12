import { z } from 'zod'

export const ResolverContent = z.object({
  id_jalur_masuk: z.string().optional().nullable(),
  judul_konten: z.string({ error: 'Judul konten wajib diisi' }),
  isi_konten: z.string({ error: 'Isi konten wajib diisi' }),
  urutan: z.number({ error: 'Urutan wajib diisi' }).min(1, 'Urutan minimal 1'),
})

export type TResolverContent = z.infer<typeof ResolverContent>
