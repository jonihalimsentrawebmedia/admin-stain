import { z } from 'zod'

export const ResolverRoomType = z.object({
  nama: z
    .string({ error: 'Nama Jenis Ruangan harus diisi' })
    .min(1, 'Nama Jenis Ruangan harus diisi'),
})

export type IRoomTypeResolver = z.infer<typeof ResolverRoomType>
