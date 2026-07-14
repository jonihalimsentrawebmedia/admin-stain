import { z } from 'zod'

export const ResolverDoctorCreate = z.object({
  id_spesialis: z
    .string({ error: 'Spesialis harus dipilih' })
    .min(1, 'Spesialis harus dipilih'),
  jenis_kelamin: z
    .string({ error: 'Jenis Kelamin harus dipilih' })
    .min(1, 'Jenis Kelamin harus dipilih'),
  id_poli: z
    .array(z.string())
    .min(1, 'Poli harus dipilih'),
  nama: z
    .string({ error: 'Nama Dokter harus diisi' })
    .min(1, 'Nama Dokter harus diisi'),
  no_sip: z
    .string({ error: 'No SIP harus diisi' })
    .min(1, 'No SIP harus diisi'),
  telepon: z
    .string({ error: 'Telepon harus diisi' })
    .min(1, 'Telepon harus diisi'),
  email: z
    .string({ error: 'Email harus diisi' })
    .email('Format Email tidak valid'),
})

export type TResolverDoctorCreate = z.infer<typeof ResolverDoctorCreate>

export const ResolverDoctorUpdate = z.object({
  id_spesialis: z
    .string({ error: 'Spesialis harus dipilih' })
    .min(1, 'Spesialis harus dipilih'),
  jenis_kelamin: z
    .string({ error: 'Jenis Kelamin harus dipilih' })
    .min(1, 'Jenis Kelamin harus dipilih'),
  id_poli: z
    .array(z.string())
    .min(1, 'Poli harus dipilih'),
  nama: z
    .string({ error: 'Nama Dokter harus diisi' })
    .min(1, 'Nama Dokter harus diisi'),
  no_sip: z
    .string({ error: 'No SIP harus diisi' })
    .min(1, 'No SIP harus diisi'),
  telepon: z
    .string({ error: 'Telepon harus diisi' })
    .min(1, 'Telepon harus diisi'),
  email: z
    .string({ error: 'Email harus diisi' })
    .email('Format Email tidak valid'),
  is_status: z
    .string({ error: 'Status harus dipilih' })
    .min(1, 'Status harus dipilih'),
  tanggal: z
    .string({ error: 'Tanggal harus diisi' })
    .min(1, 'Tanggal harus diisi'),
})

export type TResolverDoctorUpdate = z.infer<typeof ResolverDoctorUpdate>
