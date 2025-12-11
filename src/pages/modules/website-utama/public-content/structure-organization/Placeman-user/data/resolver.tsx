import { z } from 'zod'

export const PlacemanResolver = z.object({
  id_kelompok_organisasi: z.string().min(1),
  id_pangkat_golongan: z.string().min(1),
  id_pangkat_akademik: z.string().min(1),
  nama_lengkap: z.string().min(1),
  jabatan: z.string().min(1),
  gambar: z.string().min(1),
  nip: z.string().min(1),
  no_hp: z.string({ error: 'No HP wajib Diisi' }).min(8, { error: 'No HP minimal 8 karakter' }),
  email: z.string().min(1),
  urutan: z.number().min(1),
  show_email_public: z.boolean(),
  show_no_hp_public: z.boolean(),
})

export type PlacemanType = z.infer<typeof PlacemanResolver>
