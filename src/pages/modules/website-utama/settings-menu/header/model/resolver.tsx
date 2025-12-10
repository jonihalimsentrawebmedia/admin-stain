import { z } from 'zod'

export const SettingMenuResolver = z.object({
  nama_menu: z.string({ error: 'Nama Menu Wajib Diisi' }).min(1, { error: 'Nama Menu Wajib Diisi' }),
  id_parent_menu: z.string().optional().nullable(),
  sub_menu_parent: z.string().optional().nullable(),
  controller: z.string({ error: 'Controller Wajib Diisi' }).min(1, { error: 'Controller Wajib Diisi' }),
  status: z.string({ error: 'Status Wajib Diisi' }).min(1, { error: 'Halaman Wajib Diisi' }),
  halaman: z.boolean({ error: 'Halaman Wajib Diisi' }),
  urutan: z.number({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
  url: z.string({ error: 'Sumber Data Wajib Diisi' }).min(1, { error: 'Sumber Data Wajib Diisi' }),
})

export type ISettingMenuTypeForm = z.infer<typeof SettingMenuResolver>
