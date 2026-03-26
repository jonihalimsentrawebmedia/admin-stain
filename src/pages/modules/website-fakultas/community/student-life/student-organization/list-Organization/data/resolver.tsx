import { z } from 'zod'

export const StudentOrganizationResolver = z.object({
  url_gambar: z.string(),
  nama: z.string(),
  tentang: z.string(),
  seketariat: z.string(),
  kegiatan: z.string(),
})

export type IStudentOrganization = z.infer<typeof StudentOrganizationResolver>
