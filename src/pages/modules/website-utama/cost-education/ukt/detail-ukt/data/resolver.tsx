import { z } from 'zod'

export const SchemaUtkProdiEntrance = z.object({
  biaya_tingkatan: z.array(
    z.object({
      id_tingkatan: z.string().optional().nullable(),
      biaya: z.number().optional().nullable(),
    })
  ),
})

export type TSchemaUtkProdiEntrance = z.infer<typeof SchemaUtkProdiEntrance>
