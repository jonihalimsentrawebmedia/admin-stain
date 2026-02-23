import z from 'zod'

export const ObjectionPublicResolver = z.object({
  no_registrasi: z.string({ error: 'Nomor Registrasi Wajib Diisi' }),
  tanggal_tanggapan: z.string({ error: 'Tanggal Tanggapan Wajib Diisi' }),
  subjek: z.string({ error: 'Subjek Wajib Diisi' }),
  pesan: z.string({ error: 'Pesan Wajib Diisi' }),
  file_lampiran: z.array(z.string()).min(1, { message: 'File Lampiran Wajib Diisi' }),
})

export type ObjectionPublicType = z.infer<typeof ObjectionPublicResolver>
