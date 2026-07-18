import { z } from 'zod'

export const ResolverRoomCreate = z.object({
  nama: z
    .string({ error: 'Nama Ruangan harus diisi' })
    .min(1, 'Nama Ruangan harus diisi'),
  nomor: z
    .string({ error: 'Nomor Ruangan harus diisi' })
    .min(1, 'Nomor Ruangan harus diisi'),
  id_jenis_ruangan: z
    .string({ error: 'Jenis Ruangan harus dipilih' })
    .min(1, 'Jenis Ruangan harus dipilih'),
  jumlah_kasur: z
    .number({ error: 'Jumlah Kasur harus diisi' })
    .min(1, 'Jumlah Kasur minimal 1'),
  harga: z.number({ error: 'Harga harus diisi' }),
  lokasi: z
    .string({ error: 'Lokasi harus diisi' })
    .min(1, 'Lokasi harus diisi'),
})

export type TResolverRoomCreate = z.infer<typeof ResolverRoomCreate>

export const ResolverRoomUpdate = z.object({
  nama: z
    .string({ error: 'Nama Ruangan harus diisi' })
    .min(1, 'Nama Ruangan harus diisi'),
  nomor: z
    .string({ error: 'Nomor Ruangan harus diisi' })
    .min(1, 'Nomor Ruangan harus diisi'),
  id_jenis_ruangan: z
    .string({ error: 'Jenis Ruangan harus dipilih' })
    .min(1, 'Jenis Ruangan harus dipilih'),
  jumlah_kasur: z
    .number({ error: 'Jumlah Kasur harus diisi' })
    .min(1, 'Jumlah Kasur minimal 1'),
  harga: z.number({ error: 'Harga harus diisi' }),
  lokasi: z
    .string({ error: 'Lokasi harus diisi' })
    .min(1, 'Lokasi harus diisi'),
  is_status: z
    .string({ error: 'Status harus dipilih' })
    .min(1, 'Status harus dipilih'),
  tanggal: z
    .string({ error: 'Tanggal harus diisi' })
    .min(1, 'Tanggal harus diisi'),
})

export type TResolverRoomUpdate = z.infer<typeof ResolverRoomUpdate>
