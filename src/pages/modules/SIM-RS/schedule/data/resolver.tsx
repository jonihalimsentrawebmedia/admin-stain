import { z } from 'zod'

export const ResolverJadwal = z.object({
  id_dokter: z.string(),
  hari: z.string({ error: 'Hari harus diisi' }),
  jam_mulai: z.string({ error: 'Jam mulai harus diisi' }),
  jam_selesai: z.string({ error: 'Jam selesai harus diisi' }),
})

export type TResolverJadwal = z.infer<typeof ResolverJadwal>
