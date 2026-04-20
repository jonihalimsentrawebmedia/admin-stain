import { z } from 'zod'

export const EmployeeResolver = z.object({
  gambar_url: z.string(),
  nama: z.string(),
  nik: z.string().length(16),
  tempat_lahir: z.string(),
  tanggal_lahir: z.string(),
  no_hp: z.string(),
  email: z.string(),

  id_status: z.string(),
  nip: z.string(),
  nidn: z.string().optional().nullable(),
  id_unit_kerja: z.string(),
  golongan: z.string(),
  jabatan_struktural: z.string().optional().nullable(),
})

export type TEmployeeResolver = z.infer<typeof EmployeeResolver>
