import { z } from 'zod'

export const FacilitiesResolver = z.object({
  gambar: z.string().min(1),
  nama_fasilitas: z.string().optional().nullable(),
  deskripsi: z.string().min(1),
  alamat: z.string().min(1),
  link_google_map: z.string().min(1),
  jam_operasional: z.string().min(1),
  no_hp_pembantu: z.string().min(1),
  email_pembantu: z.string().min(1),
})

export type FacilitiesType = z.infer<typeof FacilitiesResolver>
