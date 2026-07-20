import { z } from 'zod'

const ResepObatItem = z.object({
  id_obat: z.string(),
  nama_obat: z.string(),
  satuan: z.string(),
  harga: z.number(),
  frekuensi: z.number().min(1, 'Frekuensi harus lebih dari 0'),
  durasi: z.number().min(1, 'Durasi harus lebih dari 0'),
  jumlah: z.number().min(1, 'Jumlah harus lebih dari 0'),
})

export const ResolverEditPemeriksaan = z.object({
  keluhan_utama: z.string({ error: 'Keluhan Utama harus diisi' }),
  id_diagnosis: z.array(z.string()).min(1, 'Diagnosa harus dipilih'),
  id_procedure: z.array(z.string()).min(1, 'Rencana Tindakan harus dipilih'),
  catatan: z.string().optional().nullable(),
  keputusan: z.string({ error: 'Keputusan harus dipilih' }),
  daftar_resep_obat: z.array(ResepObatItem).optional(),
})

export type TRResepObatEdit = z.infer<typeof ResepObatItem>
export type TResolverEditPemeriksaan = z.infer<typeof ResolverEditPemeriksaan>
