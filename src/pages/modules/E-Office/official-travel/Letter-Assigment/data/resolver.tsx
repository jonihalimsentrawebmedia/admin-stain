import { z } from 'zod'

export const EmployeeSchema = z.object({
  id_sdm: z.string().nullable().optional(),
  metode_tambah: z.enum(['MANUAL', 'DOSEN_STAFF'], { error: 'Metode tambah wajib dipilih' }),
  nama_lengkap: z.string().min(1, 'Nama lengkap wajib diisi'),
  satuan_kerja: z.string().optional().nullable(),
  nik: z.string().optional().nullable(),
  nip: z.string().optional().nullable(),
  hp: z.string().optional().nullable(),
  alamat: z.string().optional().nullable(),
  jabatan_pegawai: z.string().optional().nullable(),
})

export const ResolverLetterTask = z.object({
  id_kop_surat: z.string({ error: 'Kop surat wajib dipilih' }),
  id_nomor_surat_otomatis: z.string({ error: 'Jenis nomor surat wajib dipilih' }),
  nomor_urut_manual: z.string().optional().nullable(),
  tanggal_surat: z.string({
    error: 'Tanggal surat wajib diisi',
  }),
  tanggal_mulai: z.string({
    error: 'Tanggal mulai wajib diisi',
  }),
  tanggal_akhir: z.string({ error: 'Tanggal akhir wajib diisi' }),
  tempat_kegiatan: z.string({ error: 'Tempat kegiatan wajib diisi' }),
  dasar_surat_tugas: z
    .array(z.string().min(1, 'Dasar surat tidak boleh kosong'))
    .min(1, 'Minimal 1 dasar surat'),
  kegiatan: z.array(z.string().min(1, 'Kegiatan tidak boleh kosong')).min(1, 'Minimal 1 kegiatan'),
  disahkan_oleh: z.string({ error: 'Pejabat Pengesahan wajib diisi' }),
  pegawai: z.array(EmployeeSchema).min(1, 'Minimal 1 pegawai'),
})

export type TResolverLetterTask = z.infer<typeof ResolverLetterTask>
export type TEmployeeSchema = z.infer<typeof EmployeeSchema>
