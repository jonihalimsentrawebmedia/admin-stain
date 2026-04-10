import { z } from 'zod'

export const AnnouncementResolver = z.object({
  judul_pengumuman: z.string().min(1),
  isi_pengumuman: z.string().min(1),
  penulis: z.string().min(1),
  list_unit:z.array(z.string().optional().nullable()).optional().nullable(),
  dokumens: z
    .array(
      z.object({
        url_dokumen: z.string().min(1),
      })
    )
    .optional()
    .nullable(),
})

export type AnnouncementType = z.infer<typeof AnnouncementResolver>
