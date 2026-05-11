import { z } from 'zod'

export const PlacemanResolver = z.object({
  id_kelompok_organisasi: z.string({ error: 'Kelompok Organisasi Wajib DIpilih' }).min(1),
  id_pangkat_golongan: z.string({ error: 'Pangkat Golongan Wajib Diisi' }).optional().nullable(),
  id_pangkat_akademik: z.string({ error: 'Pangkat Akademik Wajib Diisi' }).optional().nullable(),
  nama_lengkap: z
    .string({ error: 'Nama Lengkap Pejabat Wajib Diisi' })
    .min(1, { error: 'Nama Lengkap Pejabat Hrus Lebih dari 1 karakter' }),
  jabatan: z
    .string({ error: 'Jabatan Wajib Diisi' })
    .min(1, { error: 'Jabatan Harus Lebih dari 1 karakter' }),
  gambar: z.string().min(1),
  nip: z.string({ error: 'NIP Wajib Diisi' }).optional().nullable(),
  no_hp: z.string({ error: 'No HP wajib Diisi' }).min(8, { error: 'No HP minimal 8 karakter' }),
  email: z.email({ error: 'Format Email Tidak Sesuai' }).min(1, { error: 'Email Wajib Diisi' }),
  urutan: z.number({ error: 'Urutan Wajib Diisi' }).min(1),
  show_email_public: z.boolean(),
  show_no_hp_public: z.boolean(),
  id_sdm: z.string().optional().nullable(),
  is_dosen: z.boolean().optional().nullable(),
  is_local_data: z.boolean(),
})

export type PlacemanType = z.infer<typeof PlacemanResolver>
