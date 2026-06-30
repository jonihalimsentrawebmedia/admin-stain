import z from 'zod'

export const ResolverIsiTemplateSurat = z.object({
  id_template_surat: z.string().optional().nullable(),
  uraian: z.string({ error: 'Uraian harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type TResolverIsiTemplateSurat = z.infer<typeof ResolverIsiTemplateSurat>
