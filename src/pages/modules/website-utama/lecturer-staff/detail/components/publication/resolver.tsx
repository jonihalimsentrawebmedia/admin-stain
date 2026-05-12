import { z } from 'zod'

export const AuthorSchema = z.object({
  nama_penulis: z.string().min(1, 'Nama penulis wajib diisi'),
})

export const PublicationResolver = z.object({
  judul_publikasi: z.string().min(1, 'Judul publikasi wajib diisi'),
  jenis_publikasi: z.string().optional().nullable(),
  tanggal_terbit: z.string().min(1, 'Tanggal terbit wajib diisi'),
  url_jurnal: z.string({ error: 'URL Jurnal Wajib Diisi' }),
  penulis: z.array(AuthorSchema).min(1, 'Minimal 1 penulis'),
})

export type TAuthorSchema = z.infer<typeof AuthorSchema>

export type TPublicationResolver = z.infer<typeof PublicationResolver>
