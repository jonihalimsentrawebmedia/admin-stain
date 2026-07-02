import { z } from 'zod'

export const ResolverLetterPKL = z.object({
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  lampiran: z.number({ error: 'Jumlah Lampiran harus diisi' }),
  perihal: z.string({ error: 'Perihal harus diisi' }),
  detail_lampiran: z.array(z.string()),
  instansi_pimpinan: z.string({ error: 'Instansi Pimpinan harus diisi' }),
  alamat_instansi: z.string({ error: 'Alamat Instansi harus diisi' }),
  masukan_di: z.string({ error: 'Di Tempat harus diisi' }),
  pembuka: z.string({ error: 'Pembuka harus diisi' }),

  id_mahasiswa: z.array(z.string()),
  tanggal_mulai: z.string({ error: 'Tanggal Mulai harus diisi' }),
  tanggal_selesai: z.string({ error: 'Tanggal Selesai harus diisi' }),

  penutup: z.string({ error: 'Penutup harus diisi' }),

  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nip_penandatangan: z.string().optional().nullable(),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),
})

export type TResolverLetterPKL = z.infer<typeof ResolverLetterPKL>
