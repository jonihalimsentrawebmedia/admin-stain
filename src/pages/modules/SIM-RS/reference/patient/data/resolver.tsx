import { z } from 'zod'

export const ResolverPatient = z.object({
  nama_lengkap: z.string({ error: 'Nama Lengkap harus diisi' }),
  nik: z.string({ error: 'NIK harus diisi' }).length(16, { message: 'NIK harus 16 digit' }),
  tempat_lahir: z.string({ error: 'Tempat Lahir harus diisi' }),
  tanggal_lahir: z.string({ error: 'Tanggal Lahir harus diisi' }),
  jenis_kelamin: z.string({ error: 'Jenis Kelamin harus dipilih' }),
  golongan_darah: z.string({ error: 'Golongan Darah harus dipilih' }),
  agama: z.string({ error: 'Agama harus dipilih' }),
  status_perkawinan: z.string({ error: 'Status Perkawinan harus dipilih' }),
  pekerjaan: z.string({ error: 'Pekerjaan harus diisi' }).min(1, 'Pekerjaan harus diisi'),
  alamat: z.string({ error: 'Alamat harus diisi' }).min(1, 'Alamat harus diisi'),
  no_telepon: z.string({ error: 'Telepon harus diisi' }).min(1, 'Telepon harus diisi'),
  email: z.email({ message: 'Format Email tidak valid' }),
  id_negara: z.string({ error: 'Negara harus dipilih' }),
  id_provinsi: z.string({ error: 'Provinsi harus dipilih' }).min(1, 'Provinsi harus dipilih'),
  id_kabupaten: z.string({ error: 'Kabupaten harus dipilih' }).min(1, 'Kabupaten harus dipilih'),
  kontak_darurat_nama: z.string({ error: 'Nama Kontak Darurat harus diisi' }),
  telepon_kontak_darurat: z.string({ error: 'Telepon Kontak Darurat harus diisi' }),
  email_kontak_darurat: z.email('Email Kontak Darurat tidak valid'),
  is_status: z.boolean().optional().nullable(),
  medical_record_number: z.string({ error: 'Nomor Rekam Medis harus diisi' }).optional().nullable(),
  tanggal_registrasi: z.string().optional().nullable(),
  sumber_biaya_pengobatan: z
    .array(
      z.object({
        id_sumber_biaya: z.string().min(1, 'Sumber biaya harus dipilih'),
        no_peserta: z.string().optional().nullable(),
      })
    )
    .optional(),
})

export type TResolverPatient = z.infer<typeof ResolverPatient>
