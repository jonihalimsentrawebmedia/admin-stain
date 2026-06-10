import z from 'zod'

export const ResolverTypeLetter = z.object({
  nama_jenis_surat: z.string({ error: 'Nama Jenis Surat harus diisi' }),
  kategori_jenis_surat: z.enum(['DOSEN', 'PEGAWAI', 'MAHASISWA', 'UMUM', 'LAINNYA']),
  kode_surat: z.string({ error: 'Kode Surat harus diisi' }),
})

export type TResolverTypeLetter = z.infer<typeof ResolverTypeLetter>
