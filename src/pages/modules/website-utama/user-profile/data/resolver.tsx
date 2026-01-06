import { z } from 'zod'

export const UserProfileResolver = z.object({
  gambar: z.string({ error: 'Photo Wajib Diisi' }),
  nama_lengkap: z.string({ error: 'Nama Wajib Diisi' }),
  jabatan: z.string({ error: 'Jabatan Wajib Diisi' }),
  email: z.email({ error: 'Email Wajib Diisi' }),
  telepon: z.string({ error: 'Telepon Wajib Diisi' }),
  jenis_kelamin: z.enum(['L', 'P']),
})

export type IUserProfileResolver = z.infer<typeof UserProfileResolver>
