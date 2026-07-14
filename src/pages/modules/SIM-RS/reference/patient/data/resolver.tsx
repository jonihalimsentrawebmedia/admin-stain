import { z } from 'zod'

export const ResolverPatient = z.object({
  no_rekam_medis: z
    .string({ error: 'No Rekam Medis harus diisi' })
    .min(1, 'No Rekam Medis harus diisi'),
  nik: z
    .string({ error: 'NIK harus diisi' })
    .length(16, { message: 'NIK harus 16 digit' }),
  nama_lengkap: z
    .string({ error: 'Nama Lengkap harus diisi' })
    .min(1, 'Nama Lengkap harus diisi'),
  jenis_kelamin: z
    .string({ error: 'Jenis Kelamin harus dipilih' })
    .min(1, 'Jenis Kelamin harus dipilih'),
  tempat_lahir: z
    .string({ error: 'Tempat Lahir harus diisi' })
    .min(1, 'Tempat Lahir harus diisi'),
  tanggal_lahir: z
    .string({ error: 'Tanggal Lahir harus diisi' })
    .min(1, 'Tanggal Lahir harus diisi'),
  id_golongan_darah: z
    .string({ error: 'Golongan Darah harus dipilih' })
    .min(1, 'Golongan Darah harus dipilih'),
  id_agama: z
    .string({ error: 'Agama harus dipilih' })
    .min(1, 'Agama harus dipilih'),
  id_status_perkawinan: z
    .string({ error: 'Status Perkawinan harus dipilih' })
    .min(1, 'Status Perkawinan harus dipilih'),
  pekerjaan: z
    .string({ error: 'Pekerjaan harus diisi' })
    .min(1, 'Pekerjaan harus diisi'),
  id_negara: z
    .string({ error: 'Negara harus dipilih' })
    .min(1, 'Negara harus dipilih'),
  id_provinsi: z
    .string({ error: 'Provinsi harus dipilih' })
    .min(1, 'Provinsi harus dipilih'),
  id_kabupaten: z
    .string({ error: 'Kabupaten harus dipilih' })
    .min(1, 'Kabupaten harus dipilih'),
  alamat_lengkap: z
    .string({ error: 'Alamat Lengkap harus diisi' })
    .min(1, 'Alamat Lengkap harus diisi'),
  telepon: z
    .string({ error: 'Telepon harus diisi' })
    .min(1, 'Telepon harus diisi'),
  email: z.email('Email tidak valid'),
  nama_kontak_darurat: z
    .string({ error: 'Nama Kontak Darurat harus diisi' })
    .min(1, 'Nama Kontak Darurat harus diisi'),
  telepon_kontak_darurat: z
    .string({ error: 'Telepon Kontak Darurat harus diisi' })
    .min(1, 'Telepon Kontak Darurat harus diisi'),
  email_kontak_darurat: z.email('Email Kontak Darurat tidak valid'),
})

export type TResolverPatient = z.infer<typeof ResolverPatient>
