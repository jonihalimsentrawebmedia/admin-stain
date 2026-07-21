import { z } from 'zod'

const ResepObatCPPT = z.object({
  id_obat: z.string(),
  nama_obat: z.string().optional(),
  satuan: z.string().optional(),
  harga: z.number().optional(),
  frekuensi: z.number().min(1, 'Frekuensi harus lebih dari 0'),
  durasi: z.number().min(1, 'Durasi harus lebih dari 0'),
  jumlah: z.number().min(1, 'Jumlah harus lebih dari 0'),
})

export type TRResepObatCPPT = z.infer<typeof ResepObatCPPT>

export const ResolverCreateCPPT = z.object({
  id_dokter: z.string().min(1, 'Dokter harus dipilih'),
  id_ruangan: z.string().optional().nullable(),
  tanggal_catat: z.string().min(1, 'Tanggal Catat harus diisi'),
  keluhan: z.string().min(1, 'Keluhan harus diisi'),
  catatan: z.string().optional().nullable(),
  id_diagnosis: z.array(z.string()).optional().nullable(),
  id_procedure: z.array(z.string()).optional().nullable(),
  daftar_resep_obat: z.array(ResepObatCPPT).optional().nullable(),
})

export type TResolverCreateCPPT = z.infer<typeof ResolverCreateCPPT>
