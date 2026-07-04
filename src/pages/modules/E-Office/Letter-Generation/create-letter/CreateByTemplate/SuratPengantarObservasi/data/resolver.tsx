import { z } from 'zod'

export const ResolverSPO = z.object({
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  id_mahasiswa: z.array(z.string()),

  id_fakultas: z.string({ error: 'Fakultas harus diisi' }),
  id_prodi: z.string({ error: 'Prodi harus diisi' }),

  tanggal_observasi: z.string({ error: 'Tanggal Pelaksanaan harus diisi' }),
  waktu_observasi: z.string({ error: 'Waktu Pelaksanaan harus diisi' }),
  tempat_observasi: z.string({ error: 'Tempat Observasi harus diisi' }),
  topik_observasi: z.string({ error: 'Topik Observasi harus diisi' }),

  penutup: z.string({ error: 'Penutup harus diisi' }),

  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nip_penandatangan: z.string().optional().nullable(),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),
})

export type TResolverSPO = z.infer<typeof ResolverSPO>
