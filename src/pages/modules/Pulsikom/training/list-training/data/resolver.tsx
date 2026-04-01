import { z } from 'zod'

export const ResolverInformationTraining = z.object({
  url_gambar: z.url(),
  nama_training: z.string(),
  deskripsi: z.string(),
  minimal_pendaftar: z.number(),
  maksimal_pendaftar: z.number().optional().nullable(),
  is_tidak_ada_batas: z.boolean(),
  tgl_buka_pendaftaran: z.string().optional().nullable(),
  tgl_tutup_pendaftaran: z.string().optional().nullable(),
})

export const ResolverTopicSchedule = z.object({
  judul_topik_bahasan: z.string(),
  deskripsi: z.string(),
  tanggal_mulai_bahasan: z.string(),
  tanggal_selesai_bahasan: z.string(),
})

export const ResolverPricing = z.object({
  nama_biaya: z.string(),
  harga: z.number(),
  urutan: z.number(),
  keuntungan: z.string(),
})

export const ContactMoreNoted = z.object({
  is_kontak_unit: z.boolean(),
  no_telepon: z.string(),
  email: z.email(),
  alamat: z.string(),
  catatan_tambahan: z.string(),
})

export type TResolverInformationTraining = z.infer<typeof ResolverInformationTraining>
export type TResolverTopicSchedule = z.infer<typeof ResolverTopicSchedule>
export type TResolverPricing = z.infer<typeof ResolverPricing>
export type TContactMoreNoted = z.infer<typeof ContactMoreNoted>
