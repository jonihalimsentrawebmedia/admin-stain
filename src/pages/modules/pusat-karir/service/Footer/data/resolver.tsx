import { z } from 'zod'

export const ResolverFooterService = z.object({
  nama_layanan: z.string(),
  url: z.url(),
  is_footer: z.boolean(),
})

export type FooterServiceType = z.infer<typeof ResolverFooterService>
