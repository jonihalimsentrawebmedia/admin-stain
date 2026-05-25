import z from 'zod'

export const ResolverAcceptNotification = z.object({
  id_sdm: z.string(),
  email: z.string(),
  telepon: z.string(),
  id_telegram: z.string(),
  status: z.boolean(),
})

export type TResolverAcceptNotification = z.infer<typeof ResolverAcceptNotification>
