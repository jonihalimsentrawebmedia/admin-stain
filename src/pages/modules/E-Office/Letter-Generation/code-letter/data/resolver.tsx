import z from 'zod'

export const ResolverCodeLetter = z.object({
  is_otomatis: z.boolean(),
  nama_kode_nomor_surat: z.string(),
  id_satuan_organisasi: z.string().nullable().optional(),
  kode_depan: z.string(),
  urutan_kode_depan: z.number(),
  nomor_surat: z.enum(['OTOMATIS', 'MANUAL']),
  urutan_nomor_surat: z.number(),
  kode_belakang: z.string(),
  urutan_kode_belakang: z.number(),
  is_bulan: z.boolean(),
  urutan_bulan: z.number(),
  is_bulan_romawi: z.boolean(),
  is_tahun: z.boolean(),
  urutan_tahun: z.number(),
})

export type TResolverCodeLetter = z.infer<typeof ResolverCodeLetter>
