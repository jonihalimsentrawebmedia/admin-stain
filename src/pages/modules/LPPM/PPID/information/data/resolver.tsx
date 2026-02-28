import { z } from 'zod'

export const ResolverInformation = z
  .object({
    judul: z.string({ error: 'Judul harus diisi' }),
    id_parent: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
    urutan: z.number(),
  })
  .superRefine((data, ctx) => {
    if (data.id_parent) {
      if (!data.url || data.url.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'URL harus diisi',
          path: ['url'],
        })
      }
    }
  })

export type SchemaInformation = z.infer<typeof ResolverInformation>
