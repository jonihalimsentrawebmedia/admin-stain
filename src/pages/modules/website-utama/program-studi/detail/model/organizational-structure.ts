import z from 'zod'

export interface OrganizationalStructure {
  id_satuan_organisasi: string
  id_unit: string
  url_gambar: string
  key_gambar: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

export const OrganizationalStructureResolver = z.object({
  url_gambar: z
    .string({ message: 'Gambar wajib diisi.' })
    .min(1, { message: 'Gambar wajib diisi.' }),
})

export type IOrganizationalStructureTypeForm = z.infer<typeof OrganizationalStructureResolver>
