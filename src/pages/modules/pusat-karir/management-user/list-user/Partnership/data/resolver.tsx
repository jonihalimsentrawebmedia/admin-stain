import { z } from 'zod'

export const ResolverCompanyInformation = z.object({
  nama_perusahaan: z.string(),
  lokasi: z.enum(['DALAM_NEGERI', 'LUAR_NEGERI']),
  id_negara: z.string().optional().nullable(),
  negara: z.string().optional().nullable(),
  id_provinsi: z.string().optional().nullable(),
  provinsi: z.string().optional().nullable(),
  id_kabupaten_kota: z.string().optional().nullable(),
  kabupaten_kota: z.string().optional().nullable(),
  kode_pos: z
    .string({ error: 'Kode Pos Wajib Diisi' })
    .max(5, { error: 'Kode Pos Maksimal 5 Karakter' }),
  no_telepon: z.string(),
  url_website: z.string(),
  url_file_permohonan: z.string(),
  key_url_file_permohonan: z.string().optional().nullable(),
})

export const ResolverFormContact = z.object({
  nama_lengkap: z.string({ error: 'Nama Lengkap Wajib Diisi' }),
  jabatan: z.string({ error: 'Jabatan  Wajib Diisi' }),
  no_handphone: z.string({ error: 'No handphone Wajib Diisi' }),
  email: z.email({ error: 'Email Wajib Diisi' }),
  telepon_kerja: z.string().optional().nullable(),
  username: z.string({ error: 'Username Wajib Diisi' }),
  password: z.string({ error: 'Password Wajib Diisi' }).optional().nullable(),
})

export type TypeCompanyInformation = z.infer<typeof ResolverCompanyInformation>

export type TypeContactInformation = z.infer<typeof ResolverFormContact>
