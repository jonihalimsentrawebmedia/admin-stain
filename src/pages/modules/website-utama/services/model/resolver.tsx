import { z } from 'zod'

export const ServicesResolver = z.object({
  nama_layanan: z
    .string({ error: 'Nama Laynan Wajib Diisi' })
    .min(1, { error: 'Nama Laynan Wajib Diisi' }),

  url_layanan: z
    .string({ error: 'Controller Wajib Diisi' })
    .min(1, { error: 'Controller Wajib Diisi' }),
  header: z.array(z.string()).optional().nullable(),
 
})

export type IServicesTypeForm = z.infer<typeof ServicesResolver>
