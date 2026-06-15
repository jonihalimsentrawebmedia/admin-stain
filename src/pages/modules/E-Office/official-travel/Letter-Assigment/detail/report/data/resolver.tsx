import { z } from 'zod'

export const ReportOfficialTravel = z.object({
  tempat: z.string({ error: 'Tempat wajib diisi' }),
  tanggal: z.date({ error: 'Tanggal wajib diisi' }),
  perihal: z.string({ error: 'Perihal wajib diisi' }),
  isi: z.string({ error: 'Isi wajib diisi' }),
  dasar_perjalanan_dinas: z.string({ error: 'Dasar perjalanan dinas wajib diisi' }),
  laporan_pelaksana: z
    .array(z.string().min(1, 'Laporan pelaksana tidak boleh kosong'))
    .min(1, 'Minimal satu laporan pelaksana'),
  tindak_lanjut: z.string({ error: 'Tindak lanjut wajib diisi' }),
  saran: z.string({ error: 'Saran wajib diisi' }),
})

export type TReportOfficialTravel = z.infer<typeof ReportOfficialTravel>
