import z from 'zod'

export const ResolverAttendance = z.object({
  sumber_data: z.enum(['MANUAL', 'INTERNAL']).optional().nullable(),
  nama_lengkap: z.string().optional().nullable(),
  id_unit: z.string().optional().nullable(),
  id_sdm: z.array(z.string()).optional().nullable(),
  id_unit_kerja: z.string().optional().nullable(),
  jabatan: z.string().optional().nullable(),
  no_hp: z.string().optional().nullable(),
})

export type TResolverAttendance = z.infer<typeof ResolverAttendance>
