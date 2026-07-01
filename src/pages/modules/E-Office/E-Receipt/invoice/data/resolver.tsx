import { z } from 'zod'

export const InvoiceResolver = z.object({
  banyak: z.number({ error: 'Banyak wajib diisi' }),
  satuan: z.string({ error: 'Satuan wajib diisi' }),
  nama_barang: z.string({ error: 'Nama Barang wajib diisi' }),
  harga_satuan: z.number({ error: 'Harga Satuan wajib diisi' }),
  total: z.number().optional().nullable(),
})

export type TInvoiceResolver = z.infer<typeof InvoiceResolver>