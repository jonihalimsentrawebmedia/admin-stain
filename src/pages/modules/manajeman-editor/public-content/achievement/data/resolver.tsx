import { z } from 'zod'

export const AchievementResolver = z.object({
  gambar: z.string().min(1, { error: 'gambar wajib di isi' }),
  keterangan_gambar: z.string().optional().nullable(),
  judul: z.string().min(1, { error: 'Judul wajib di isi' }),
  isi_konten: z.string().min(1, { error: 'Isi Konten wajib di isi' }),
  penulis: z.string().optional().nullable(),
  gambar_tambahan: z.array(
    z.object({
      gambar: z.string().optional().nullable(),
      keterangan: z.string().optional().nullable(),
    })
  ),
})

export type AchievementType = z.infer<typeof AchievementResolver>
