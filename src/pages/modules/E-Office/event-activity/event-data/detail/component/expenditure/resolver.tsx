import z from 'zod'

export const ResolverExpenditure = z.object({
  uraian_pengeluaran: z.string({ error: 'Uraian Pengeluaran harus diisi' }),
  tanggal_pengeluaran: z.string({ error: 'Tanggal Pengeluaran harus diisi' }),
  yang_membayar: z.string({ error: 'Yang Membayar harus diisi' }),
  tempat_pembelian: z.string({ error: 'Tempat Pembelian harus diisi' }),
  jumlah_pengeluaran: z.number({ error: 'Jumlah Pengeluaran harus diisi' }),
  url_file_pengeluaran: z.string().optional().nullable(),
  key_url_file_pengeluaran: z.string().optional().nullable(),
})

export type TResolverExpenditure = z.infer<typeof ResolverExpenditure>
