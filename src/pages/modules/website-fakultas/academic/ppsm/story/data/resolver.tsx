import { z } from 'zod'

export const StoryResolver = z.object({
  url_gambar: z.url().min(1, { message: 'Gambar wajib diisi.' }),
  nama_lengkap: z.string().min(1, { message: 'Nama Lengkap wajib diisi.' }),
  id_prodi: z.string().min(1, { message: 'Prodi wajib diisi.' }),
  tahun_lulus: z.string().min(1, { message: 'Tahun Lulus wajib diisi.' }),
  cerita: z.string().min(1, { message: 'Cerita wajib diisi.' }),
})

export type StoryForm = z.infer<typeof StoryResolver>
