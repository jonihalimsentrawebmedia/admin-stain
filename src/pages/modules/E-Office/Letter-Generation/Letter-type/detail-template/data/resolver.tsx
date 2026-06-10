import z from 'zod'

export const ResolverListTemplateLetter = z.object({
  id_jenis_template_surat: z.string().optional().nullable(),
  uraian: z.string({ error: 'Uraian harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type TResolverListTemplateLetter = z.infer<typeof ResolverListTemplateLetter>
