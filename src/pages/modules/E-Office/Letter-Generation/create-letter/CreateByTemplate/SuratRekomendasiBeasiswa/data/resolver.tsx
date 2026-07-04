import { z } from 'zod'

export const ResolverSRB = z.object({
  id_nomor_surat_otomatis: z.string({ error: 'Nomor Surat Otomatis harus diisi' }),
  nomor_urut_manual: z.string().nullable().optional(),
  tempat_surat: z.string({ error: 'Tempat Surat harus diisi' }),
  tanggal_surat: z.string({ error: 'Tanggal Surat harus diisi' }),
  id_kop_surat: z.string({ error: 'Kop Surat harus diisi' }),
  id_jenis_template_surat: z.string({ error: 'Jenis Template Surat harus diisi' }),

  id_mahasiswa: z.string({ error: 'Mahasiswa harus diisi' }),
  nama_mahasiswa: z.string().optional().nullable(),
  nim: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  Fakultas: z.string().optional().nullable(),
  jenjang: z.string().optional().nullable(),
  semester: z.number().optional().nullable(),
  ipk: z.number({ error: 'IPK harus diisi' }).max(4, { message: 'IPK harus kurang dari 4' }),
  penutup: z.string({ error: 'Penutup harus diisi' }),

  id_penandatangan: z.string({ error: 'Penandatangan harus diisi' }),
  nama_penandatangan: z.string({ error: 'Nama Penandatangan harus diisi' }),
  nip_penandatangan: z.string().optional().nullable(),
  nidn_penandatangan: z.string().optional().nullable(),
  jabatan_penandatangan: z.string({ error: 'Jabatan Penandatangan harus diisi' }),
  id_satuan_kerja_penandatangan: z.string({ error: 'Satuan Kerja Penandatangan harus diisi' }),
})

export type TResolverSRB = z.infer<typeof ResolverSRB>
