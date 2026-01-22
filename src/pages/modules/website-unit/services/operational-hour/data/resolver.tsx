import { z } from 'zod'

export const OperatingHour = z.object({
  hari: z.string({ error: 'Hari wajib diisi' }),
  jam_operasional: z.string({ error: 'Jam Operasional wajib diisi' }),
})

export type OperatingHourType = z.infer<typeof OperatingHour>
