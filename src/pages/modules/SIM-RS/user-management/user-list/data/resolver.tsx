import { z } from 'zod'

export const ResolverUser = z.object({
  nama_lengkap: z.string({ error: 'Nama harus diisi' }).min(1, 'Nama harus diisi'),
  email: z.string({ error: 'Email harus diisi' }).email('Format Email tidak valid'),
  telepon: z.string({ error: 'Nomor Telepon harus diisi' }).min(8, 'Nomor Telepon harus diisi'),
  id_role: z.string({ error: 'Role harus dipilih' }).min(1, 'Role harus dipilih'),
  gambar: z.string({ error: 'Gambar harus diupload' }).optional().nullable(),
  jenis_kelamin: z.enum(['L', 'P']),
})

export type TResolverUser = z.infer<typeof ResolverUser>

export const ResolverResetPassword = z
  .object({
    password_baru: z
      .string({ error: 'Password baru harus diisi' })
      .min(6, 'Password minimal 6 karakter'),
    confirm_password: z
      .string({ error: 'Konfirmasi password harus diisi' })
      .min(1, 'Konfirmasi password harus diisi'),
  })
  .refine((data) => data.password_baru === data.confirm_password, {
    message: 'Password tidak cocok',
    path: ['confirm_password'],
  })

export type TResolverResetPassword = z.infer<typeof ResolverResetPassword>
