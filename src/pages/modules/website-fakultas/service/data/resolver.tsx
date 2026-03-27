import { z } from 'zod'

export const ServiceResolver = z.object({
  nama_layanan: z.string().min(1, { message: 'Nama Layanan wajib diisi.' }),
  url: z.url({ message: 'Url wajib diisi.' }),
  is_footer: z.boolean(),
})

export type IServiceType = z.infer<typeof ServiceResolver>
