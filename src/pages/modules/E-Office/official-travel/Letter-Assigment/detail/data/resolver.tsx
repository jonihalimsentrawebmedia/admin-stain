import { z } from 'zod'

export const ResolverSPPD = z.object({
  id_kop_surat: z.string({ error: 'Kop surat wajib dipilih' }),
  id_nomor_surat_otomatis: z.string({ error: 'Jenis nomor surat wajib dipilih' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tanggal_surat: z.string({ error: 'Tanggal surat wajib diisi' }),
  id_unit: z.string({ error: 'Unit wajib dipilih' }),
  akun: z.string({ error: 'Akun wajib Diisi' }),
  lain_lain: z.string({ error: 'Lain-lain wajib diisi' }),
  disahkan_oleh: z.string({ error: 'Pejabat Pengesahan wajib Dipilih' }),
  id_jenis_transportasi: z.string({ error: 'Jenis transportasi wajib dipilih' }),
  tempat_asal: z.string({ error: 'Tempat asal wajib diisi' }),
  tempat_tujuan: z.string({ error: 'Tempat tujuan wajib diisi' }),
  maksud_kegiatan: z.string({ error: 'Maksud kegiatan wajib diisi' }),
})

export type TResolverSPPD = z.infer<typeof ResolverSPPD>
