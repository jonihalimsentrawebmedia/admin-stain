import { z } from 'zod'

export const resolverServiceHeaderFooter = z.object({
  nama_layanan: z.string({ error: 'Nama Layanan wajib diisi' }),
  url: z.url({ error: 'Link Url wajib Diisi' }),
  is_header: z.boolean().optional().nullable(),
  is_footer: z.boolean().optional().nullable(),
})

export type IResolverHeaderFooter = z.infer<typeof resolverServiceHeaderFooter>
