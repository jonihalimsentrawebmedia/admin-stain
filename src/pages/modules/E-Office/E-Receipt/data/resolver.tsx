import { z } from 'zod'

export const EreceiptSchema = z.object({
  no_kwitansi: z.string({ error: 'No Kwitansi wajib diisi' }),
  tanggal: z.string({ error: 'Tanggal wajib diisi' }),
  nama_penerima: z.string({ error: 'Nama Penerima wajib diisi' }),
  nama_penyetor: z.string({ error: 'Nama Penyetor wajib diisi' }),
  warna: z.string({ error: 'Warna wajib diisi' }),
  jumlah: z.number({ error: 'Jumlah wajib diisi' }),
  keterangan: z.string().optional(),
})

export type TEreceiptSchema = z.infer<typeof EreceiptSchema>
