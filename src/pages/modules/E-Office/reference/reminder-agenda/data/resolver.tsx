import z from 'zod'

export const ResolverReminderAgenda = z.object({
  waktu: z.string({ error: 'Nama harus diisi' }),
})

export type TResolverReminderAgenda = z.infer<typeof ResolverReminderAgenda>
