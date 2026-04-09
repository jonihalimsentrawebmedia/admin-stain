import { z } from 'zod'

export const ResolverAuditDocument = z.object({
  nama_dokumen: z.string({ error: 'Namae Berkas Wajib Diisi' }).min(1),
  is_google_link: z.boolean({ error: 'is link wajib di Pilih' }),
  url_dokumen: z.string({ error: 'Link Berkas Wajib Diisi/Upload' }).optional().nullable(),
  link_google: z.string({ error: 'Link Drive Wajib Diisi' }).optional().nullable(),
  key_name: z.string({ error: 'Key Name Wajib Diisi' }).min(1).optional().nullable(),
})

export type TResolverAuditDocument = z.infer<typeof ResolverAuditDocument>
