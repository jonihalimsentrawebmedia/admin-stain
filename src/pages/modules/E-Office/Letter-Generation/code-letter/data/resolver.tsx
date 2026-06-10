import z from 'zod'

export const ResolverCodeLetter = z.object({
  isi_surat_otomatis: z.boolean(),
  nama_nomor_surat: z.string(),
  id_unit: z.string().nullable().optional(),
  kode_depan: z.string(),
  urutan_kode_depan: z.number(),
  pengisian_no_surat: z.enum(['OTOMATIS', 'MANUAL']),
  urutan_posisi_utama_no_surat: z.number(),
  kode_belakang: z.string(),
  urutan_kode_belakang: z.number(),
  is_perlu_bulan: z.boolean(),
  urutan_bulan: z.number(),
  is_bulan_romawi: z.boolean(),
  is_perlu_tahun: z.boolean(),
  urutan_tahun: z.number(),
})

export type TResolverCodeLetter = z.infer<typeof ResolverCodeLetter>
