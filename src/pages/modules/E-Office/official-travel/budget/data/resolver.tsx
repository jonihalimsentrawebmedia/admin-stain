import { z } from 'zod'

export const BudgetSchema = z.object({
  tahun_anggaran: z.number({ error: 'Tahun anggaran wajib diisi' }),
  sumber_data: z.string({ error: 'Sumber data wajib diisi' }),
  jumlah_anggaran: z.number({ error: 'Jumlah anggaran wajib diisi' }),
})

export type TBudgetSchema = z.infer<typeof BudgetSchema>
