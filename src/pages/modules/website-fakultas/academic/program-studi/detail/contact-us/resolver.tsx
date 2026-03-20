import z from 'zod'

export interface IContactUs {
  id_satuan_organisasi: string
  id_unit: string
  alamat: string
  email: string
  no_telepon: string
  link_google_map: string
  created_at: string // ISO Date string
  created_user: string
  updated_at: string // ISO Date string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export const ContactUsResolver = z.object({
  alamat: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
  email: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
  no_telepon: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
  link_google_map: z
    .string({ message: 'Isi Konten wajib diisi.' })
    .min(1, { message: 'Isi Konten wajib diisi.' }),
})

export type IContactUsTypeForm = z.infer<typeof ContactUsResolver>
