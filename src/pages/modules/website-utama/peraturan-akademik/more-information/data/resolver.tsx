import z from 'zod'

export const ResolverMoreInformation = z.object({
  judul: z.string({ error: 'Judul Wajib Diisi' }),
  urutan: z.number({ error: 'Urutan Wajib Diisi' }),
  publish: z.boolean({ error: 'Status Publish Wajib Diisi' }),
  isi: z.string({ error: 'Isi Informasi Wajib Diisi' }),
})

export type TResolverMoreInformation = z.infer<typeof ResolverMoreInformation>

export interface IMoreInformation {
  id_pengaturan_akademik_informasi_tambahan: string

  id_satuan_organisasi: string
  judul: string
  isi: string
  publish: boolean
  urutan: number

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}
