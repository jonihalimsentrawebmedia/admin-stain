import { z } from 'zod'

export const SuratSchema = z.object({
  id_unit: z.string({ error: 'satuan organisasi harus diisi' }),
  id_jenis_surat: z.string({ error: 'Jenis surat wajib diisi' }),
  id_klasifikasi_surat: z.string({ error: 'Klasifikasi surat wajib diisi' }),
  id_sifat_surat: z.string({ error: 'Sifat surat wajib diisi' }),

  id_penandatangan_sdm: z.string({ error: 'Penandatangan wajib diisi' }),
  surat_kepada: z.string({ error: 'Penerima surat wajib diisi' }),
  nomor_surat: z.string({ error: 'Nomor surat wajib diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal surat wajib diisi' }),
  perihal: z.string({ error: 'Perihal surat wajib diisi' }),
  ringkasan: z.string().optional().nullable(),
  tembusan: z.string().optional().nullable(),

  is_agenda: z.boolean(),
  nama_kegiatan: z.string().optional().nullable(),
  is_samakan_dengan_surat: z.boolean(),
  keterangan_agenda: z.string().optional().nullable(),
  tanggal_mulai: z.string().optional().nullable(),
  tanggal_selesai: z.string().optional().nullable(),
  tempat: z.string().optional().nullable(),
  id_waktu_pengingat_agenda: z.string().optional().nullable(),
  is_penting: z.boolean(),

  is_lampiran: z.boolean(),
  kenapa_tidak_ada_lampiran: z.string().optional().nullable(),
  list_lampiran: z
    .array(
      z.object({
        url_dokumen: z.string(),
      })
    )
    .optional()
    .nullable(),
  is_disposisi: z.boolean(),
  list_id_sdm: z.array(z.string()).optional().nullable(),
})

export type SuratFormType = z.infer<typeof SuratSchema>
