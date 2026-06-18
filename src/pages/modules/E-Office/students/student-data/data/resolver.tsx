import z from 'zod'

export const ResolverStudentData = z.object({
  nim: z.string({ error: 'NIM harus diisi' }).min(1, 'NIM harus diisi'),
  nama_mahasiswa: z
    .string({ error: 'Nama Mahasiswa harus diisi' })
    .min(1, 'Nama Mahasiswa harus diisi'),
  id_mahasiswa_unit: z
    .string({ error: 'Program Studi harus dipilih' })
    .min(1, 'Program Studi harus dipilih'),
  id_mahasiswa_status: z
    .string({ error: 'Status Mahasiswa harus dipilih' })
    .min(1, 'Status Mahasiswa harus dipilih'),
  angkatan: z.string({ error: 'Angkatan harus diisi' }).min(1, 'Angkatan harus diisi'),
  semester_masuk: z.string({ error: 'Semester Masuk harus diisi' }),
  id_mahasiswa_jalur_masuk: z
    .string({ error: 'Jalur Masuk harus dipilih' })
    .min(1, 'Jalur Masuk harus dipilih'),
  nik: z.string({ error: 'NIK harus diisi' }).length(16, { message: 'NIK harus 16 digit' }),
  jenis_kelamin: z
    .string({ error: 'Jenis Kelamin harus dipilih' })
    .min(1, 'Jenis Kelamin harus dipilih'),
  id_mahasiswa_agama: z.string({ error: 'Agama harus dipilih' }).min(1, 'Agama harus dipilih'),
  tempat_lahir: z.string({ error: 'Tempat Lahir harus diisi' }).min(1, 'Tempat Lahir harus diisi'),
  tanggal_lahir: z
    .string({ error: 'Tanggal Lahir harus diisi' })
    .min(1, 'Tanggal Lahir harus diisi'),
  no_hp: z.string({ error: 'No HP harus diisi' }).min(1, 'No HP harus diisi'),
  email: z.email('Email tidak valid'),
  alamat: z.string({ error: 'Alamat harus diisi' }).min(1, 'Alamat harus diisi'),
  nama_ayah: z.string({ error: 'Nama Ayah harus diisi' }).min(1, 'Nama Ayah harus diisi'),
  nama_ibu: z.string({ error: 'Nama Ibu harus diisi' }).min(1, 'Nama Ibu harus diisi'),
  nama_wali: z.string().optional().nullable(),
  url_foto_mahasiswa: z.string().optional().nullable(),
})

export type TResolverStudentData = z.infer<typeof ResolverStudentData>
