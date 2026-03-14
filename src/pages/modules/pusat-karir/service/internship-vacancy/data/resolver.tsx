import { z } from 'zod'

export const ResolverJobVacancy = z.object({
  lowongan_internal: z.boolean(),
  id_mitra_kerja: z.string().optional().nullable(),
  nama_pekerjaan: z.string(),
  kouta_pekerjaan: z.number(),
  jenis_lokasi_kerja: z.enum(['ONSITE', 'REMOTE', 'HYBRID']),
  id_provinsi: z.string(),
  id_kabupaten: z.string(),
  jenis_pekerjaan: z.enum(['FULLTIME', 'PARTTIME', 'FREELANCE', 'CONTRACT', 'MAGANG']),
  tgl_buka_pekerjaan: z.string(),
  tgl_tutup_pekerjaan: z.string(),
  deskripsi_pekerjaan: z.string(),
  tugas_dan_tanggung_jawab: z.string(),
  persyaratan: z.string(),
  list_spesialisasi: z.array(z.string()),
})

export type JobVacancyType = z.infer<typeof ResolverJobVacancy>
