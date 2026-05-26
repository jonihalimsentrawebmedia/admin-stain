import z from 'zod'

export const ResolverAcceptNotification = z.object({
  id_unit: z.string(),
  email: z.email(),
  no_telepon: z.string(),
  id_telegram: z.string(),
  status: z.boolean(),
})

export type TResolverAcceptNotification = z.infer<typeof ResolverAcceptNotification>
