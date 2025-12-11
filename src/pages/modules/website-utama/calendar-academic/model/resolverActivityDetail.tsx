import { z } from 'zod'

export const ActivityDetailResolver = z.object({
  nama_kegiatan: z
    .string({ error: 'Nama Kegiatan Wajib Diisi' })
    .min(1, { error: 'Nama Kegiatan Wajib Diisi' }),
  nama_tahun_akademik: z
    .string({ error: 'Nama Tahun Akademik Wajib Diisi' })
    .min(1, { error: 'Nama Tahun Akademik Wajib Diisi' }),
  uraian_kegiatan: z
    .string({ error: 'uraian Kegiatan Wajib Diisi' })
    .min(1, { error: 'uraian Kegiatan Wajib Diisi' }),
  tanggal_mulai: z
    .string({ error: 'Tanggal Mulai Wajib Diisi' })
    .min(1, { error: 'Tanggal Mulai Wajib Diisi' }),
  tanggal_selesai: z
    .string({ error: 'Tanggal Selesai Wajib Diisi' })
    .min(1, { error: 'Tanggal Selesai Wajib Diisi' }),
  keterangan: z
    .string({ error: 'Keterangan Wajib Diisi' })
    .min(1, { error: 'Keterangan Wajib Diisi' }),
})

export type IActivityDetailTypeForm = z.infer<typeof ActivityDetailResolver>
