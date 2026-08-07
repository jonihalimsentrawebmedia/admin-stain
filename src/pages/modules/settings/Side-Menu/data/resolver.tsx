import { z } from 'zod'

export const MenuResolver = z.object({
  parent_id: z.string().optional().nullable(),
  label: z.string({ error: 'Label wajib diisi' }),
  link: z.string().optional(),
  icon: z.string().optional().nullable(),
  urutan: z.number(),
  is_active: z.boolean(),
})

export type TMenuForm = z.infer<typeof MenuResolver>
