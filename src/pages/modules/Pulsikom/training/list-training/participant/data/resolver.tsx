import { z } from 'zod'

export const EmailResolver = z.object({
  email: z.string().optional().nullable(),
  subjek: z.string(),
  pesan: z.string(),
  file_lampiran: z.array(
    z.object({
      url_dokumen: z.string(),
    })
  ),
})

export const ResolverRefund = z.discriminatedUnion('is_refund_pembayaran', [
  z.object({
    is_refund_pembayaran: z.literal(true),
    nama_bank: z.string().min(1),
    no_rekening: z.string().min(1),
    atas_nama_rekening: z.string().min(1),
    jumlah_refund: z.number(),
    url_file_refund: z.string().min(1),
  }),

  z.object({
    is_refund_pembayaran: z.literal(false),
    nama_bank: z.string().optional().nullable(),
    no_rekening: z.string().optional().nullable(),
    atas_nama_rekening: z.string().optional().nullable(),
    jumlah_refund: z.number().optional().nullable(),
    url_file_refund: z.string().optional().nullable(),
  }),
])

export type TEmailResolver = z.infer<typeof EmailResolver>

export type TResolverRefund = z.infer<typeof ResolverRefund>
