import { z } from 'zod'

export const CostSchema = z.object({
  id_mail_surat_tugas_lumpsum_biaya: z.string().nullable().optional(),
  id_jenis_biaya: z.string({ error: 'Jenis biaya wajib dipilih' }),
  id_jenis_transportasi: z
    .string({ error: 'Jenis transportasi wajib dipilih' })
    .optional()
    .nullable(),
  no_ticket: z.string().nullable().optional(),
  jumlah_hari: z.number().optional().nullable(),
  harga: z.number(),
  perhari: z.string().nullable().optional(),
  redaksi: z.string().nullable().optional(),
  is_rill: z.boolean(),
})

export const ResolverLupSum = z.object({
  id_bendahara: z.string({ error: 'Bendahara wajib dipilih' }),

  id_pejabat: z.string({ error: 'Pejabat wajib dipilih' }),

  id_sumber_dana: z.string({ error: 'Sumber dana wajib dipilih' }),

  biaya: z.array(CostSchema),
})

export type TResolverLupSum = z.infer<typeof ResolverLupSum>
export type TCostSchema = z.infer<typeof CostSchema>
