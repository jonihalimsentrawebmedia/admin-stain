import { z } from 'zod'

export const ResolverPoliCreate = z.object({
  nama: z
    .string({ error: 'Nama Poli harus diisi' })
    .min(1, 'Nama Poli harus diisi'),
  lokasi: z
    .string({ error: 'Lokasi harus diisi' })
    .min(1, 'Lokasi harus diisi'),
})

export type TResolverPoliCreate = z.infer<typeof ResolverPoliCreate>

export const ResolverPoliUpdate = z.object({
  nama: z
    .string({ error: 'Nama Poli harus diisi' })
    .min(1, 'Nama Poli harus diisi'),
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

export type TResolverPoliUpdate = z.infer<typeof ResolverPoliUpdate>
