import z from 'zod'

export const LevelUserResolver = z.object({
  id_level_user: z
    .string({ error: 'Level User Wajib Diisi' })
    .min(1, { error: 'Level User Wajib Diisi' }),
  list_unit:
    // 1. Menggunakan z.array() untuk menandakan ini adalah array

    // 2. Di dalamnya, kita definisikan tipe elemen array-nya, yaitu string
    z
      .string({ error: 'Unit dalam List Wajib Diisi' })

      // 3. Menambahkan .min(1) pada array untuk memastikan array tidak kosong
      .min(1, { message: 'List Unit Wajib Diisi ' }),
})
export type LeveluserType = z.infer<typeof LevelUserResolver>

export interface UserMultiLevelList {
  id_users_multi_level: string
  id_user: string
  id_level_user: string
  status: string
  aktif_sejak: string // Tipe string digunakan untuk format ISO 8601 Date/Time
  created_at: string // Tipe string digunakan untuk format ISO 8601 Date/Time
  created_user: string // Berdasarkan data, ini adalah string ID atau angka yang dikonversi ke string
  updated_at: string // Tipe string digunakan untuk format ISO 8601 Date/Time
  updated_user: string // Berdasarkan data, ini adalah string ID atau angka yang dikonversi ke string
  nama_level_user: string
  list_unit_nama: {
    id_satuan_organisasi: string
    nama_satuan_organisasi: string
  }[]
}
