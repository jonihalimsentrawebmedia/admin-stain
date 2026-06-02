import z from 'zod'

export const ResolverAttendance = z.object({
  sumber_data: z.enum(['MANUAL', 'INTERNAL']),
  nama_lengkap: z.string({ error: 'Nama Lengkap harus diisi' }),
  id_unit: z.string().optional().nullable(),
  id_sdm: z.string().optional().nullable(),
  id_unit_kerja: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  no_hp: z.string().optional().nullable(),
})

export type TResolverAttendance = z.infer<typeof ResolverAttendance>
