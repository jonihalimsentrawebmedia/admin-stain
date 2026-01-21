import { z } from 'zod'

export const TaskPurposeResolver = z.object({
  tujuan: z.string({ error: 'Tujuan wajib diisi' }),
  fungsi: z.string({ error: 'Fungsi wajib diisi' }),
  tugas: z.string({ error: 'Tugas wajib diisi' }),
})

export type TaskPurposeResolverType = z.infer<typeof TaskPurposeResolver>
