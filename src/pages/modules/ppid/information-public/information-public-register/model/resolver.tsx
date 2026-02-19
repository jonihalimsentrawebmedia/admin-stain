import z from 'zod'

export const InformationPublicRegisterResolver = z.object({
  ringkasan_isi_informasi: z
    .string({ error: 'Ringkasan Isi Informasi Wajib Diisi' })
    .min(1, { error: 'Ringkasan Isi Informasi Wajib Diisi' }),
  id_pejabat: z.string({ error: 'Pejabat Wajib Diisi' }).min(1, { error: 'Pejabat Wajib Diisi' }),
  id_kelompok_organisasi: z
    .string({ error: 'Kelompok Organisasi Wajib Diisi' })
    .min(1, { error: 'Kelompok Organisasi Wajib Diisi' }),
  waktu_dan_tempat_pembuatan_informasi: z
    .string({ error: 'Waktu dan Tempat Pembuatan Informasi Wajib Diisi' })
    .min(1, { error: 'Waktu dan Tempat Pembuatan Informasi Wajib Diisi' }),
  format_informasi_tersedia: z
    .array(z.string({ error: 'Item format wajib berupa teks' }))
    .min(1, { message: 'Format Informasi Tersedia Wajib Diisi minimal satu' }),
  jangka_aktif: z
    .string({ error: 'Jangka Aktif Wajib Diisi' })
    .min(1, { error: 'Jangka Aktif Wajib Diisi' }),
  jangka_inaktif: z
    .string({ error: 'Jangka Inaktif Wajib Diisi' })
    .min(1, { error: 'Jangka Inaktif Wajib Diisi' }),
})

export type InformationPublicRegisterType = z.infer<typeof InformationPublicRegisterResolver>
