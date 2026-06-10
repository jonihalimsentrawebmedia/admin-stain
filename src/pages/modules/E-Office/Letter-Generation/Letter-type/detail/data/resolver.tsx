import z from 'zod'

export const ResolverTypeTemplateLetter = z.object({
  nama_jenis_template: z.string({ error: 'Nama Jenis Template harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
  id_jenis_surat: z.string().optional().nullable(),
})

export type TResolverTypeTemplateLetter = z.infer<typeof ResolverTypeTemplateLetter>
