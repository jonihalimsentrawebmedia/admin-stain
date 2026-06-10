import { z } from 'zod'

export const LetterInvitationSchema = z.object({
  id_kop_surat: z.string().min(1, 'Kop surat wajib dipilih'),
  id_nomor_surat_otomatis: z.string().optional().default(''),
  id_jenis_surat: z.string().optional().default(''),
  nomor_urut_manual: z.string().optional().default(''),
  tempat_surat: z.string().min(1, 'Tempat surat wajib diisi'),
  tanggal_surat: z.string().min(1, 'Tanggal surat wajib diisi'),
  lampiran: z.number().min(0),
  detail_lampiran: z.array(z.string()),
  perihal: z.string().min(1, 'Perihal wajib diisi'),
  is_yth_lebih_dari_satu: z.boolean(),
  yang_terhormat: z.string().min(1, 'Yang terhormat wajib diisi'),
  di: z.string().min(1, 'Lokasi tujuan wajib diisi'),
  pembuka: z.string().min(1, 'Pembuka wajib diisi'),
  hari_mulai: z.string().min(1, 'Hari mulai wajib diisi'),
  hari_akhir: z.string().min(1, 'Hari akhir wajib diisi'),
  is_lebih_dari_satu_hari: z.boolean(),
  waktu: z.string().min(1, 'Waktu wajib diisi'),
  tempat: z.string().min(1, 'Tempat kegiatan wajib diisi'),
  agenda: z.array(z.string().min(1)).min(1, 'Minimal satu agenda harus diisi'),
  penutup: z.string().min(1, 'Penutup wajib diisi'),
  is_ada_tembusan: z.boolean(),
  tembusan: z.array(z.string()),
  disahkan_oleh: z.string().min(1, 'Pejabat penandatangan wajib dipilih'),
})

export type TLetterInvitationSchema = z.infer<typeof LetterInvitationSchema>
