import { z } from 'zod'

export const StatusEmployeeResolver = z.object({
  kode_status: z.string(),
  nama_status: z.string(),
  is_ada_nidn: z.boolean(),
  is_dosen: z.boolean(),
})

export type TStatusEmployeeResolver = z.infer<typeof StatusEmployeeResolver>
