import { z } from 'zod'

export const ResolverSumberBiaya = z.object({
  kode: z.string({ error: 'Kode harus diisi' }).min(1, 'Kode harus diisi'),
  nama: z.string({ error: 'Nama harus diisi' }).min(1, 'Nama harus diisi'),
  is_ada_nomor_peserta: z.boolean(),
})

export type ISumberBiayaResolver = z.infer<typeof ResolverSumberBiaya>
