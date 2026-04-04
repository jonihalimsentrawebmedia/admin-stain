import { z } from 'zod'

export const EmailResolver = z.object({
  email: z.string().optional().nullable(),
  subjek: z.string(),
  pesan: z.string(),
  file_lampiran: z.array(
    z.object({
      url_dokumen: z.string(),
    })
  ),
})

export type TEmailResolver = z.infer<typeof EmailResolver>
