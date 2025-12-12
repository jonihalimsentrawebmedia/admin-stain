import { z } from 'zod'
interface DataGambar {
  gambars: string[]
}

export interface StatisticUniversity {
  id_satuan_organisasi: string
  data: DataGambar
  mahasiswa: number
  program_studi: number
  guru_besar: number
  lektor: number
  lektor_kepala: number
  asisten_ahli: number
  staf_pengajar: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

// 1. Skema untuk DataGambar

// 2. Skema Utama untuk StatistikUniversitas
export const StatisticUniversitySchema = z.object({
  //   data: DataGambarSchema,
  mahasiswa: z.number().int().nonnegative(),
  program_studi: z.number().int().nonnegative(),
  guru_besar: z.number().int().nonnegative(),
  lektor: z.number().int().nonnegative(),
  lektor_kepala: z.number().int().nonnegative(),
  asisten_ahli: z.number().int().nonnegative(),
  staf_pengajar: z.number().int().nonnegative(),
})

// 3. Mendapatkan Tipe TypeScript (Interface) secara otomatis
export type StatistikUniversitasType = z.infer<typeof StatisticUniversitySchema>

export interface LogStatistic {
  jenis_data: string
  nama_user: string
  action: string
  action_name: string
  diubah_pada: string
  data_lama: string
  data_baru: string
}
