import { z } from 'zod'

export const AgendaResolver = z.object({
  gambar: z.string({ error: 'gambar wajib di isi' }),
  keterangan_gambar: z
    .string({ error: 'Keterangan Gambar wajib di isi' })
    .min(1, { error: 'keterangan gambar minimal 1 karakter' }),
  judul: z.string({ error: 'Judul wajib di isi' }).min(1, { error: 'Judul minimal 1 karakter' }),
  waktu_mulai: z.string({ error: 'Waktu Mulai wajib di isi' }),
  waktu_selesai: z.string().optional().nullable(),
  lokasi_kegiatan: z.string().optional().nullable(),
  isi_agenda: z
    .string({ error: 'Isi Agenda wajib di isi' })
    .min(1, { error: 'Isi Agenda minimal 1 karakter' }),
  penulis: z
    .string({ error: 'Penulis wajib di isi' })
    .min(1, { error: 'Penulis minimal 1 karakter' }),
})

export type AgendaType = z.infer<typeof AgendaResolver>
