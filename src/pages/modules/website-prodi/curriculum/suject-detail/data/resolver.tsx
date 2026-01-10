import { z } from 'zod'

export const SubjectResolver = z.object({
  id_kurikulum: z.string(),
  nama_mata_kuliah: z.string(),
  tahun: z.number(),
  semester: z.enum(['GANJIL', 'GENAP']),
  sks: z.number(),
  jenis_mata_kuliah: z.enum(['WAJIB', 'PILIHAN']),

  id_universitas: z.string().optional().nullable(),
  id_fakultas: z.string().optional().nullable(),
  id_prodi: z.string().optional().nullable(),
})

export type SubjectResolverType = z.infer<typeof SubjectResolver>
