import z from 'zod'

export interface IAcademicResource {
  id_academic_resources: string
  id_satuan_organisasi: string

  icon_url: string
  icon_key: string
  judul: string
  url_layanan: string
  urutan: number

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}

export const ResolverAcademicResource = z.object({
  icon_url: z.string({ error: 'Icon Harus Diisi' }),
  judul: z.string({ error: 'Judul Harus Diisi' }),
  url_layanan: z.url({ error: 'Url Layanan Harus Diisi' }),
  urutan: z.number({ error: 'Urutan Harus Diisi Minimal 1' }),
})

export type ResolverAcademicResourceType = z.infer<typeof ResolverAcademicResource>
