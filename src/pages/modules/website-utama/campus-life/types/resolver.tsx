import { z } from 'zod'

export const TestimonialsResolver = z.object({
  nama_lengkap: z.string({ error: 'Nama Lengkap Wajib Diisi' }),
  foto_url: z.string({ error: 'Foto Wajib Diisi' }),
  pekerjaan: z.string({ error: 'Pekerjaan Wajib Diisi' }),
  Komentar: z.string({ error: 'Komentar Wajib Diisi' }),
})

export type ITestimonials = z.infer<typeof TestimonialsResolver>
