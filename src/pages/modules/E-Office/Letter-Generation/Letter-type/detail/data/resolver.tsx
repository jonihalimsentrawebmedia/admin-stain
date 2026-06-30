import z from 'zod'

export const ResolverTypeTemplateLetter = z.object({
  id_jenis_surat: z.string().optional().nullable(),
  nama_jenis_template: z.string({ error: 'Nama Jenis Template harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
  kode_template: z.string({ error: 'Kode Template harus diisi' }),
  is_existing_template: z.boolean(),
})

export type TResolverTypeTemplateLetter = z.infer<typeof ResolverTypeTemplateLetter>
