import { z } from 'zod'

export const FacilitiesUnitResolver = z.object({
  gambar: z.string({ error: 'Gambar wajib diisi' }),
  keterangan_gambar: z.string().optional().nullable(),
  nama_fasilitas: z.string({ error: 'Nama Fasilitas wajib diisi' }),
  deskripsi: z.string({ error: 'Deskripsi wajib diisi' }),
  unit_fasilitas_gambar_tambahan: z.array(
    z.object({
      gambar: z.string({ error: 'Gambar wajib diisi' }),
      keterangan: z.string().optional().nullable(),
    })
  ),
})

export type FacilitiesUnitResolverType = z.infer<typeof FacilitiesUnitResolver>
