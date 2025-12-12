import { z } from 'zod'

export const AcreditationResolver = z.object({
  gambar: z
    .string({ message: 'Gambar Penilaian wajib diisi.' })
    .min(1, { message: 'Gambar Penilaian wajib diisi.' }),
  id_satuan_organisasi_akreditas: z
    .string({ message: 'Universitar/prodi akreditasi wajib diisi.' })
    .min(1, { message: 'Universitar/prodi akreditasi wajib diisi.' }),

  uraian: z.string().min(1, { message: 'Uraian akreditasi wajib diisi.' }),
  nilai_akreditas: z
    .string({ message: 'Lembaga Penilaian wajib diisi.' })
    .min(1, { message: 'Lembaga Penilaian wajib diisi.' }),
  lembaga_penilaian: z
    .string({ message: 'Lembaga Penilaian wajib diisi.' })
    .min(1, { message: 'Lembaga Penilaian wajib diisi.' }),
  no_surat_keputusan: z
    .string({ message: 'Nomor Surat Keputusan wajib diisi.' })
    .min(1, { message: 'Nomor Surat Keputusan wajib diisi.' }),
  mulai_berlaku: z
    .string({ message: 'Tanggal Mulai Berlaku wajib diisi.' })
    .min(1, { message: 'Tanggal Mulai Berlaku wajib diisi.' }),
  akhir_berlaku: z
    .string({ message: 'Tanggal Akhir Berlaku wajib diisi.' })
    .min(1, { message: 'Tanggal Akhir Berlaku wajib diisi.' }),
})

export type IAcreditationTypeForm = z.infer<typeof AcreditationResolver>
