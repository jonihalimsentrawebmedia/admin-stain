import z from 'zod'

export const ProfileResolver = z.object({
  email: z
    .string({ error: 'email Wajib Diisi' })
    .min(1, { error: 'email Wajib Diisi' })
    .email({ error: 'Format Email Tidak Sesuai' }),
  nama_lengkap: z.string({ error: 'Nama  Wajib Diisi' }).min(1, { error: 'Nama  Wajib Diisi' }),
  jabatan: z.string({ error: 'Jabatan  Wajib Diisi' }).min(1, { error: 'Jabatan  Wajib Diisi' }),
  telepon: z.string({ error: 'Telepon Wajib Diisi' }).min(1, { error: 'Telepon Wajib Diisi' }),
  jenis_kelamin: z
    .string({ error: 'Jenis Kelamin Wajib Diisi' })
    .min(1, { error: 'Jenis Kelamin Wajib Diisi' }),
})
export type ProfileType = z.infer<typeof ProfileResolver>

export interface UserProfile {
  gambar: string // Asumsi path atau URL gambar disimpan sebagai string
  nama_lengkap: string
  jabatan: string
  jenis_kelamin: string
  telepon: string
  email: string
  level_user: string
  satuan_kerja: string
}
