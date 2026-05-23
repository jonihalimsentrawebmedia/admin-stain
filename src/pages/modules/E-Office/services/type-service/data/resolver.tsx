import z from 'zod'

export const ResolverTypeService = z.object({
  nama: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverTypeService = z.infer<typeof ResolverTypeService>
