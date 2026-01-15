import { z } from 'zod'

export const ServiceProdiResolver = z.object({
  nama_layanan: z.string({ error: 'Nama Layanan Wajib Diisi' }),
  url_layanan: z.url({ error: 'Url Layanan Wajib Diisi' }),
  tampil: z.enum(['Y', 'N']),
})

export type ServiceProdiResolverType = z.infer<typeof ServiceProdiResolver>
