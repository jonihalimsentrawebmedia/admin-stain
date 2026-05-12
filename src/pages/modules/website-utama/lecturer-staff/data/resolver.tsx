import { z } from 'zod'

export const EmployeeResolver = z.object({
  gambar_url: z.string(),
  nama: z.string({ error: 'Nama Wajib Diisi' }),
  nik: z.string({ error: 'NIK Wajib Diisi' }).length(16, { error: 'NIK Harus 16 Karakter' }),
  tempat_lahir: z.string({ error: 'Tempat Lahir Wajib Diisi' }),
  tanggal_lahir: z.string({ error: 'Tanggal Lahir Wajib Diisi' }),
  no_hp: z.string({ error: 'No HP Wajib Diisi' }),
  email: z.string({ error: 'Email Wajib Diisi' }),
  type_pegawai: z.string({ error: 'Type Pegawai Wajib Dipilih' }),

  id_status: z.string({ error: 'Status Wajib Dipilih' }),
  nip: z.string().optional().nullable(),
  nidn: z.string().optional().nullable(),
  id_unit_kerja: z.string({ error: 'Unit Kerja Wajib Dipilih' }),
  id_pangkat_golongan: z.string().optional().nullable(),
  id_jabatan_struktural: z.string().optional().nullable(),
  // golongan: z.string({ error: 'Golongan Wajib Dipilih' }).optional().nullable(),
  // jabatan_struktural: z.string().optional().nullable(),
})

export type TEmployeeResolver = z.infer<typeof EmployeeResolver>
