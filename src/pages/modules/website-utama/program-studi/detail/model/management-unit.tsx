import z from 'zod'

export interface ManagementUnitList {
  id_unit_pengelola: string
  id_satuan_organisasi: string
  id_sdm: string
  is_dosen: boolean
  id_unit: string
  gambar_url: string
  gambar_key: string
  nama: string
  jabatan: string
  urutan: number
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const ManagementUnitResolver = z.object({
  is_local_data: z.boolean().optional().nullable(),
  is_dosen: z.boolean().optional().nullable(),
  id_sdm: z.string().optional().nullable(),
  nama: z.string({ message: 'Nama wajib diisi.' }).min(1, { message: 'Nama wajib diisi.' }),
  gambar_url: z
    .string({ message: 'Gambar wajib diisi.' })
    .min(1, { message: 'Gambar wajib diisi.' }),
  jabatan: z
    .string({ message: 'Jabatan wajib diisi.' })
    .min(1, { message: 'Jabatan wajib diisi.' }),
  urutan: z.number({ message: 'urutan wajib diisi.' }).min(1, { message: 'urutan wajib diisi.' }),
})

export type IManagementUnitTypeForm = z.infer<typeof ManagementUnitResolver>
