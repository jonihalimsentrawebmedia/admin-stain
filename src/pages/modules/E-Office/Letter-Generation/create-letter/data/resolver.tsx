import { z } from 'zod'

export const LetterInvitationSchema = z.object({
  id_kop_surat: z.string({ error: 'Kop Surat Wajib Dipilih' }).min(1, 'Kop surat wajib dipilih'),
  id_nomor_surat_otomatis: z.string().optional().default(''),
  id_jenis_surat: z.string().optional().default(''),
  nomor_urut_manual: z.string().optional().nullable(),
  tempat_surat: z.string({ error: 'Tempat surat wajib diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal surat wajib diisi' }),
  lampiran: z.number().min(0),
  detail_lampiran: z.array(z.string(), { error: 'Lampiran Minimal 1' }),
  perihal: z.string({ error: 'Perihal wajib diisi' }),
  is_yth_lebih_dari_satu: z.boolean(),
  yang_terhormat: z.string({ error: 'Yang terhormat wajib diisi' }),
  di: z.string({ error: 'Di wajib diisi' }),
  pembuka: z.string({ error: 'Pembuka wajib diisi' }),
  hari_mulai: z.string({ error: 'Hari mulai wajib diisi' }),
  hari_akhir: z.string().optional().nullable(),
  is_lebih_dari_satu_hari: z.boolean(),
  waktu: z.string({ error: 'Waktu wajib diisi' }),
  tempat: z.string({ error: 'Tempat wajib diisi' }),
  agenda: z.array(z.string().min(1), { error: 'Agenda Minimal 1' }),
  penutup: z.string({ error: 'Penutup wajib diisi' }),
  is_ada_tembusan: z.boolean(),
  tembusan: z.array(z.string()),
  disahkan_oleh: z.string({ error: 'Disahkan oleh wajib dipilih' }),
})

export type TLetterInvitationSchema = z.infer<typeof LetterInvitationSchema>
