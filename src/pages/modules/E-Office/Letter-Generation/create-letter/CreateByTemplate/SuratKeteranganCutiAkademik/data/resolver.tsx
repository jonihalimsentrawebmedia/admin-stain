import { z } from 'zod'

export const ResolverSKCAM = z.object({
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  //Informasi Mahasiswa
  id_mahasiswa: z.string({ error: 'Mahasiswa harus diisi' }),
  nama_mahasiswa: z.string().optional().nullable(),
  nim: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  Fakultas: z.string().optional().nullable(),
  jenjang: z.string().optional().nullable(),
  kode_jenjang: z.string().optional().nullable(),
  semester: z.number().optional().nullable(),

  // periode cuti
  semester_cuti: z.string({ error: 'Semester Cuti harus diisi' }),
  tahun_akademik: z.string({ error: 'Tahun Akademik harus diisi' }),
  periode_cuti: z.number({ error: 'Periode Cuti harus diisi' }),
  alasan_cuti: z.string({ error: 'Alasan Cuti harus diisi' }),
  penutup: z.string({ error: 'Penutup harus diisi' }),

  // penandatangan
  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nip_penandatangan: z.string().optional().nullable(),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),
})

export type TResolverSKCAM = z.infer<typeof ResolverSKCAM>
