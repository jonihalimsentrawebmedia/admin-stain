import z from 'zod'

export const ResolverReminderAgenda = z.object({
  waktu: z.number({ error: 'Nama harus diisi' }).min(15, { error: ': Minimal 15 menit' }),
})

export type TResolverReminderAgenda = z.infer<typeof ResolverReminderAgenda>
