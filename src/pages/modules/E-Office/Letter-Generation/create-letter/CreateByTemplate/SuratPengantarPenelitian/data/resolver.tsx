import { z } from 'zod'

export const ResolverSPP = z.object({
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  //
  lampiran: z.number({ error: 'Jumlah Lampiran harus diisi' }),
  perihal: z.string({ error: 'Perihal harus diisi' }),
  detail_lampiran: z.array(z.string()),
  instansi_pimpinan: z.string({ error: 'Instansi Pimpinan harus diisi' }),
  di_tempat: z.string({ error: 'Di Tempat harus diisi' }),
  pembuka: z.string({ error: 'Pembuka harus diisi' }),

  //   mahasiswa
  id_mahasiswa: z.string({ error: 'Mahasiswa harus diisi' }),
  nama_mahasiswa: z.string().optional().nullable(),
  nim: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  Fakultas: z.string().optional().nullable(),
  jenjang: z.string().optional().nullable(),
  semester: z.number().optional().nullable(),

  //penelitian
  judul_penelitian: z.string({ error: 'Judul Penelitian harus diisi' }),
  lokasi_penelitian: z.string({ error: 'Lokasi Penelitian harus diisi' }),
  lama_penelitian: z.string({ error: 'Lama Penelitian harus diisi' }),
  metode_pengumpulan_data: z.array(z.enum(['observasi', 'wawancara', 'kuisioner', 'dokumentasi'])),

  penutup: z.string({ error: 'Penutup harus diisi' }),

  //penandatangan
  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),
})

export type TResolverSPP = z.infer<typeof ResolverSPP>
