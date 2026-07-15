import { z } from 'zod'

export const ResolverDiagnosis = z.object({
  keluhan_utama: z.string({ error: 'Keluhan Utama harus diisi' }),
  id_diagnosis: z.array(z.string()).min(1, 'Diagnosa harus dipilih'),
  id_procedure: z.array(z.string()).min(1, 'Rencana Tindakan harus dipilih'),
  catatan: z.string().optional().nullable(),
  keputusan: z.string({ error: 'Keputusan harus dipilih' }),
})

export type TResolverDiagnosis = z.infer<typeof ResolverDiagnosis>
