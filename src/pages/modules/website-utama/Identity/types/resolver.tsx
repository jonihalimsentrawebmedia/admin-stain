import { z } from 'zod'

export const CampusIdentityResolver = z.object({
  teks_pengantar: z.string({ error: 'teks pengantar wajib diisi' }),
  dokumen_status_url: z.string({ error: 'dokumen status wajib diisi' }),
  dokumen_status_key: z.string({ error: 'dokumen status key wajib diisi' }),
  isi_nama: z.string({ error: 'isi nama wajib diisi' }),
  isi_kedudukan: z.string({ error: 'isi kedudukan wajib diisi' }),
  isi_berdiri: z.string({ error: 'isi berdiri wajib diisi' }),
  isi_busana_akademik: z.string({ error: 'isi busana akademik wajib diisi' }),
  lambang_url: z.string({ error: 'lambang url wajib diisi' }),
  isi_lambang: z.string({ error: 'Arti lambang wajib diisi' }),
  bendera_url: z.string({ error: 'bendera url wajib diisi' }),
  isi_bendera: z.string({ error: 'Arti bendera wajib diisi' }),
  isi_mars_hymne: z.string({ error: 'isi mars hymne wajib diisi' }),
})

export type IIdentityCampus = z.infer<typeof CampusIdentityResolver>
