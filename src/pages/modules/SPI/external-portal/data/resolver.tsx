import { z } from 'zod'

export const ResolverExternalPortal = z.object({
  url_gambar: z.url(),
  key_url_gambar: z.string().optional().nullable(),
  url: z.url(),
  urutan: z.number(),
})

export type TResolverExternalPortal = z.infer<typeof ResolverExternalPortal>
