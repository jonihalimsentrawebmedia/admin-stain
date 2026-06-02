import z from 'zod'

export const ResolverEvent = z.object({
  nama_kegiatan: z.string({ error: 'Nama Kegiatan harus diisi' }),
  tanggal_mulai: z.string({ error: 'Tanggal Mulai harus diisi' }),
  tanggal_selesai: z.string({ error: 'Tanggal Selesai harus diisi' }),
  waktu: z.string({ error: 'Waktu harus diisi' }),
  tempat: z.string({ error: 'Tempat harus diisi' }),
  penyelenggara: z.string({ error: 'Penyelenggara harus diisi' }),
})

export type TResolverEvent = z.infer<typeof ResolverEvent>
