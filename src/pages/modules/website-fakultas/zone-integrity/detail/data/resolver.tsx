import { z } from 'zod'

export const ResolverSubZoneIntegrity = z.object({
  id_zona_integritas_kategori: z.string().optional().nullable(),
  nama_sub_kategori: z.string().min(1, { message: 'Nama Sub Kategori wajib diisi' }),
  deskripsi: z.string().min(1, { message: 'Deskripsi wajib diisi' }),
})

export type TypeResolverSubZoneIntegrity = z.infer<typeof ResolverSubZoneIntegrity>
