import z from 'zod'

export const ResolverGuestBook = z.object({
  id_unit: z.string({ error: 'Asal/ Instansi Harus Dipilih harus diisi' }),
  tanggal_kunjungan: z.string({ error: 'Tanggal Kunjungan harus diisi' }),
  nik: z.string({ error: 'NIK harus diisi' }).length(16, { message: 'NIK harus 16 digit' }),
  nama_lengkap: z.string({ error: 'Nama Lengkap harus diisi' }),
  no_hp: z.string({ error: 'No HP harus diisi' }),
  kota: z.string({ error: 'Kota harus diisi' }),
  alamat_lengkap: z.string({ error: 'Alamat harus diisi' }),
  id_jenis_keperluan: z.string({ error: 'Jenis Keperluan harus diisi' }),
  id_tujuan_bertamu: z.string({ error: 'Tujuan Bertama harus diisi' }),
  keterangan_bertamu: z.string({ error: 'Keterangan harus diisi' }),
  url_foto: z.string({ error: 'URL Gambar harus diisi' }),
})

export type TResolverGuestBook = z.infer<typeof ResolverGuestBook>
