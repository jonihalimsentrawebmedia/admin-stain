import { z } from 'zod'

export const SignatureResolver = z.object({
  label: z.string().nullable().optional(),
  jabatan: z.string().nullable().optional(),
  nama: z.string().nullable().optional(),
})

export const AttendanceSettingResolver = z.object({
  nomor: z.boolean(),
  nama_peserta: z.boolean(),
  instansi: z.boolean(),
  hp: z.boolean(),
  email: z.boolean(),
  jabatan: z.boolean(),
  tanda_tangan: z.boolean(),
  keterangan: z.boolean(),
  hasil_cetak: z.enum(['portrait', 'landscape']),

  jumlah_peserta: z.number().min(0),

  label_diketahui: z.string({ error: 'Label Diketahui harus diisi' }),
  jabatan_diketahui: z.string({ error: 'Jabatan Diketahui harus diisi' }),
  nama_diketahui: z.string({ error: 'Nama Diketahui harus diisi' }),

  label_mengetahui: z.string().nullable().optional(),
  jabatan_mengetahui: z.string().nullable().optional(),
  nama_mengetahui: z.string().nullable().optional(),

  saksi_pendatang: z.array(SignatureResolver),
})

export type SignatureType = z.infer<typeof SignatureResolver>
export type AttendanceSettingType = z.infer<typeof AttendanceSettingResolver>
