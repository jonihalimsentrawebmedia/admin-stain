import { z } from 'zod'

export const ResolverRegistration = z.object({
  no_pendaftaran: z.string().optional().nullable(),
  tanggal_pendaftaran: z.string({ error: 'Tanggal Pendaftaran harus diisi' }),
  status: z.string().optional().nullable(),
  id_pasien: z.string({ error: 'Pasien harus dipilih' }).min(1, 'Pasien harus dipilih'),
  id_poli: z.string({ error: 'Poli harus dipilih' }).min(1, 'Poli harus dipilih'),
  id_dokter: z.string({ error: 'Dokter harus dipilih' }).min(1, 'Dokter harus dipilih'),
})

export type TResolverRegistration = z.infer<typeof ResolverRegistration>
